import { Rent } from "../models/Rent";

class RentRepository {
    private rents: Rent[] = [];

    create(rent: Rent): Rent{
        this.rents.push(rent);
        return rent;
    }

    getAll(): Rent[] {
        return this.rents
    }

    getById(id: string): Rent | undefined {
        return this.rents.find(rent => rent.id === id);
    }

    getByCustomerCpf(customerCpf: string): Rent[] {
        return this.rents.filter(rent => rent.customer.cpf === customerCpf);
    }

    getByVehiclePlate(vehiclePlate: string): Rent[] {
        return this.rents.filter(rent => rent.vehicle.plate === vehiclePlate);
    }

    // getInvoice
}

const rentRepository = new RentRepository();

export { rentRepository };