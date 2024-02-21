import { Vehicle } from '@prisma/client'

export class InMemoryVehicleRepository {
  private vehicle: Vehicle[] = []

  create(vehicle: Vehicle): Vehicle {
    this.vehicle.push(vehicle)
    return vehicle
  }

  getAll(): Vehicle[] {
    return this.vehicle
  }

  getById(id: string): Vehicle | undefined {
    return this.vehicle.find((vehicle) => vehicle.id === id)
  }

  getByPlate(plate: string): Vehicle | undefined {
    return this.vehicle.find((vehicle) => vehicle.plate === plate)
  }

  update(vehicle: Vehicle): Vehicle | undefined {
    const vehicleIndex = this.vehicle.findIndex(
      (vehicleDB) => vehicleDB.id === vehicle.id,
    )
    if (vehicleIndex === -1) {
      return undefined
    }
    this.vehicle[vehicleIndex] = vehicle
    return this.vehicle[vehicleIndex]
  }
}
