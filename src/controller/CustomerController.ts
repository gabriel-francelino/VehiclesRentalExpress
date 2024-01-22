import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getAllCustomerService } from "../services/customer/GetAllCustomerService";
import { getByIdCustomerService } from "../services/customer/GetByIdCustomerService";
import { getByCpfCustomerService } from "../services/customer/GetByCpfCustomerService";
import { deleteCustomerService } from "../services/customer/DeleteCustomerService";

class CustomerController {
    getAll(req: Request, res: Response, next: NextFunction) {
        const customers = getAllCustomerService.execute();
        res.status(StatusCodes.OK).send(customers);
    }

    getById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const customer = getByIdCustomerService.execute(id);
        res.status(StatusCodes.OK).send(customer);
    }

    getByCpf(req: Request, res: Response, next: NextFunction) {
        const { cpf } = req.params;
        const customer = getByCpfCustomerService.execute(cpf);
        res.status(StatusCodes.OK).send(customer);
    }

    delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        deleteCustomerService.execute(id);
        res.status(StatusCodes.NO_CONTENT).send();
    }
}

const customerController = new CustomerController();

export { customerController };