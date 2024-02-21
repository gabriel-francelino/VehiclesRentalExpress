import { CustomerRepository } from '../ICustomerRepository'
import { prisma } from '../../prismaService'
import { Customer } from '@prisma/client'

export class PrismaCustomerRepository implements CustomerRepository {
  async findAll(): Promise<Customer[]> {
    const customer = await prisma.customer.findMany()

    return customer
  }

  async findByCpf(cpf: string): Promise<Customer | null> {
    const customer = await prisma.customer.findUnique({
      where: {
        cpf,
      },
    })

    if (!customer) {
      return null
    }

    return customer
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await prisma.customer.findUnique({
      where: {
        email,
      },
    })

    if (!customer) {
      return null
    }

    return customer
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    })

    if (!customer) {
      return null
    }

    return customer
  }

  async update(data: Customer): Promise<Customer> {
    const customer = await prisma.customer.update({
      where: {
        id: data.id,
      },
      data,
    })

    return customer
  }

  async create(data: Customer): Promise<Customer> {
    const customer = await prisma.customer.create({
      data,
    })

    return customer
  }
}
