import { NotFound } from "../../error/errors";
import { vehicleRepository } from "../../repositories/VehicleRepository";

class DeleteVehicleService {
    execute(id: string): void {
        const vehicle = vehicleRepository.getById(id);

        if (!vehicle) {
            throw new NotFound("Vehicle not found");
        }

        vehicleRepository.delete(id);
    }
}

const deleteVehicleService = new DeleteVehicleService();

export { deleteVehicleService };