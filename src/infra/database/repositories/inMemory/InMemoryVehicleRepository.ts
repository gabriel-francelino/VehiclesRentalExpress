import { Vehicle } from '@prisma/client'

export class InMemoryVehicleRepository {
  private vehicle: Vehicle[] = []

  async create(vehicle: Vehicle): Promise<Vehicle> {
    this.vehicle.push(vehicle)

    return vehicle
  }

  async findMany(page: number, pageSize: number): Promise<Vehicle[]> {
    const vehicle = this.vehicle.slice((page - 1) * pageSize, page * pageSize)

    return vehicle
  }

  async findById(id: string): Promise<Vehicle | null> {
    const vehicle = this.vehicle.find((vehicle) => vehicle.id === id)

    if (!vehicle) {
      return null
    }

    return vehicle
  }

  async findByPlate(plate: string): Promise<Vehicle | null> {
    const vehicle = this.vehicle.find((vehicle) => vehicle.plate === plate)

    if (!vehicle) {
      return null
    }

    return vehicle
  }

  async update(vehicle: Vehicle): Promise<Vehicle | null> {
    const vehicleIndex = this.vehicle.findIndex(
      (vehicleDB) => vehicleDB.id === vehicle.id,
    )
    if (vehicleIndex === -1) {
      return null
    }
    this.vehicle[vehicleIndex] = vehicle
    return this.vehicle[vehicleIndex]
  }
}
