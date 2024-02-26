import { Customer } from '@prisma/client'

export class InMemoryCustomerRepository {
  private customers: Customer[] = []

  async create(customer: Customer): Promise<Customer> {
    this.customers.push(customer)

    return customer
  }

  async findMany(): Promise<Customer[]> {
    return this.customers
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = this.customers.find((customer) => customer.id === id)

    if (!customer) {
      return null
    }

    return customer
  }

  async findByCpf(cpf: string): Promise<Customer | null> {
    const customer = this.customers.find((customer) => customer.cpf === cpf)

    if (!customer) {
      return null
    }

    return customer
  }

  async update(updatedCustomer: Customer): Promise<Customer | null> {
    const index = this.customers.findIndex(
      (customer) => customer.id === updatedCustomer.id,
    )

    if (index === -1) {
      return null
    }

    this.customers[index] = updatedCustomer
    return this.customers[index]
  }
}
