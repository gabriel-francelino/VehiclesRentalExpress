import { StatusCodes } from "http-status-codes";
import { AppError } from "../../error/AppError";
import { rentalRepository } from "../../repositories/RentalRepository";

class DevolutionRentalService {
    execute(id: string): void {
        const rental = rentalRepository.getById(id);

        if(!rental){
            throw new AppError("Rental not found", StatusCodes.NOT_FOUND);
        }

        rental.vehicle.rented = false;
        rental.customer.hasRent = false;
    }
}

const devolutionRentalService = new DevolutionRentalService();

export { devolutionRentalService };