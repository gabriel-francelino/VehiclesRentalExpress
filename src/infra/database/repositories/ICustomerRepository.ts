import { Customer } from '@prisma/client'

export interface CustomerRepository {
  findAll(): Promise<Customer[]>
  findByCpf(cpf: string): Promise<Customer | null>
  findById(id: string): Promise<Customer | null>
  update(customer: Customer): Promise<Customer>
  create(data: Customer): Promise<Customer>
}
