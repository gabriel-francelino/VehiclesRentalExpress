import { Vehicle } from "../../models/Vehicle";
import { vehicleRepository } from "../../repositories/VehicleRepository";

class GetAllVehicleService {
    execute(): Vehicle[]{
        const vehicles = vehicleRepository.getAll();

        return vehicles;
    }
}

const getAllVehicleService = new GetAllVehicleService();

export { getAllVehicleService };