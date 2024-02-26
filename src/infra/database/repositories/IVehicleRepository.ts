import { VehicleProps } from '../../../app/models/Vehicle'

export interface VehicleRepository {
  findMany(page: number, pageSize: number): Promise<VehicleProps[]>
  findById(id: string): Promise<VehicleProps | null>
  findByPlate(plate: string): Promise<VehicleProps | null>
  findRentedStatusById(isRented: boolean): Promise<VehicleProps[]>
  updateRentedStatusById(id: string, isRented: boolean): void
  update(vehicle: Partial<VehicleProps>): Promise<VehicleProps>
  create(data: VehicleProps): Promise<VehicleProps>
  delete(id: string): Promise<void>
}
