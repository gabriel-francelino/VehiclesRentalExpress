import { NotFound } from "../../error/Errors";
import { customerRepository } from "../../repositories/CustomerRepository";

class DeleteCustomerService {
    execute(id: string): void {
        const deletedCustomer = customerRepository.delete(id);

        if (!deletedCustomer) {
            throw new NotFound("Customer not found");
        }
    }
}

const deleteCustomerService = new DeleteCustomerService();

export { deleteCustomerService };