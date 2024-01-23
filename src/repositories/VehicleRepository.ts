import { Vehicle } from "../models/Vehicle";

class VehicleRepository {
    private vehicleDatabase: Vehicle[] = [
        new Vehicle('Fiat Doblô', 'Branco', 'car', 'HIJ-5678', 120.0),
        new Vehicle('Fiat Uno', 'Preto', 'car', 'ABC-1234', 100.0),
        new Vehicle('Fiat Uno', 'Prata', 'car', 'DEF-5678', 100.0),
        new Vehicle('Kawasaki Ninja', 'Verde', 'motorcycle', 'KAW-1234', 200.0),
        new Vehicle('Kawasaki Ninja', 'Azul', 'motorcycle', 'KAW-5678', 200.0),
        new Vehicle('Chevrolet Onix', 'Vermelho', 'car', 'GMX-4321', 110.0),
        new Vehicle('Honda CB500', 'Amarela', 'motorcycle', 'HON-9876', 180.0),
        new Vehicle('Toyota Corolla', 'Prata', 'car', 'TYY-5678', 130.0),
        new Vehicle('Suzuki GSX-R750', 'Azul', 'motorcycle', 'SUZ-6789', 220.0),
        new Vehicle('Volkswagen Gol', 'Preto', 'car', 'VWZ-8765', 115.0),
        new Vehicle('Harley-Davidson Sportster', 'Cinza', 'motorcycle', 'HDR-3456', 160.0),

    ];

    create(vehicle: Vehicle): Vehicle {
        this.vehicleDatabase.push(vehicle);
        return vehicle;
    }

    getAll(): Vehicle[] {
        return this.vehicleDatabase;
    }

    getById(id: string): Vehicle | undefined {
        return this.vehicleDatabase.find(vehicle => vehicle.id === id);
    }

    getByPlate(plate: string): Vehicle | undefined {
        return this.vehicleDatabase.find(vehicle => vehicle.plate === plate);
    }

    update(vehicle: Vehicle): Vehicle | undefined {
        const vehicleIndex = this.vehicleDatabase.findIndex(vehicle => vehicle.id === vehicle.id);
        if (vehicleIndex === -1) {
            return undefined;
        }
        this.vehicleDatabase[vehicleIndex] = vehicle;
        return this.vehicleDatabase[vehicleIndex];
    }

    delete(id: string): Vehicle | undefined {
        const vehicleIndex = this.vehicleDatabase.findIndex(vehicle => vehicle.id === id);
        if (vehicleIndex === -1) {
            return undefined;
        }
        const vehicle = this.vehicleDatabase[vehicleIndex];
        this.vehicleDatabase.splice(vehicleIndex, 1);
        return vehicle;
    }
}

const vehicleRepository = new VehicleRepository();

export { vehicleRepository };