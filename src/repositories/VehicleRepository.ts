import { Vehicle } from "../models/vehicle";

class VehicleRepository {
    private vehicleDatabase: Vehicle[] = [
        new Vehicle('Fiat', 'Uno', 'Branco', 'ABC-1234', 100, 0.1),
        new Vehicle('Fiat', 'Palio', 'Prata', 'DEF-5678', 70, 0.1),
        new Vehicle('Fiat', 'Argo', 'Preto', 'GHI-9012', 85, 0.1),
        new Vehicle('Fiat', 'Mobi', 'Vermelho', 'JKL-3456', 60, 0.1),
        new Vehicle('Fiat', 'Toro', 'Azul', 'MNO-7890', 150, 0.1),
        new Vehicle('Fiat', 'Cronos', 'Verde', 'PQR-1234', 80, 0.1),
        new Vehicle('Fiat', 'Doblô', 'Amarelo', 'STU-5678', 120, 0.1),
        new Vehicle('Fiat', 'Siena', 'Rosa', 'VWX-9012', 90, 0.1),
        new Vehicle('Fiat', 'Strada', 'Roxo', 'YZA-3456', 130, 0.1),
        new Vehicle('Fiat', 'Punto', 'Laranja', 'BCD-7890', 75, 0.1),
        new Vehicle('Fiat', 'Cronos', 'Marrom', 'EFG-1234', 80, 0.1)
    ];

    create(vehicle: Vehicle): Vehicle{
        this.vehicleDatabase.push(vehicle);
        return vehicle;
    }

    getAll(): Vehicle[]{
        return this.vehicleDatabase;
    }

    getById(id: string): Vehicle | undefined{
        return this.vehicleDatabase.find(vehicle => vehicle.id === id);
    }

    getByPlate(plate: string): Vehicle | undefined{
        return this.vehicleDatabase.find(vehicle => vehicle.plate === plate);
    }

    update(vehicle: Vehicle): Vehicle | undefined{
        const vehicleIndex = this.vehicleDatabase.findIndex(vehicle => vehicle.id === vehicle.id);
        if(vehicleIndex === -1){
            return undefined;
        }
        this.vehicleDatabase[vehicleIndex] = vehicle;
        return this.vehicleDatabase[vehicleIndex];
    }

    delete(id: string): Vehicle | undefined{
        const vehicleIndex = this.vehicleDatabase.findIndex(vehicle => vehicle.id === id);
        if(vehicleIndex === -1){
            return undefined;
        }
        const vehicle = this.vehicleDatabase[vehicleIndex];
        this.vehicleDatabase.splice(vehicleIndex, 1);
        return vehicle;
    }
}

const vehicleRepository = new VehicleRepository();

export { vehicleRepository };