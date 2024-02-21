import { Vehicle } from '@prisma/client'

export interface VehicleRepository {
  findAll(): Promise<Vehicle[] | []>
  findById(id: string): Promise<Vehicle | null>
  findByPlate(plate: string): Promise<Vehicle | null>
  findByIdRentedStatus(isRented: boolean): Promise<Vehicle[] | []>
  update(vehicle: Vehicle): Promise<Vehicle>
  create(data: Vehicle): Promise<Vehicle>
}
