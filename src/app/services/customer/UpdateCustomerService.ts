import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../error/AppError'
import { Customer, CustomerProps } from '../../models/Customer'
import { CustomerRepository } from '@/infra/database/repositories/ICustomerRepository'

interface UpdateCustomerServiceResponse {
  customer: Customer
}

export class UpdateCustomerService {
  constructor(private customerRepository: CustomerRepository) {}
  async execute(data: Customer): Promise<UpdateCustomerServiceResponse> {
    const customerData = await this.customerRepository.findById(data.id)

    if (!customerData) {
      throw new AppError('Customer not found', StatusCodes.NOT_FOUND)
    }

    await this.customerRepository.update(customerData)

    const customer: Customer = new Customer(customerData as CustomerProps)

    return {
      customer,
    }
  }
}
