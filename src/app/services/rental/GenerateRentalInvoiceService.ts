import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../error/AppError'
import { Invoice } from '../../models/Rental'
import { RentalRepository } from '../../../infra/database/repositories/IRentalRepository'
import { CustomerRepository } from '../../../infra/database/repositories/ICustomerRepository'
import { VehicleRepository } from '../../../infra/database/repositories/IVehicleRepository'

interface GenerateRentalInvoiceServiceRequest {
  id: string
}
interface GenerateRentalInvoiceServiceResponse {
  invoice: Invoice
}

export class GenerateRentalInvoiceService {
  constructor(
    private customerRepository: CustomerRepository,
    private vehicleRepository: VehicleRepository,
    private rentalRepository: RentalRepository,
  ) {}

  async execute({
    id,
  }: GenerateRentalInvoiceServiceRequest): Promise<GenerateRentalInvoiceServiceResponse> {
    const rental = await this.rentalRepository.findById(id)

    if (!rental) {
      throw new AppError('Rental not found', StatusCodes.NOT_FOUND)
    }

    const rentalCustomer = await this.customerRepository.findById(
      rental.customerId,
    )

    if (!rentalCustomer) {
      throw new AppError('Customer not found', StatusCodes.NOT_FOUND)
    }

    const rentalVehicle = await this.vehicleRepository.findById(
      rental.vehicleId,
    )

    if (!rentalVehicle) {
      throw new AppError('Vehicle not found', StatusCodes.NOT_FOUND)
    }

    const invoice: Invoice = {
      customerName: rentalCustomer.name,
      customerCpf: rentalCustomer.cpf,
      customerCnh: rentalCustomer.driverLicense,
      vehiclePlate: rentalVehicle.plate,
      vehicleType: rentalVehicle.type,
      vehicleModel: rentalVehicle.model,
      vehicleRental: rentalVehicle.dailyRental,
      rentalDate: rental.rentalDate,
      devolutionDate: rental.devolutionDate,
      rentalValue: rental.rentalValue,
    }

    return {
      invoice,
    }
  }
}
