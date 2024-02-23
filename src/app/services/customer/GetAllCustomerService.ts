import { CustomerRepository } from '../../../infra/database/repositories/ICustomerRepository'
import { CustomerProps } from '../../models/Customer'

interface GetAllCustomerServiceResponse {
  customers: CustomerProps[]
}

export class GetAllCustomerService {
  constructor(private customerRepository: CustomerRepository) {}
  async execute(): Promise<GetAllCustomerServiceResponse> {
    const customers = await this.customerRepository.findAll()

    return {
      customers,
    }
  }
}
