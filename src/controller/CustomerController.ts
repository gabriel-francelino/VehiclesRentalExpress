import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getAllCustomerService } from "../services/customer/GetAllCustomerService";
import { getByIdCustomerService } from "../services/customer/GetByIdCustomerService";
import { getByCpfCustomerService } from "../services/customer/GetByCpfCustomerService";
import { deleteCustomerService } from "../services/customer/DeleteCustomerService";
import { createCustomerService } from "../services/customer/CreateCustomerService";
import { Customer } from "../models/Customer";
import { updateCustomerService } from "../services/customer/UpdateCustomerService";

class CustomerController {
    create(req: Request, res: Response, next: NextFunction) {
        try {
            const { cpf, name, dateOfBirth, driverLicense } = req.body;
            const customer = new Customer(cpf, name, dateOfBirth, driverLicense);
            const createdCustomer = createCustomerService.execute(customer);
            res.status(StatusCodes.CREATED).send(createdCustomer);
        } catch (error) {
            next(error);
        }
    }

    getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const customers: Customer[] = getAllCustomerService.execute();
            res.status(StatusCodes.OK).send(customers);
        } catch (error) {
            next(error);
        }
    }

    getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const customer: Customer = getByIdCustomerService.execute(id);
            res.status(StatusCodes.OK).send(customer);
        } catch (error) {
            next(error);
        }
    }

    getByCpf(req: Request, res: Response, next: NextFunction) {
        try {
            const { cpf } = req.params;
            const customer: Customer = getByCpfCustomerService.execute(cpf);
            res.status(StatusCodes.OK).send(customer);
        } catch (error) {
            next(error);
        }
    }

    update(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedCustomer: Customer = updateCustomerService.execute(req.body);
            res.status(StatusCodes.OK).send(updatedCustomer);
        } catch (error) {
            next(error);
        }
    }

    delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            deleteCustomerService.execute(id);
            res.status(StatusCodes.NO_CONTENT).send();
        } catch (error) {
            next(error);
        }
    }
}

const customerController = new CustomerController();

export { customerController };