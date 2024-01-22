import { Vehicle } from "../../models/Vehicle";
import { vehicleRepository } from "../../repositories/VehicleRepository";

class CreateVehicleService {
    execute(vehicle: Vehicle): Vehicle{
        const newVehicle = vehicleRepository.create(vehicle);

        return newVehicle;
    }
}

const createVehicleService = new CreateVehicleService();

export { createVehicleService };