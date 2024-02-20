import { StatusCodes } from "http-status-codes";
import { AppError } from "../../error/AppError";
import { Customer } from "../../models/Customer";
import { customerRepository } from "../../repositories/CustomerRepository";

class GetByCpfCustomerService {
  execute(cpf: string): Customer {
    const customer = customerRepository.getByCpf(cpf);

    if (!customer) {
      throw new AppError("Customer not found", StatusCodes.NOT_FOUND);
    }

    return customer;
  }
}

const getByCpfCustomerService = new GetByCpfCustomerService();

export { getByCpfCustomerService };
