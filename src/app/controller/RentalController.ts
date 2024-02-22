import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CreateRentalService } from '../services/rental/CreateRentalService'
import { DevolutionRentalService } from '../services/rental/DevolutionRentalService'
import { GetAllRentalsByCustomerService } from '../services/rental/GetAllRentalsByCustomerService'
import { ZodError, z } from 'zod'
import { PrismaRentalRepository } from '../../infra/database/repositories/prisma/rentalRepository'
import { PrismaCustomerRepository } from '../../infra/database/repositories/prisma/customerRepository'
import { PrismaVehicleRepository } from '../../infra/database/repositories/prisma/vehicleRepository'
import { GetAllRentalService } from '../services/rental/GetAllRentalService'
import { GenerateRentalInvoiceService } from '../services/rental/GenerateRentalInvoiceService'

class RentalController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createRentalInBodySchema = z.object({
        customerId: z.string(),
        vehicleId: z.string(),
        devolutionDate: z.string().refine(
          (dateString) => {
            return !isNaN(Date.parse(dateString))
          },
          { message: 'Invalid date format.' },
        ),
        rentalDate: z.string().refine(
          (dateString) => {
            return !isNaN(Date.parse(dateString))
          },
          { message: 'Invalid date format.' },
        ),
      })

      const { customerId, vehicleId, rentalDate, devolutionDate } =
        createRentalInBodySchema.parse(req.body)

      const rentalRepository = new PrismaRentalRepository()
      const customerRepository = new PrismaCustomerRepository()
      const vehicleRepository = new PrismaVehicleRepository()
      const createrentalService = new CreateRentalService(
        customerRepository,
        vehicleRepository,
        rentalRepository,
      )

      const rental = await createrentalService.execute({
        customerId,
        vehicleId,
        rentalDate: new Date(rentalDate),
        devolutionDate: new Date(devolutionDate),
        createdAt: new Date(),
      })

      res.status(StatusCodes.CREATED).send(rental)
    } catch (error) {
      if (error instanceof ZodError) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Validation error.', issues: error.format() })
      }
      next(error)
    }
  }

  async devolution(req: Request, res: Response, next: NextFunction) {
    try {
      const devolutionInParamsSchema = z.object({
        id: z.string(),
      })

      const { id } = devolutionInParamsSchema.parse(req.params)

      const rentalRepository = new PrismaRentalRepository()
      const customerRepository = new PrismaCustomerRepository()
      const vehicleRepository = new PrismaVehicleRepository()
      const devolutionRentalService = new DevolutionRentalService(
        customerRepository,
        vehicleRepository,
        rentalRepository,
      )

      await devolutionRentalService.execute({ id })
      res.status(StatusCodes.NO_CONTENT).send()
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Validation error.', issues: error.format() })
      }
      next(error)
    }
  }

  async generateInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const devolutionInParamsSchema = z.object({
        id: z.string(),
      })

      const { id } = devolutionInParamsSchema.parse(req.params)

      const rentalRepository = new PrismaRentalRepository()
      const customerRepository = new PrismaCustomerRepository()
      const vehicleRepository = new PrismaVehicleRepository()
      const generateRentalInvoiceService = new GenerateRentalInvoiceService(
        customerRepository,
        vehicleRepository,
        rentalRepository,
      )

      const invoice = await generateRentalInvoiceService.execute({ id })
      res.status(StatusCodes.OK).send(invoice)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Validation error.', issues: error.format() })
      }
      next(error)
    }
  }

  async getAllByCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const getAllRentalByCustomerInParamsSchema = z.object({
        customerId: z.string(),
      })

      const { customerId } = getAllRentalByCustomerInParamsSchema.parse(
        req.params,
      )

      const rentalRepository = new PrismaRentalRepository()
      const customerRepository = new PrismaCustomerRepository()
      const getAllRentalByCustomerService = new GetAllRentalsByCustomerService(
        rentalRepository,
        customerRepository,
      )

      const customer = await getAllRentalByCustomerService.execute({
        customerId,
      })
      res.status(StatusCodes.OK).send(customer)
    } catch (error) {
      if (error instanceof ZodError) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Validation error.', issues: error.format() })
      }
      next(error)
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const rentalRepository = new PrismaRentalRepository()
      const getAllRentalService = new GetAllRentalService(rentalRepository)

      const rentals = await getAllRentalService.execute()
      res.status(StatusCodes.OK).send(rentals)
    } catch (error) {
      next(error)
    }
  }
}

const rentalController = new RentalController()

export { rentalController }
