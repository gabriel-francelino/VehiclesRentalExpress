import { StatusCodes } from "http-status-codes";
import { AppError } from "../../error/AppError";
import { Customer } from "../../models/Customer";
import { customerRepository } from "../../repositories/CustomerRepository";

class UpdateCustomerService {
    execute(customer: Customer): Customer {
        if(!customer.id || !customer.cpf || !customer.name || !customer.dateOfBirth || !customer.driverLicense) {
            throw new AppError('Missing required fields', StatusCodes.BAD_REQUEST);
        }

        const updatedCustomer: Customer = customerRepository.update(customer);

        if (!updatedCustomer) {
            throw new AppError('Customer not found', StatusCodes.NOT_FOUND);
        }

        return updatedCustomer;
    }
}

const updateCustomerService = new UpdateCustomerService();

export { updateCustomerService };