import { CustomerRepository } from '../../../infra/database/repositories/ICustomerRepository'

export class DeleteCustomerService {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(customerId: string): Promise<void> {
    await this.customerRepository.delete(customerId)
  }
}
