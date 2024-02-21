import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../error/AppError'
import { Vehicle } from '../../models/Vehicle'
import { VehicleRepository } from '@/infra/database/repositories/IVehicleRepository'

interface GetByIdVehicleServiceRequest {
  id: string
}

interface GetByIdVehicleServiceResponse {
  vehicle: Vehicle
}

export class GetByIdVehicleService {
  constructor(private vehicleRepository: VehicleRepository) {}
  async execute({
    id,
  }: GetByIdVehicleServiceRequest): Promise<GetByIdVehicleServiceResponse> {
    const vehicleExists = await this.vehicleRepository.findById(id)

    if (!vehicleExists) {
      throw new AppError('Vehicle not found', StatusCodes.NOT_FOUND)
    }

    const vehicle = new Vehicle(vehicleExists)

    return {
      vehicle,
    }
  }
}
