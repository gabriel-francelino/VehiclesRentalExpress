import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../error/AppError'
import { CustomerProps } from '../../models/Customer'
import { CustomerRepository } from '../../../infra/database/repositories/ICustomerRepository'

interface GetByIdCustomerServiceRequest {
  id: string
}

interface GetByIdCustomerServiceResponse {
  customer: CustomerProps
}

export class GetByIdCustomerService {
  constructor(private customerRepository: CustomerRepository) {}
  async execute({
    id,
  }: GetByIdCustomerServiceRequest): Promise<GetByIdCustomerServiceResponse> {
    const customer = await this.customerRepository.findById(id)
    if (!customer) {
      throw new AppError('Customer not found', StatusCodes.NOT_FOUND)
    }

    return {
      customer,
    }
  }
}
