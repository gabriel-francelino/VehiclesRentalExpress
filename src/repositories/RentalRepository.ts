import { Rental } from "../models/Rental";

class RentalRepository {
    private rental: Rental[] = [];
    private rentalBackup: Rental[] = [];

    create(rental: Rental): Rental{
        this.rental.push(rental);
        this.rentalBackup.push(rental);
        return rental;
    }

    getAll(): Rental[] {
        return this.rentalBackup;
    }

    getAllActive(): Rental[] {
        return this.rental;
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

    delete(id: string): void {
        const rentalIndex = this.rental.findIndex(rental => rental.id === id);
        this.rental.splice(rentalIndex, 1);
    }
}

const rentalRepository = new RentalRepository();

export { rentalRepository };