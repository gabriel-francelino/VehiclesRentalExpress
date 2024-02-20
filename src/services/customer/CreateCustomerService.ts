import { StatusCodes } from "http-status-codes";
import { AppError } from "../../error/AppError";
import { Customer } from "../../models/Customer";
import { customerRepository } from "../../repositories/CustomerRepository";

class CreateCustomerService {
  execute(customer: Customer): Customer {
    const customers: Customer[] = customerRepository.getAll();

    customers.forEach((c) => {
      if (c.cpf === customer.cpf) {
        throw new AppError(
          "Customer with this CPF already exists!",
          StatusCodes.CONFLICT,
        );
      }
    });

    const createdCustomer = customerRepository.create(customer);

    return createdCustomer;
  }
}

const createCustomerService = new CreateCustomerService();

export { createCustomerService };
