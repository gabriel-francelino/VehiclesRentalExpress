import { StatusCodes } from "http-status-codes";
import { AppError } from "../../error/AppError";
import { Customer } from "../../models/Customer";
import { customerRepository } from "../../repositories/CustomerRepository";

class GetByIdCustomerService {
  execute(id: string): Customer {
    const customer = customerRepository.getById(id);

    if (!customer) {
      throw new AppError("Customer not found", StatusCodes.NOT_FOUND);
    }

    return customer;
  }
}

const getByIdCustomerService = new GetByIdCustomerService();

export { getByIdCustomerService };
