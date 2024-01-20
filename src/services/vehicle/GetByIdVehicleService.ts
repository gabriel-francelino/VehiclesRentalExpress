import { NotFound } from "../../error/errors";
import { Vehicle } from "../../models/vehicle";
import { vehicleRepository } from "../../repositories/VehicleRepository";

class GetByIdVehicleService {
    execute(id: string): Vehicle {
        const vehicle = vehicleRepository.getById(id);

        if (!vehicle) {
            throw new NotFound("Vehicle not found"); // implementar middleware 'appError'
        }

        return vehicle;
    }
}

const getByIdVehicleService = new GetByIdVehicleService();

export { getByIdVehicleService };