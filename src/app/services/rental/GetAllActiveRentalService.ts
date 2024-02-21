import { RentalRepository } from '@/infra/database/repositories/IRentalRepository'
import { Rental, RentalProps } from '../../models/Rental'

interface GetAllActiveRentalServiceResponse {
  activeRentals: Rental[]
}

export class GetAllActiveRentalService {
  constructor(private rentalRepository: RentalRepository) {}

  // async execute(): Promise<GetAllActiveRentalServiceResponse> {
  //   const rentalsData = (await this.rentalRepository.findAll()).filter((rental) => !rental.hasRent)

  //   const activeRentals: Rental[] = rentalsData.map(
  //     (rentalData) => new Rental(rentalData as RentalProps),
  //   )
  //   return {
  //     activeRentals,
  //   }
  // }
}
