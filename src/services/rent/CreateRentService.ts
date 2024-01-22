import { StatusCodes } from "http-status-codes";
import { RentDTO } from "../../dto/RentDTO";
import { AppError } from "../../error/AppError";
import { Rent } from "../../models/Rent";
import { customerRepository } from "../../repositories/CustomerRepository";
import { vehicleRepository } from "../../repositories/VehicleRepository";
import { rentRepository } from "../../repositories/RentRepository";
import { differenceInDays, parseISO } from "date-fns";

class CreateRentService {
    execute(rentDTO: RentDTO): Rent {
        const { customerCpf, vehiclePlate, rentalDate, devolutionDate } = rentDTO;

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
        const rent = new Rent(customer, vehicle, rentalDate, devolutionDate); 
        rent.rentalValue = this.calculateRentalValue(rent);

        return rentRepository.create(rent);
    }

    private calculateRentalValue({ vehicle, rentalDate, devolutionDate }: Rent): number {
        const rentalDays = differenceInDays(devolutionDate, rentalDate);
        const vehicleRentalValue = vehicle.dailyRental * rentalDays;
        
        return vehicleRentalValue * vehicle.increasePorcentage;
    }
}

const createRentService = new CreateRentService();

export { createRentService };