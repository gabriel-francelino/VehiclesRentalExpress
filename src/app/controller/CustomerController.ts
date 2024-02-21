import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ZodError, z } from 'zod'
import { PrismaCustomerRepository } from '../../infra/database/repositories/prisma/customerRepository'
import { CreateCustomerService } from '../services/customer/CreateCustomerService'
import { GetAllCustomerService } from '../services/customer/GetAllCustomerService'
import { GetByIdCustomerService } from '../services/customer/GetByIdCustomerService'
import { GetByCpfCustomerService } from '../services/customer/GetByCpfCustomerService'
import { UpdateCustomerService } from '../services/customer/UpdateCustomerService'

class CustomerController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createCustomerInBodySchema = z.object({
        cpf: z.string(),
        name: z.string(),
        email: z.string().email(),
        dateOfBirth: z.string().refine(
          (dateString) => {
            return !isNaN(Date.parse(dateString))
          },
          { message: 'Invalid date format.' },
        ),
        driverLicense: z.enum(['A', 'B', 'C', 'D', 'E', 'AB']),
      })

      const { cpf, name, email, dateOfBirth, driverLicense } =
        createCustomerInBodySchema.parse(req.body)

      const customerRepository = new PrismaCustomerRepository()
      const createCustomerService = new CreateCustomerService(
        customerRepository,
      )

      const customer = await createCustomerService.execute({
        cpf,
        name,
        email,
        dateOfBirth: new Date(dateOfBirth),
        driverLicense,
        hasRent: false,
        createdAt: new Date(),
      })

      res.status(StatusCodes.CREATED).send(customer)
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
      const customerRepository = new PrismaCustomerRepository()
      const getAllCustomerService = new GetAllCustomerService(
        customerRepository,
      )

      const customers = await getAllCustomerService.execute()
      res.status(StatusCodes.OK).send(customers)
    } catch (error) {
      next(error)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const getByIdCustomerInParamsSchema = z.object({
        id: z.string(),
      })

      const { id } = getByIdCustomerInParamsSchema.parse(req.params)

      const customerRepository = new PrismaCustomerRepository()
      const getByIdCustomerService = new GetByIdCustomerService(
        customerRepository,
      )
      const customer = await getByIdCustomerService.execute({ id })
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

  async getByCpf(req: Request, res: Response, next: NextFunction) {
    try {
      const getByCpfCustomerInQuerySchema = z.object({
        cpf: z.string(),
        name: z.string(),
        email: z.string().email(),
        dateOfBirth: z.string().refine(
          (dateString) => {
            return !isNaN(Date.parse(dateString))
          },
          { message: 'Invalid date format.' },
        ),
        driverLicense: z.enum(['A', 'B', 'C', 'D', 'E', 'AB']),
      })

      const { cpf } = getByCpfCustomerInQuerySchema.parse(req.query)

      const customerRepository = new PrismaCustomerRepository()
      const getByCpfCustomerService = new GetByCpfCustomerService(
        customerRepository,
      )
      const customer = await getByCpfCustomerService.execute({ cpf })
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

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updateCustomerInParamsSchema = z.object({
        id: z.string(),
      })

      const updateCustomerInBodySchema = z.object({
        cpf: z.string(),
        name: z.string(),
        email: z.string().email(),
        driverLicense: z.enum(['A', 'B', 'C', 'D', 'E', 'AB']),
      })

      const { cpf, name, email, driverLicense } =
        updateCustomerInBodySchema.parse(req.body)
      const { id } = updateCustomerInParamsSchema.parse(req.params)

      const customerRepository = new PrismaCustomerRepository()
      const updateCustomerService = new UpdateCustomerService(
        customerRepository,
      )

      const updatedCustomer = await updateCustomerService.execute({
        id,
        cpf,
        name,
        email,
        driverLicense,
      })
      res.status(StatusCodes.OK).send(updatedCustomer)
    } catch (error) {
      if (error instanceof ZodError) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Validation error.', issues: error.format() })
      }
      next(error)
    }
  }
}

const customerController = new CustomerController()

export { customerController }
