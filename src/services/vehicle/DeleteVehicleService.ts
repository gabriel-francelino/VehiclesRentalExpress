import { StatusCodes } from "http-status-codes";
import { AppError } from "../../error/AppError";
import { NotFound } from "../../error/Errors";
import { vehicleRepository } from "../../repositories/VehicleRepository";

class DeleteVehicleService {
    execute(id: string): void {
        const vehicle = vehicleRepository.getById(id);

        if (!vehicle) {
            throw new AppError("Vehicle not found", StatusCodes.NOT_FOUND);
        }

        vehicleRepository.delete(id);
    }
}

const deleteVehicleService = new DeleteVehicleService();

export { deleteVehicleService };