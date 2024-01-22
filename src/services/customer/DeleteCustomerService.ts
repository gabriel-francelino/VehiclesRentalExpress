import { StatusCodes } from "http-status-codes";
import { AppError } from "../../error/AppError";
import { customerRepository } from "../../repositories/CustomerRepository";

class DeleteCustomerService {
    execute(id: string): void {
        const deletedCustomer = customerRepository.delete(id);

        if (!deletedCustomer) {
            throw new AppError("Customer not found", StatusCodes.NOT_FOUND);
        }
    }
}

const deleteCustomerService = new DeleteCustomerService();

export { deleteCustomerService };