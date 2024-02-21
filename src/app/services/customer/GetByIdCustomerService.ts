import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../error/AppError'
import { Customer, CustomerProps } from '../../models/Customer'
import { CustomerRepository } from '@/infra/database/repositories/ICustomerRepository'

interface GetByIdCustomerServiceRequest {
  id: string
}

interface GetByIdCustomerServiceResponse {
  customer: Customer
}

export class GetByIdCustomerService {
  constructor(private customerRepository: CustomerRepository) {}
  async execute({
    id,
  }: GetByIdCustomerServiceRequest): Promise<GetByIdCustomerServiceResponse> {
    const customerData = await this.customerRepository.findById(id)

    if (!customerData) {
      throw new AppError('Customer not found', StatusCodes.NOT_FOUND)
    }

    const customer: Customer = new Customer(customerData as CustomerProps)

    return {
      customer,
    }
  }
}
