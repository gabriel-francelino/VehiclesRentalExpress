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

        // separar as validações em um arquivo separado

        if (!customer) {
            throw new AppError("Customer not found", StatusCodes.NOT_FOUND);
        }

        const vehicle = vehicleRepository.getByPlate(vehiclePlate);

        if (!vehicle) {
            throw new AppError("Vehicle not found", StatusCodes.NOT_FOUND);
        }

        if (vehicle.rented) {
            throw new AppError("Vehicle already rented", StatusCodes.BAD_REQUEST);
        }

        if (customer.hasRent) {
            throw new AppError("Customer already has a rent", StatusCodes.BAD_REQUEST);
        }

        if (rentalDate > devolutionDate) {
            throw new AppError("Invalid rental date", StatusCodes.BAD_REQUEST);
        }

        if (customer.driverLicense === 'A' && vehicle.type !== 'motorcycle') {
            throw new AppError("People with driver license 'A' can rent motorcycles only", StatusCodes.BAD_REQUEST);
        }

        if (customer.driverLicense === 'B' && vehicle.type === 'motorcycle') {
            throw new AppError("People with driver license 'B' can rent cars only", StatusCodes.BAD_REQUEST);
        }

        customer.hasRent = true;
        vehicle.rented = true;
        const rent = new Rental(customer, vehicle, rentalDate, devolutionDate); 
        rent.rentalValue = this.calculateRentalValue(rent);

        return rentalRepository.create(rent);
    }

    private calculateRentalValue({ vehicle, rentalDate, devolutionDate }: Rental): number {
        const rentalDays: number = differenceInDays(devolutionDate, rentalDate);
        const rentalValue: number = vehicle.dailyRental * rentalDays;
        const increase: number = rentalValue * vehicle.increasePorcentage;
        
        return rentalValue + increase;
    }
}

const createRentalService = new CreateRentalService();

export { createRentalService };