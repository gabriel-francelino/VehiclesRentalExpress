import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../error/AppError'
import { VehicleProps, VehicleType } from '../../models/Vehicle'
import { VehicleRepository } from '../../../infra/database/repositories/IVehicleRepository'

interface UpdateVehicleServiceRequest {
  id: string
  model: string
  color: string
  type: VehicleType
  plate: string
  dailyRental: number
}

interface UpdateVehicleServiceResponse {
  vehicle: VehicleProps
}
export class UpdateVehicleService {
  constructor(private vehicleRepository: VehicleRepository) {}
  async execute({
    id,
    model,
    color,
    type,
    plate,
    dailyRental,
  }: UpdateVehicleServiceRequest): Promise<UpdateVehicleServiceResponse> {
    const vehicleData = await this.vehicleRepository.findById(id)

    if (!vehicleData) {
      throw new AppError('Vehicle not found', StatusCodes.NOT_FOUND)
    }

    const data = {
      id,
      model,
      color,
      type,
      plate,
      dailyRental,
      updatedAt: new Date(),
    }

    const vehicle = await this.vehicleRepository.update(data)

    return {
      vehicle,
    }
  }
}
