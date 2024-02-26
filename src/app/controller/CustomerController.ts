import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ZodError, z } from 'zod'
import path from 'path'
import handlebars from 'handlebars'
import { createTemplate } from '../../helpers/TemplateHelper'
import { PrismaCustomerRepository } from '../../infra/database/repositories/prisma/customerRepository'
import { CreateCustomerService } from '../services/customer/CreateCustomerService'
import { GetAllCustomerService } from '../services/customer/GetAllCustomerService'
import { GetByIdCustomerService } from '../services/customer/GetByIdCustomerService'
import { GetByCpfCustomerService } from '../services/customer/GetByCpfCustomerService'
import { UpdateCustomerService } from '../services/customer/UpdateCustomerService'
import { DeleteCustomerService } from '../services/customer/DeleteCustomerService'
import { CustomerDTO } from '../dtos/CustomerDTO'

class CustomerController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createCustomerInBodySchema = z.object({
        cpf: z.string().min(11),
        name: z.string().min(3),
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
      const getAllQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1),
        pageSize: z.coerce.number().min(1).default(10),
      })

      const { page, pageSize } = getAllQuerySchema.parse(req.query)

      const customerRepository = new PrismaCustomerRepository()
      const getAllCustomerService = new GetAllCustomerService(
        customerRepository,
      )

      const customers = await getAllCustomerService.execute({ page, pageSize })
      res.status(StatusCodes.OK).send(customers)
    } catch (error) {
      next(error)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const getByIdCustomerInParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getByIdCustomerInParamsSchema.parse(req.params)

      const customerRepository = new PrismaCustomerRepository()
      const getByIdCustomerService = new GetByIdCustomerService(
        customerRepository,
      )
      const customer = await getByIdCustomerService.execute({ id })

      const customerDTO: CustomerDTO = {
        id: customer.customer.id,
        cpf: customer.customer.cpf,
        name: customer.customer.name,
        email: customer.customer.email,
        dateOfBirth: customer.customer.dateOfBirth.toLocaleString('pt-br'),
        driverLicense: customer.customer.driverLicense,
      }
      // res.status(StatusCodes.OK).send(customer)
      res.status(StatusCodes.OK).format({
        'application/json': () => {
          res.json(customer)
        },
        'text/html': () => {
          const templatePath = createTemplate(
            path.resolve(
              __dirname,
              '..',
              '..',
              'infra',
              'templates',
              'handlebars',
              'Customer.hbs',
            ),
          )

          const template = handlebars.compile(templatePath)

          res.send(template(customerDTO))
        },
      })
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
        cpf: z.string().min(11),
        name: z.string().min(3),
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
        id: z.string().uuid(),
      })

      const updateCustomerInBodySchema = z.object({
        cpf: z.string().min(11).max(11),
        name: z.string().min(3),
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

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleteCustomerInParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = deleteCustomerInParamsSchema.parse(req.params)

      const customerRepository = new PrismaCustomerRepository()
      const deleteCustomerService = new DeleteCustomerService(
        customerRepository,
      )

      await deleteCustomerService.execute(id)
      res.status(StatusCodes.NO_CONTENT).send()
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
