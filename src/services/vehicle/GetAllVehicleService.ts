import { Vehicle } from "../../models/vehicle";
import { vehicleRepository } from "../../repositories/VehicleRepository";

class GetAllVehicleService {
    execute(): Vehicle[]{
        const vehicles = vehicleRepository.getAll();

        return vehicles;
    }
}

const getAllVehicleService = new GetAllVehicleService();

export { getAllVehicleService };