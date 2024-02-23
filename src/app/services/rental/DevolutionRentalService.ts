import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../error/AppError'
import { RentalRepository } from '../../../infra/database/repositories/IRentalRepository'
import { VehicleRepository } from '../../../infra/database/repositories/IVehicleRepository'
import { CustomerRepository } from '../../../infra/database/repositories/ICustomerRepository'

interface DevolutionRentalServiceRequest {
  id: string
}
export class DevolutionRentalService {
  constructor(
    private customerRepository: CustomerRepository,
    private vehicleRepository: VehicleRepository,
    private rentalRepository: RentalRepository,
  ) {}

  async execute({ id }: DevolutionRentalServiceRequest) {
    const rentalExists = await this.rentalRepository.findById(id)

    if (!rentalExists) {
      throw new AppError('Rental not found', StatusCodes.NOT_FOUND)
    }

    await Promise.all([
      this.rentalRepository.updateDevolutionById(id, new Date()),
      this.vehicleRepository.updateRentedStatusById(
        rentalExists.vehicleId,
        false,
      ),
      this.customerRepository.updateHasRentById(rentalExists.customerId, false),
    ])
  }
}
