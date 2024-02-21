import { Rental } from '../../models/Rental'
import { rentalRepository } from '../../repositories/RentalRepository'

class GetAllRentalService {
  execute(): Rental[] {
    return rentalRepository.getAll()
  }
}

const getAllRentalService = new GetAllRentalService()

export { getAllRentalService }
