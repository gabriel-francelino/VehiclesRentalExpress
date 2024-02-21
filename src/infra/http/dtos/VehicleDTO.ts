import { VehicleType } from '../models/Vehicle'

export interface VehicleDTO {
  id?: string
  model: string
  color: string
  type: VehicleType
  plate: string
  dailyRental: number
}
