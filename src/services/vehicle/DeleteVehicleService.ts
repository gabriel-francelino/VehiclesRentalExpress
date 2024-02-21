import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../error/AppError'
import { vehicleRepository } from '../../repositories/VehicleRepository'

class DeleteVehicleService {
  execute(id: string): void {
    const vehicle = vehicleRepository.getById(id)

    if (!vehicle) {
      throw new AppError('Vehicle not found', StatusCodes.NOT_FOUND)
    }

    if (vehicle.rented) {
      throw new AppError(
        'It is not possible to delete rented vehicles',
        StatusCodes.BAD_REQUEST,
      )
    }

    vehicleRepository.delete(id)
  }
}

const deleteVehicleService = new DeleteVehicleService()

export { deleteVehicleService }
