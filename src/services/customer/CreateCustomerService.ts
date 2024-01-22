import { Customer } from "../../models/Customer";
import { customerRepository } from "../../repositories/CustomerRepository";

class CreateCustomerService {
    execute(customer: Customer): Customer {
        const createdCustomer = customerRepository.create(customer);

        return createdCustomer;
    }
}

const createCustomerService = new CreateCustomerService();

export { createCustomerService };