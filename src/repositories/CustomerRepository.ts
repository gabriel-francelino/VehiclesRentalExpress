import { Customer } from "../models/Customer";

class CustomerRepository {
  private customers: Customer[] = [
    new Customer("15948726301", "João da Silva", new Date("1990-01-01"), "AB"),
    new Customer("75395185202", "Maria da Silva", new Date("2001-01-01"), "B"),
    new Customer("45678912303", "José da Silva", new Date("1998-01-01"), "B"),
    new Customer("12345678904", "Ana da Silva", new Date("1998-01-01"), "AB"),
    new Customer("98765432105", "Paulo da Silva", new Date("2000-01-01"), "A"),
    new Customer("74185296306", "Marta da Silva", new Date("1987-01-01"), "B"),
    new Customer(
      "85296374107",
      "Carlos da Silva",
      new Date("1990-01-01"),
      "AB",
    ),
  ];

  public create(customer: Customer): Customer {
    this.customers.push(customer);

    return customer;
  }

  public getAll(): Customer[] {
    return this.customers;
  }

  public getById(id: string): Customer | undefined {
    return this.customers.find((customer) => customer.id === id);
  }

  public getByCpf(cpf: string): Customer | undefined {
    return this.customers.find((customer) => customer.cpf === cpf);
  }

  public update(updatedCustomer: Customer): Customer | undefined {
    const index = this.customers.findIndex(
      (customer) => customer.id === updatedCustomer.id,
    );

    if (index === -1) {
      return undefined;
    }

    this.customers[index] = updatedCustomer;
    return this.customers[index];
  }

  public delete(id: string): Customer | undefined {
    const index = this.customers.findIndex((customer) => customer.id === id);

    if (index === -1) {
      return undefined;
    }

    const deletedCustomer = this.customers[index];
    this.customers.splice(index, 1);

    return deletedCustomer;
  }
}

const customerRepository = new CustomerRepository();

export { customerRepository };
