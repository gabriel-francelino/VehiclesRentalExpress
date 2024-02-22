import { PrismaVehicleRepository } from '../../infra/database/repositories/prisma/vehicleRepository'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ZodError, z } from 'zod'
import { CreateVehicleService } from '../services/vehicle/CreateVehicleService'
import { GetAllVehicleService } from '../services/vehicle/GetAllVehicleService'

class VehicleController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createVehicleInBodySchema = z.object({
        model: z.string(),
        color: z.string(),
        type: z.enum(['CAR', 'MOTORCYCLE']),
        plate: z.string(),
        dailyRental: z.number().positive(),
      })

      const { model, color, type, plate, dailyRental } =
        createVehicleInBodySchema.parse(req.body)

      const vehicleRepository = new PrismaVehicleRepository()
      const createVehicleService = new CreateVehicleService(vehicleRepository)

      const vehicle = await createVehicleService.execute({
        model,
        color,
        type,
        plate,
        dailyRental,
        isRented: false,
        createdAt: new Date(),
      })

      res.status(StatusCodes.CREATED).send(vehicle)
      // next();
    } catch (error) {
      if (error instanceof ZodError) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Validation error.', issues: error.format() })
      }
      next(error)
    }
  }

  //   getAvailable(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const availableVehicles = getAvailableVehicleService.execute()
  //       res.status(StatusCodes.OK).send(availableVehicles)
  //       // next();
  //     } catch (error) {
  //       next(error)
  //     }
  //   }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicleRepository = new PrismaVehicleRepository()
      const getAllVehicleService = new GetAllVehicleService(vehicleRepository)

      const vehicles = await getAllVehicleService.execute()
      res.status(StatusCodes.OK).send(vehicles)
      // next();
    } catch (error) {
      next(error)
    }
  }

  //   getById(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const { id } = req.params
  //       const vehicle = getByIdVehicleService.execute(id)
  //       res.status(StatusCodes.OK).send(vehicle)
  //       // next();
  //     } catch (error) {
  //       next(error)
  //     }
  //   }
  //   update(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const updatedVehicle = updateVehicleService.execute(req.body)
  //       res.status(StatusCodes.OK).send(updatedVehicle)
  //     } catch (error) {
  //       next(error)
  //     }
  //   }
  //   delete(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const { id } = req.params
  //       deleteVehicleService.execute(id)
  //       res.status(StatusCodes.NO_CONTENT).send()
  //       // next();
  //     } catch (error) {
  //       next(error)
  //     }
  //   }
}

const vehicleController = new VehicleController()

export { vehicleController }
