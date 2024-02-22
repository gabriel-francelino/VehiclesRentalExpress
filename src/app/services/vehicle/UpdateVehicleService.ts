import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../error/AppError'
import { Vehicle, VehicleProps } from '../../models/Vehicle'
import { VehicleRepository } from '@/infra/database/repositories/IVehicleRepository'

interface UpdateVehicleServiceResponse {
  vehicle: Vehicle
}
export class UpdateVehicleService {
  constructor(private vehicleRepository: VehicleRepository) {}
  // async execute(data: Vehicle): Promise<UpdateVehicleServiceResponse> {
  //   const customerData = await this.vehicleRepository.findById(data.id)

  //   if (!customerData) {
  //     throw new AppError('Vehicle not found', StatusCodes.NOT_FOUND)
  //   }

  //   await this.vehicleRepository.update(customerData)

  //   const vehicle: Vehicle = new Vehicle(customerData as VehicleProps)

  //   return {
  //     vehicle,
  //   }
  // }
}
