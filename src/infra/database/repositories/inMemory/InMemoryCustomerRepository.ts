import { Customer } from '@prisma/client'

export class InMemoryCustomerRepository {
  private customers: Customer[] = []

  create(customer: Customer): Customer {
    this.customers.push(customer)

    return customer
  }

  findAll(): Customer[] {
    return this.customers
  }

  findById(id: string): Customer | undefined {
    return this.customers.find((customer) => customer.id === id)
  }

  findByCpf(cpf: string): Customer | undefined {
    return this.customers.find((customer) => customer.cpf === cpf)
  }

  update(updatedCustomer: Customer): Customer | undefined {
    const index = this.customers.findIndex(
      (customer) => customer.id === updatedCustomer.id,
    )

    if (index === -1) {
      return undefined
    }

    this.customers[index] = updatedCustomer
    return this.customers[index]
  }
}
