import { RentalRepository } from '../../../infra/database/repositories/IRentalRepository'
import { RentalProps } from '../../models/Rental'

interface GetAllRentalServiceResponse {
  rentals: RentalProps[]
}

export class GetAllRentalService {
  constructor(private rentalRepository: RentalRepository) {}

  async execute(): Promise<GetAllRentalServiceResponse> {
    const rentals = await this.rentalRepository.findMany()

    return {
      rentals,
    }
  }
}
