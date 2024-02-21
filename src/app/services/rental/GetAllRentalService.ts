import { RentalRepository } from '@/infra/database/repositories/IRentalRepository'
import { Rental, RentalProps } from '../../models/Rental'

interface GetAllRentalServiceResponse {
  rentals: Rental[]
}

export class GetAllRentalService {
  constructor(private rentalRepository: RentalRepository) {}

  async execute(): Promise<GetAllRentalServiceResponse> {
    const rentalsData = await this.rentalRepository.findAll()

    const rentals: Rental[] = rentalsData.map(
      (rentalData) => new Rental(rentalData as RentalProps),
    )

    return {
      rentals,
    }
  }
}
