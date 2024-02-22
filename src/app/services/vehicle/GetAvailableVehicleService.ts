import { VehicleRepository } from '@/infra/database/repositories/IVehicleRepository'
import { VehicleProps } from '../../models/Vehicle'

interface GetAvailableVehicleServiceReponse {
  vehiclesNotRented: VehicleProps[]
}

export class GetAvailableVehicleService {
  constructor(private vehicleRepository: VehicleRepository) {}

  async execute(): Promise<GetAvailableVehicleServiceReponse> {
    const vehiclesNotRented =
      await this.vehicleRepository.findRentedStatusById(false)

    // console.log('\nvehicle available: ', vehiclesNotRented)
    return {
      vehiclesNotRented,
    }
  }
}
