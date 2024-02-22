import { VehicleRepository } from '@/infra/database/repositories/IVehicleRepository'
import { VehicleProps } from '../../models/Vehicle'

interface GetAllVehicleServiceResponse {
  vehicles: VehicleProps[]
}

export class GetAllVehicleService {
  constructor(private vehicleRepository: VehicleRepository) {}
  async execute(): Promise<GetAllVehicleServiceResponse> {
    const vehicles = await this.vehicleRepository.findAll()

    return {
      vehicles,
    }
  }
}
