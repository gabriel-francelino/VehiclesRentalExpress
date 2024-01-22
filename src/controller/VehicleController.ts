import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Vehicle } from "../models/Vehicle";
import { createVehicleService } from "../services/vehicle/CreateVehicleService";
import { getAllVehicleService } from "../services/vehicle/GetAllVehicleService";
import { getByIdVehicleService } from "../services/vehicle/GetByIdVehicleService";
import { deleteVehicleService } from "../services/vehicle/DeleteVehicleService";

class VehicleController {
    create(req: Request, res: Response, next: NextFunction) {
        const { model, color, type, plate, dailyRental, increasePorcentage } = req.body;
        const vehicle = new Vehicle(model, color, type, plate, dailyRental, increasePorcentage);
        const newVehicle = createVehicleService.execute(vehicle);
        res.status(StatusCodes.CREATED).send(newVehicle);
    }

    getAll(req: Request, res: Response, next: NextFunction) {
        const vehicles = getAllVehicleService.execute();
        res.status(StatusCodes.OK).send(vehicles);
    }

    getById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const vehicle = getByIdVehicleService.execute(id);
        res.status(StatusCodes.OK).send(vehicle);
    }

    update(req: Request, res: Response, next: NextFunction) {

    }

    delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            deleteVehicleService.execute(id);
            res.status(StatusCodes.NO_CONTENT).send();
            next();
        } catch (error) {
            next(error);
        }
    }
}

const vehicleController = new VehicleController();

export { vehicleController };