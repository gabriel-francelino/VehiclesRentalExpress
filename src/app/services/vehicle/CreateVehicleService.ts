import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../error/AppError'
import { Vehicle, VehicleProps } from '../../models/Vehicle'
import { VehicleRepository } from '@/infra/database/repositories/IVehicleRepository'

interface CreateVehicleServiceResponse {
  vehicle: Vehicle
}

export class CreateVehicleService {
  constructor(private vehicleRepository: VehicleRepository) {}
  async execute(
    vehicleData: VehicleProps,
  ): Promise<CreateVehicleServiceResponse> {
    const vehicleAlreadyExists = await this.vehicleRepository.findByPlate(
      vehicleData.plate,
    )

    if (vehicleAlreadyExists) {
      throw new AppError(
        'Vehicle with this plate already exists!',
        StatusCodes.CONFLICT,
      )
    }

    const vehicle = new Vehicle(vehicleData)

    await this.vehicleRepository.create(vehicle)

    return {
      vehicle,
    }
  }
}
