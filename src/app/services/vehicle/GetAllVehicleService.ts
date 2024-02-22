import { VehicleRepository } from '@/infra/database/repositories/IVehicleRepository'
import { Vehicle, VehicleProps } from '../../models/Vehicle'

interface GetAllVehicleServiceResponse {
  vehicles: Vehicle[]
}

export class GetAllVehicleService {
  constructor(private vehicleRepository: VehicleRepository) {}
  // async execute(): Promise<GetAllVehicleServiceResponse> {
  //   const vehiclesData = await this.vehicleRepository.findAll()

  //   const vehicles: Vehicle[] = vehiclesData.map(
  //     (customerData) => new Vehicle(customerData as VehicleProps),
  //   )

  //   return {
  //     vehicles,
  //   }
  // }
}
