import { StatusCodes } from "http-status-codes";
import { AppError } from "../../error/AppError";
import { Vehicle } from "../../models/Vehicle";
import { vehicleRepository } from "../../repositories/VehicleRepository";

class CreateVehicleService {
  execute(vehicle: Vehicle): Vehicle {
    const vehicles: Vehicle[] = vehicleRepository.getAll();

    vehicles.forEach((v) => {
      if (v.plate === vehicle.plate) {
        throw new AppError(
          "Vehicle with this plate already exists!",
          StatusCodes.CONFLICT,
        );
      }
    });

    const newVehicle: Vehicle = vehicleRepository.create(vehicle);

    return newVehicle;
  }
}

const createVehicleService = new CreateVehicleService();

export { createVehicleService };
