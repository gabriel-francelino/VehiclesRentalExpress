import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../error/AppError'
import { RentalRepository } from '@/infra/database/repositories/IRentalRepository'
import { VehicleRepository } from '@/infra/database/repositories/IVehicleRepository'
import { CustomerRepository } from '@/infra/database/repositories/ICustomerRepository'

export class DevolutionRentalService {
  constructor(
    private rentalRepository: RentalRepository,
    private vehicleRepository: VehicleRepository,
    private customerRepository: CustomerRepository,
  ) {}

  async execute(id: string) {
    const rentalExists = await this.rentalRepository.findById(id)

    if (!rentalExists) {
      throw new AppError('Rental not found', StatusCodes.NOT_FOUND)
    }

    await Promise.all([
      this.rentalRepository.updateDevolutionById(rentalExists.id, new Date()),
      this.vehicleRepository.updateRentedStatusById(
        rentalExists.vehicleId,
        false,
      ),
      this.customerRepository.updateHasRentById(rentalExists.customerId, false),
    ])
  }
}
