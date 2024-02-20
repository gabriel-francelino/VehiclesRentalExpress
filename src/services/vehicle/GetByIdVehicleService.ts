import { StatusCodes } from "http-status-codes";
import { AppError } from "../../error/AppError";
import { Vehicle } from "../../models/Vehicle";
import { vehicleRepository } from "../../repositories/VehicleRepository";

class GetByIdVehicleService {
  execute(id: string): Vehicle {
    const vehicle = vehicleRepository.getById(id);

    if (!vehicle) {
      throw new AppError("Vehicle not found", StatusCodes.NOT_FOUND);
    }

    return vehicle;
  }
}

const getByIdVehicleService = new GetByIdVehicleService();

export { getByIdVehicleService };
