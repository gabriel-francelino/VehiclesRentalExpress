import { Vehicle } from "../../models/vehicle";
import { vehicleRepository } from "../../repositories/VehicleRepository";

class CreateVehicleService {
    execute(vehicle: Vehicle): Vehicle{
        const newVehicle = vehicleRepository.create(vehicle);

        return newVehicle;
    }
}

const createVehicleService = new CreateVehicleService();

export { createVehicleService };