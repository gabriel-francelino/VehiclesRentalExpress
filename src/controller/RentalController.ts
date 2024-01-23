import { NextFunction, Request, Response } from "express";
import { RentalDTO } from "../dto/RentalDTO";
import { StatusCodes } from "http-status-codes";
import { Rental } from "../models/Rental";
import { createRentalService } from "../services/rental/CreateRentalService";
import { devolutionRentalService } from "../services/rental/DevolutionRentalService";
import { getAllRentalService } from "../services/rental/GetAllRentalService";

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

    getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const rental: Rental[] = getAllRentalService.execute();
            res.status(StatusCodes.OK).send(rental);
            next();
        } catch (error) {
            next(error);
        }
    }

    return(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            devolutionRentalService.execute(id);
            res.status(StatusCodes.NO_CONTENT).send();
            next();
        } catch (error) {
            next(error);
        }
    }
}

const rentalController = new RentalController();

export { rentalController }