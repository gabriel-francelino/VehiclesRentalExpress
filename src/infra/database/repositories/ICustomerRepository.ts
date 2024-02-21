import { Customer, CustomerProps } from '../../../app/models/Customer'

export interface CustomerRepository {
  findAll(): Promise<CustomerProps[]>
  findByCpf(cpf: string): Promise<CustomerProps | null>
  findById(id: string): Promise<CustomerProps | null>
  updateHasRentById(id: string, hasRent: boolean): void
  update(customer: Partial<CustomerProps>): Promise<CustomerProps>
  create(data: CustomerProps): Promise<Customer>
}
