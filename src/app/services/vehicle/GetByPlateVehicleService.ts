import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../error/AppError'
import { VehicleProps } from '../../models/Vehicle'
import { VehicleRepository } from '../../../infra/database/repositories/IVehicleRepository'

interface GetByPlateVehicleServiceRequest {
  plate: string
}

interface GetByPlateVehicleServiceResponse {
  vehicle: VehicleProps
}

export class GetByPlateVehicleService {
  constructor(private vehicleRepository: VehicleRepository) {}
  async execute({
    plate,
  }: GetByPlateVehicleServiceRequest): Promise<GetByPlateVehicleServiceResponse> {
    const vehicle = await this.vehicleRepository.findByPlate(plate)

    if (!vehicle) {
      throw new AppError('Vehicle not found', StatusCodes.NOT_FOUND)
    }

    return {
      vehicle,
    }
  }
}
