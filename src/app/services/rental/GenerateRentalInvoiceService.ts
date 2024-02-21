import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../error/AppError'
import { Invoice, Rental } from '../../models/Rental'
import { rentalRepository } from '../../repositories/inMemory/InMemoryRentalRepository'

class GenerateRentalInvoiceService {
  execute(rentalId: string): Invoice {
    const rental = rentalRepository.getById(rentalId)

    if (!rental) {
      throw new AppError('Rental not found', StatusCodes.NOT_FOUND)
    }

    const {
      customer,
      vehicle,
      rentalDate,
      devolutionDate,
      rentalValue,
    }: Rental = rental

    return {
      customerName: customer.name,
      customerCpf: customer.cpf,
      customerCnh: customer.driverLicense,
      vehiclePlate: vehicle.plate,
      vehicleType: vehicle.type,
      vehicleModel: vehicle.model,
      vehicleRental: vehicle.dailyRental,
      rentalDate,
      devolutionDate,
      rentalValue,
    }
  }
}

const generateRentalInvoiceService = new GenerateRentalInvoiceService()

export { generateRentalInvoiceService }
