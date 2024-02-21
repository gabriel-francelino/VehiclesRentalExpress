import { Vehicle } from '@prisma/client'

export interface VehicleRepository {
  findAll(): Promise<Vehicle[] | []>
  findById(id: string): Promise<Vehicle | null>
  findByPlate(plate: string): Promise<Vehicle | null>
  findRentedStatusById(isRented: boolean): Promise<Vehicle[] | []>
  updateRentedStatusById(id: string, isRented: boolean): void
  update(vehicle: Vehicle): Promise<Vehicle>
  create(data: Vehicle): Promise<Vehicle>
}
