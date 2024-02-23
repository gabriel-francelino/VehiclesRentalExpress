import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../error/AppError'
import { VehicleProps } from '../../models/Vehicle'
import { VehicleRepository } from '../../../infra/database/repositories/IVehicleRepository'

interface GetByIdVehicleServiceRequest {
  id: string
}

interface GetByIdVehicleServiceResponse {
  vehicle: VehicleProps
}

export class GetByIdVehicleService {
  constructor(private vehicleRepository: VehicleRepository) {}
  async execute({
    id,
  }: GetByIdVehicleServiceRequest): Promise<GetByIdVehicleServiceResponse> {
    const vehicle = await this.vehicleRepository.findById(id)

    if (!vehicle) {
      throw new AppError('Vehicle not found', StatusCodes.NOT_FOUND)
    }

    return {
      vehicle,
    }
  }
}
