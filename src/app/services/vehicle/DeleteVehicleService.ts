import { VehicleRepository } from '../../../infra/database/repositories/IVehicleRepository'

export class DeleteVehicleService {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(id: string): Promise<void> {
    await this.vehicleRepository.delete(id)
  }
}
