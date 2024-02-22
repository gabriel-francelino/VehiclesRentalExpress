import { RentalRepository } from '../../../infra/database/repositories/IRentalRepository'
import { RentalProps } from '../../models/Rental'
import { CustomerRepository } from '../../../infra/database/repositories/ICustomerRepository'
import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../error/AppError'

interface GetAllRentalsByCustomerServiceRequest {
  customerId: string
}

interface GetAllRentalsByCustomerServiceResponse {
  customerRentals: RentalProps[]
}

export class GetAllRentalsByCustomerService {
  constructor(
    private rentalRepository: RentalRepository,
    private customerRepository: CustomerRepository,
  ) {}

  async execute({
    customerId,
  }: GetAllRentalsByCustomerServiceRequest): Promise<GetAllRentalsByCustomerServiceResponse> {
    const customer = this.customerRepository.findById(customerId)

    if (!customer) {
      throw new AppError('Customer not found', StatusCodes.NOT_FOUND)
    }

    const customerRentals =
      await this.rentalRepository.findRentalsByCustomerId(customerId)

    return {
      customerRentals,
    }
  }
}
