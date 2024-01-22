import { Rental } from "../models/Rental";

class RentalRepository {
    private rental: Rental[] = [];

    create(rental: Rental): Rental{
        this.rental.push(rental);
        return rental;
    }

    getAll(): Rental[] {
        return this.rental
    }

    getById(id: string): Rental | undefined {
        return this.rental.find(rental => rental.id === id);
    }

    getByCustomerCpf(customerCpf: string): Rental[] {
        return this.rental.filter(rental => rental.customer.cpf === customerCpf);
    }

    getByVehiclePlate(vehiclePlate: string): Rental[] {
        return this.rental.filter(rental => rental.vehicle.plate === vehiclePlate);
    }

    // getInvoice
}

const rentalRepository = new RentalRepository();

export { rentalRepository };