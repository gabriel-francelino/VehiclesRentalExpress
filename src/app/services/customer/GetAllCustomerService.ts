import { CustomerRepository } from '@/infra/database/repositories/ICustomerRepository'
import { Customer, CustomerProps } from '../../models/Customer'

interface GetAllCustomerServiceResponse {
  customers: Customer[]
}

export class GetAllCustomerService {
  constructor(private customerRepository: CustomerRepository) {}
  async execute(): Promise<GetAllCustomerServiceResponse> {
    const customersData = await this.customerRepository.findAll()

    const customers: Customer[] = customersData.map(
      (customerData) => new Customer(customerData as CustomerProps),
    )

    return {
      customers,
    }
  }
}
