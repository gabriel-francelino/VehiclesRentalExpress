import { VehicleRepository } from '@/infra/database/repositories/IVehicleRepository'
import { Vehicle, VehicleProps } from '../../models/Vehicle'

interface GetAvailableVehicleServiceReponse {
  vehicles: Vehicle[]
}

export class GetAvailableVehicleService {
  constructor(private vehicleRepository: VehicleRepository) {}
  async execute(): Promise<GetAvailableVehicleServiceReponse> {
    const vehicleNotRented =
      await this.vehicleRepository.findByIdRentedStatus(false)

    const vehicles = vehicleNotRented.map(
      (vehicle) => new Vehicle(vehicle as VehicleProps),
    )

    return {
      vehicles,
    }
  }
}
