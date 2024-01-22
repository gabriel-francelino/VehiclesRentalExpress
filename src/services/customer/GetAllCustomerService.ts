import { Customer } from "../../models/Customer";
import { customerRepository } from "../../repositories/CustomerRepository";

class GetAllCustomerService {
    execute(): Customer[] {
        return customerRepository.getAll();
    }
}

const getAllCustomerService = new GetAllCustomerService();

export { getAllCustomerService };