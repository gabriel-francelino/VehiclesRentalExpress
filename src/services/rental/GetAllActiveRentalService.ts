import { Rental } from "../../models/Rental";
import { rentalRepository } from "../../repositories/RentalRepository";

class GetAllActiveRentalService {
    execute(): Rental[] {
        return rentalRepository.getAllActive();
    }
}

const getAllActiveRentalService = new GetAllActiveRentalService();

export { getAllActiveRentalService };