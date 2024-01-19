import { Customer, ECategoryType } from "../models/customer";

class CustomerRepository {
    private customers: Customer[] = [
        new Customer("12345678910", "João", new Date("1990-01-01"), "A" as ECategoryType),
        new Customer("12345678911", "Pedro", new Date("2002-12-20"), ECategoryType.B),
        new Customer("12345678912", "Daniel", new Date("2003-05-03"), ECategoryType.B),
        new Customer("12345678913", "Carlos", new Date("1998-01-15"), ECategoryType.B),
        new Customer("12345678914", "Gabriel", new Date("1997-11-22"), ECategoryType.A),
    ];
}

const customerRepository = new CustomerRepository();

export { customerRepository };