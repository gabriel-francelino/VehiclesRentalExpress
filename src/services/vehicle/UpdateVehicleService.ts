import { StatusCodes } from "http-status-codes";
import { AppError } from "../../error/AppError";
import { Vehicle } from "../../models/Vehicle";
import { vehicleRepository } from "../../repositories/VehicleRepository";

class UpdateVehicleService {
    execute(vehicle: Vehicle): Vehicle {
        if(!vehicle.id || !vehicle.model || !vehicle.color || !vehicle.type || !vehicle.plate || !vehicle.dailyRental || !vehicle.increasePorcentage) {
            throw new AppError('Missing required fields', StatusCodes.BAD_REQUEST);
        }

        const updatedVehicle: Vehicle = vehicleRepository.update(vehicle);

        if (!updatedVehicle) {
            throw new AppError('Vehicle not found', StatusCodes.NOT_FOUND);
        }

        return updatedVehicle;
    }
}

const updateVehicleService = new UpdateVehicleService();

export { updateVehicleService };