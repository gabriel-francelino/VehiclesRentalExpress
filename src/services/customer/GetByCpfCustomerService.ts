import { NotFound } from "../../error/errors";
import { Customer } from "../../models/Customer";
import { customerRepository } from "../../repositories/CustomerRepository";

class GetByCpfCustomerService {
    execute(cpf: string) : Customer{
        const customer = customerRepository.getByCpf(cpf);

        if (!customer) {
            throw new NotFound("Customer not found");
        }

        return customer;
    }
}

const getByCpfCustomerService = new GetByCpfCustomerService();

export { getByCpfCustomerService };