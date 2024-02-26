import { CustomerProps } from '../../../app/models/Customer'

export interface CustomerRepository {
  findMany(page: number, pageSize: number): Promise<CustomerProps[]>
  findByCpf(cpf: string): Promise<CustomerProps | null>
  findById(id: string): Promise<CustomerProps | null>
  updateHasRentById(id: string, hasRent: boolean): void
  update(customer: Partial<CustomerProps>): Promise<CustomerProps>
  create(data: CustomerProps): Promise<CustomerProps>
  delete(id: string): Promise<void>
}
