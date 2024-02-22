import { PrismaVehicleRepository } from '../../infra/database/repositories/prisma/vehicleRepository'
import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ZodError, z } from 'zod'
import { CreateVehicleService } from '../services/vehicle/CreateVehicleService'
import { GetAllVehicleService } from '../services/vehicle/GetAllVehicleService'
import { UpdateVehicleService } from '../services/vehicle/UpdateVehicleService'
import { GetByIdVehicleService } from '../services/vehicle/GetByIdVehicleService'
import { GetAvailableVehicleService } from '../services/vehicle/GetAvailableVehicleService'
import { GetByPlateVehicleService } from '../services/vehicle/GetByPlateVehicleService'
import { DeleteVehicleService } from '../services/vehicle/DeleteVehicleService'

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

  async getAvailable(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicleRepository = new PrismaVehicleRepository()
      const getAvailableVehicleService = new GetAvailableVehicleService(
        vehicleRepository,
      )

      const availableVehicles = await getAvailableVehicleService.execute()
      res.status(StatusCodes.OK).send(availableVehicles)
      // next();
    } catch (error) {
      next(error)
    }
  }

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

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const getByIdVehicleInParamsSchema = z.object({
        id: z.string(),
      })

      const { id } = getByIdVehicleInParamsSchema.parse(req.params)

      const vehicleRepository = new PrismaVehicleRepository()
      const getByIdVehicleService = new GetByIdVehicleService(vehicleRepository)

      const vehicle = await getByIdVehicleService.execute({ id })
      res.status(StatusCodes.OK).send(vehicle)
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

  async getByPlate(req: Request, res: Response, next: NextFunction) {
    try {
      const getByPlateVehicleInParamsSchema = z.object({
        plate: z.string(),
      })

      const { plate } = getByPlateVehicleInParamsSchema.parse(req.body)

      const vehicleRepository = new PrismaVehicleRepository()
      const getByPlateVehicleService = new GetByPlateVehicleService(
        vehicleRepository,
      )

      const vehicle = await getByPlateVehicleService.execute({ plate })
      res.status(StatusCodes.OK).send(vehicle)
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

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updateVehicleInParamsSchema = z.object({
        id: z.string(),
      })

      const updateVehicleInBodySchema = z.object({
        model: z.string(),
        color: z.string(),
        type: z.enum(['CAR', 'MOTORCYCLE']),
        plate: z.string(),
        dailyRental: z.number().positive(),
      })

      const { id } = updateVehicleInParamsSchema.parse(req.params)
      const { model, color, type, plate, dailyRental } =
        updateVehicleInBodySchema.parse(req.body)

      const vehicleRepository = new PrismaVehicleRepository()
      const updateVehicleService = new UpdateVehicleService(vehicleRepository)

      const updatedVehicle = await updateVehicleService.execute({
        id,
        model,
        color,
        type,
        plate,
        dailyRental,
      })
      res.status(StatusCodes.OK).send(updatedVehicle)
    } catch (error) {
      if (error instanceof ZodError) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Validation error.', issues: error.format() })
      }
      next(error)
    }
  }

  delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleteVehicleInParamsSchema = z.object({
        id: z.string(),
      })

      const { id } = deleteVehicleInParamsSchema.parse(req.params)

      const vehicleRepository = new PrismaVehicleRepository()
      const deleteVehicleService = new DeleteVehicleService(vehicleRepository)

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
