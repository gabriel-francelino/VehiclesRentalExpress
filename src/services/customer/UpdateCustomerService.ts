import { StatusCodes } from "http-status-codes";
import { AppError } from "../../error/AppError";
import { Customer } from "../../models/Customer";
import { customerRepository } from "../../repositories/CustomerRepository";
import { CustomerDTO } from "../../dto/CustomerDTO";

class UpdateCustomerService {
  execute(customer: CustomerDTO): Customer {
    const updatedCustomer: Customer = customerRepository.getById(customer.id);

    if (!updatedCustomer) {
      throw new AppError("Customer not found", StatusCodes.NOT_FOUND);
    }

    updatedCustomer.cpf = customer.cpf;
    updatedCustomer.name = customer.name;
    updatedCustomer.dateOfBirth = customer.dateOfBirth;
    updatedCustomer.driverLicense = customer.driverLicense;

    customerRepository.update(updatedCustomer);

    return updatedCustomer;
  }
}

const updateCustomerService = new UpdateCustomerService();

export { updateCustomerService };
