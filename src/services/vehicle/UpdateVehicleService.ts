import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../error/AppError'
import { Vehicle } from '../../models/Vehicle'
import { vehicleRepository } from '../../repositories/VehicleRepository'
import { VehicleDTO } from '../../infra/http/dtos/VehicleDTO'

class UpdateVehicleService {
  execute(vehicle: VehicleDTO): Vehicle {
    let updatedVehicle: Vehicle = vehicleRepository.getById(vehicle.id)

    if (!updatedVehicle) {
      throw new AppError('Vehicle not found', StatusCodes.NOT_FOUND)
    }

    updatedVehicle.model = vehicle.model
    updatedVehicle.color = vehicle.color
    updatedVehicle.type = vehicle.type
    updatedVehicle.plate = vehicle.plate
    updatedVehicle.dailyRental = vehicle.dailyRental

    updatedVehicle = vehicleRepository.update(updatedVehicle)

    return updatedVehicle
  }
}

const updateVehicleService = new UpdateVehicleService()

export { updateVehicleService }
