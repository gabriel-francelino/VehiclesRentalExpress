import { NextFunction, Request, Response } from "express";
import { CustomerDTO } from "../dto/CustomerDTO";
import { RentalDTO } from "../dto/RentalDTO";
import { VehicleDTO } from "../dto/VehicleDTO";
import { AppError } from "../error/AppError";
import { StatusCodes } from "http-status-codes";

export const validateCustomerCreationData = (req: Request, res: Response, next: NextFunction) => {
    const { cpf, name, dateOfBirth, driverLicense }: CustomerDTO = req.body;
    const customerDTO: CustomerDTO = { cpf, name, dateOfBirth, driverLicense };
    
    for (const key in customerDTO) {
        if (!customerDTO[key]) {
            // return res.status(400).send({ message: `The field ${key} is required` });
            throw new AppError(`The field ${key} is required`, StatusCodes.BAD_REQUEST);
        }
    }

    if (!['A', 'B', 'C', 'D', 'E', 'AB'].includes(driverLicense)){
        // return res.status(400).send({ message: `Invalid driver license. You can use A, B, C, D, E or AB.` });
        throw new AppError(`Invalid driver license. You can use A, B, C, D, E or AB.`, StatusCodes.BAD_REQUEST);
    }
    
    next();
}

export const validateRentalCreationData = (req: Request, res: Response, next: NextFunction) => {
    const { customerCpf, vehiclePlate, rentalDate, devolutionDate }: RentalDTO = req.body;
    const rentalDTO: RentalDTO = { customerCpf, vehiclePlate, rentalDate, devolutionDate };

    for (const key in rentalDTO) {
        if (!rentalDTO[key]) {
            return res.status(400).send({ message: `The field ${key} is required` });
        }
    }

    next();
}

export const validateVehicleCreationData = (req: Request, res: Response, next: NextFunction) => {
    const { model, color, type, plate, dailyRental }: VehicleDTO = req.body;
    const vehicleDTO: VehicleDTO = { model, color, type, plate, dailyRental };

    for (const key in vehicleDTO) {
        if (!vehicleDTO[key]) {
            return res.status(400).send({ message: `The field ${key} is required` });
        }
    }

    next();
}