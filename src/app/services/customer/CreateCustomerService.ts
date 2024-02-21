import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../error/AppError'
import { Customer, CustomerProps } from '../../models/Customer'
import { CustomerRepository } from '@/infra/database/repositories/ICustomerRepository'

interface CreateCustomerServiceResponse {
  customer: Customer
}

export class CreateCustomerService {
  constructor(private customerRepository: CustomerRepository) {}
  async execute(
    customerData: CustomerProps,
  ): Promise<CreateCustomerServiceResponse> {
    const customerAlreadyExists = await this.customerRepository.findByCpf(
      customerData.cpf,
    )

    if (customerAlreadyExists) {
      throw new AppError(
        'Customer with this CPF already exists!',
        StatusCodes.CONFLICT,
      )
    }

    const customer = new Customer(customerData)

    await this.customerRepository.create(customer)

    return {
      customer,
    }
  }
}
