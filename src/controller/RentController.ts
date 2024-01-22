import { NextFunction, Request, Response } from "express";
import { RentDTO } from "../dto/RentDTO";
import { StatusCodes } from "http-status-codes";
import { Rent } from "../models/Rent";
import { createRentService } from "../services/rent/CreateRentService";

class RentController {
    create(req: Request, res: Response, next: NextFunction) {
        try {
            const rent: RentDTO = req.body;
            const newRent: Rent = createRentService.execute(rent);
            res.status(StatusCodes.CREATED).send(newRent);
            next();
        } catch (error) {
            next(error);
        }
    }
}

const rentController = new RentController();

export { rentController }