import { CustomerRepository } from '../ICustomerRepository'
import { prisma } from '../../prismaService'
import { Customer, CustomerProps } from '../../../../app/models/Customer'
import { PrismaCustomerMapper } from './mappers/prismaCustomerMapper'

export class PrismaCustomerRepository implements CustomerRepository {
  async findMany(page: number, pageSize: number): Promise<Customer[]> {
    const customerData = await prisma.customer.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
    })

    const customer = customerData.map((item) => {
      return PrismaCustomerMapper.toDomainProps(item) as Customer
    })

    return customer
  }

  async findByCpf(cpf: string): Promise<CustomerProps | null> {
    const customer = await prisma.customer.findUnique({
      where: {
        cpf,
      },
    })

    if (!customer) {
      return null
    }

    return PrismaCustomerMapper.toDomainProps(customer)
  }

  async findByEmail(email: string): Promise<CustomerProps | null> {
    const customer = await prisma.customer.findUnique({
      where: {
        email,
      },
    })

    if (!customer) {
      return null
    }

    return PrismaCustomerMapper.toDomainProps(customer)
  }

  async findById(id: string): Promise<CustomerProps | null> {
    const customer = await prisma.customer.findUnique({
      where: {
        id,
      },
    })

    if (!customer) {
      return null
    }

    return PrismaCustomerMapper.toDomainProps(customer)
  }

  async updateHasRentById(id: string, hasRent: boolean): Promise<void> {
    await prisma.customer.update({
      where: {
        id,
      },
      data: {
        hasRent,
      },
    })
  }

  async update(data: Partial<CustomerProps>): Promise<CustomerProps> {
    const customer = await prisma.customer.update({
      where: {
        id: data.id,
      },
      data,
    })

    return PrismaCustomerMapper.toDomainProps(customer)
  }

  async create(data: Customer): Promise<CustomerProps> {
    const raw = PrismaCustomerMapper.toPrisma(data)

    const customer = await prisma.customer.create({
      data: raw,
    })

    return PrismaCustomerMapper.toDomainProps(customer)
  }

  async delete(id: string): Promise<void> {
    await prisma.customer.delete({
      where: {
        id,
      },
    })
  }
}
