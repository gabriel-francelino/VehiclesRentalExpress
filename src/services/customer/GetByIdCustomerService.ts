import { NotFound } from "../../error/errors";
import { Customer } from "../../models/Customer";
import { customerRepository } from "../../repositories/CustomerRepository";

class GetByIdCustomerService {
    execute(id: string) : Customer{
        const customer = customerRepository.getById(id);

        if (!customer) {
            throw new NotFound("Customer not found");
        }

        return customer;
    }
}

const getByIdCustomerService = new GetByIdCustomerService();

export { getByIdCustomerService };