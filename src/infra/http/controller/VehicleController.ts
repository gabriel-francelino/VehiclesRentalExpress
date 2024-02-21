import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

import { Vehicle } from '@/models/Vehicle'
import { createVehicleService } from '@/services/vehicle/CreateVehicleService'
import { getAllVehicleService } from '@/services/vehicle/GetAllVehicleService'
import { getByIdVehicleService } from '@/services/vehicle/GetByIdVehicleService'
import { deleteVehicleService } from '@/services/vehicle/DeleteVehicleService'
import { getAvailableVehicleService } from '@/services/vehicle/GetAvailableVehicleService'
import { updateVehicleService } from '@/services/vehicle/UpdateVehicleService'

class VehicleController {
  create(req: Request, res: Response, next: NextFunction) {
    try {
      const { model, color, type, plate, dailyRental } = req.body
      const vehicle = new Vehicle({ model, color, type, plate, dailyRental })
      const newVehicle = createVehicleService.execute(vehicle)
      res.status(StatusCodes.CREATED).send(newVehicle)
      // next();
    } catch (error) {
      next(error)
    }
  }

  getAvailable(req: Request, res: Response, next: NextFunction) {
    try {
      const availableVehicles = getAvailableVehicleService.execute()
      res.status(StatusCodes.OK).send(availableVehicles)
      // next();
    } catch (error) {
      next(error)
    }
  }

  getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicles = getAllVehicleService.execute()
      res.status(StatusCodes.OK).send(vehicles)
      // next();
    } catch (error) {
      next(error)
    }
  }

  getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const vehicle = getByIdVehicleService.execute(id)
      res.status(StatusCodes.OK).send(vehicle)
      // next();
    } catch (error) {
      next(error)
    }
  }

  update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedVehicle = updateVehicleService.execute(req.body)
      res.status(StatusCodes.OK).send(updatedVehicle)
    } catch (error) {
      next(error)
    }
  }

  delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      deleteVehicleService.execute(id)
      res.status(StatusCodes.NO_CONTENT).send()
      // next();
    } catch (error) {
      next(error)
    }
  }
}

const vehicleController = new VehicleController()

export { vehicleController }
