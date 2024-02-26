import { VehicleRepository } from '../../../infra/database/repositories/IVehicleRepository'
import { VehicleProps } from '../../models/Vehicle'

interface GetAllCustomerServiceRequest {
  page: number
  pageSize: number
}

interface GetAllVehicleServiceResponse {
  vehicles: VehicleProps[]
}

export class GetAllVehicleService {
  constructor(private vehicleRepository: VehicleRepository) {}
  async execute({
    page,
    pageSize,
  }: GetAllCustomerServiceRequest): Promise<GetAllVehicleServiceResponse> {
    const vehicles = await this.vehicleRepository.findMany(page, pageSize)

    return {
      vehicles,
    }
  }
}
