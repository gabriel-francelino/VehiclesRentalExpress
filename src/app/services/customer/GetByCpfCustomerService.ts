import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../error/AppError'
import { CustomerProps } from '../../models/Customer'
import { CustomerRepository } from '../../../infra/database/repositories/ICustomerRepository'

interface GetByCpfCustomerServiceRequest {
  cpf: string
}

interface GetByCpfCustomerServiceResponse {
  customer: CustomerProps
}

export class GetByCpfCustomerService {
  constructor(private customerRepository: CustomerRepository) {}
  async execute({
    cpf,
  }: GetByCpfCustomerServiceRequest): Promise<GetByCpfCustomerServiceResponse> {
    const customer = await this.customerRepository.findByCpf(cpf)

    if (!customer) {
      throw new AppError('Customer not found', StatusCodes.NOT_FOUND)
    }

    return {
      customer,
    }
  }
}
