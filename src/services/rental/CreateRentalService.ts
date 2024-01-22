import { StatusCodes } from "http-status-codes";
import { RentalDTO } from "../../dto/RentalDTO";
import { AppError } from "../../error/AppError";
import { Rental } from "../../models/Rental";
import { customerRepository } from "../../repositories/CustomerRepository";
import { vehicleRepository } from "../../repositories/VehicleRepository";
import { rentalRepository } from "../../repositories/RentalRepository";
import { differenceInDays, parseISO } from "date-fns";

class CreateRentalService {
    execute(rentalDTO: RentalDTO): Rental {
        const { customerCpf, vehiclePlate, rentalDate, devolutionDate } = rentalDTO;

        const customer = customerRepository.getByCpf(customerCpf);

        if (!customer) {
            throw new AppError("Customer not found", StatusCodes.NOT_FOUND);
        }

        const vehicle = vehicleRepository.getByPlate(vehiclePlate);

        if (!vehicle) {
            throw new AppError("Vehicle not found", StatusCodes.NOT_FOUND);
        }

        customer.hasRent = true;
        vehicle.rented = true;
        const rent = new Rental(customer, vehicle, rentalDate, devolutionDate); 
        rent.rentalValue = this.calculateRentalValue(rent);

        return rentalRepository.create(rent);
    }

    private calculateRentalValue({ vehicle, rentalDate, devolutionDate }: Rental): number {
        const rentalDays = differenceInDays(devolutionDate, rentalDate);
        const vehicleRentalValue = vehicle.dailyRental * rentalDays;
        
        return vehicleRentalValue * vehicle.increasePorcentage;
    }
}

const createRentalService = new CreateRentalService();

export { createRentalService };