import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../error/AppError'
import { Customer, CustomerProps } from '../../models/Customer'
import { CustomerRepository } from '@/infra/database/repositories/ICustomerRepository'

interface GetByCpfCustomerServiceRequest {
  cpf: string
}

interface GetByCpfCustomerServiceResponse {
  customer: Customer
}

export class GetByCpfCustomerService {
  constructor(private customerRepository: CustomerRepository) {}
  async execute({
    cpf,
  }: GetByCpfCustomerServiceRequest): Promise<GetByCpfCustomerServiceResponse> {
    const customerData = await this.customerRepository.findByCpf(cpf)

    if (!customerData) {
      throw new AppError('Customer not found', StatusCodes.NOT_FOUND)
    }

    const customer: Customer = new Customer(customerData as CustomerProps)

    return {
      customer,
    }
  }
}
