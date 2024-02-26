import { CustomerRepository } from '../../../infra/database/repositories/ICustomerRepository'
import { CustomerProps } from '../../models/Customer'

interface GetAllCustomerServiceRequest {
  page: number
  pageSize: number
}

interface GetAllCustomerServiceResponse {
  customers: CustomerProps[]
}

export class GetAllCustomerService {
  constructor(private customerRepository: CustomerRepository) {}
  async execute({
    page,
    pageSize,
  }: GetAllCustomerServiceRequest): Promise<GetAllCustomerServiceResponse> {
    const customers = await this.customerRepository.findMany(page, pageSize)

    return {
      customers,
    }
  }
}
