import { Vehicle } from "../../models/Vehicle";
import { vehicleRepository } from "../../repositories/VehicleRepository";

class GetAvailableVehicleService {
    execute() {
        const vehicles: Vehicle[] = vehicleRepository.getAll();
        const availableVehicles: Vehicle[] = vehicles.filter(vehicle => vehicle.rented === false);
        return availableVehicles;
    }
}

const getAvailableVehicleService = new GetAvailableVehicleService();

export { getAvailableVehicleService };