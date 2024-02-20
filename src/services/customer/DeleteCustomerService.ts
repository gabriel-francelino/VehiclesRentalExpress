import { StatusCodes } from "http-status-codes";
import { AppError } from "../../error/AppError";
import { customerRepository } from "../../repositories/CustomerRepository";

class DeleteCustomerService {
  execute(id: string): void {
    const customer = customerRepository.getById(id);

    if (customer.hasRent) {
      throw new AppError(
        "It is not possible to delete customers with rents",
        StatusCodes.BAD_REQUEST,
      );
    }

    const deletedCustomer = customerRepository.delete(id);

    if (!deletedCustomer) {
      throw new AppError("Customer not found", StatusCodes.NOT_FOUND);
    }
  }
}

const deleteCustomerService = new DeleteCustomerService();

export { deleteCustomerService };
