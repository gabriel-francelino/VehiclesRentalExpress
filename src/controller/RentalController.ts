import { NextFunction, Request, Response } from "express";
import { RentalDTO } from "../dto/RentalDTO";
import { StatusCodes } from "http-status-codes";
import { Rental } from "../models/Rental";
import { createRentalService } from "../services/rental/CreateRentalService";

class RentalController {
    create(req: Request, res: Response, next: NextFunction) {
        try {
            const rental: RentalDTO = req.body;
            const newRental: Rental = createRentalService.execute(rental);
            res.status(StatusCodes.CREATED).send(newRental);
            next();
        } catch (error) {
            next(error);
        }
    }
}

const rentalController = new RentalController();

export { rentalController }