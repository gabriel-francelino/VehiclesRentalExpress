import { RentalRepository } from '../IRentalRepository'
import { prisma } from '../../prismaService'
import { Rental } from '@prisma/client'

export class PrismaRentalRepository implements RentalRepository {
  async findAll(): Promise<Rental[] | []> {
    const rental = await prisma.rental.findMany()

    return rental
  }

  async findById(id: string): Promise<Rental | null> {
    const rental = await prisma.rental.findUnique({
      where: {
        id,
      },
    })

    if (!rental) {
      return null
    }

    return rental
  }

  async update(data: Rental): Promise<Rental> {
    const rental = await prisma.rental.update({
      where: {
        id: data.id,
      },
      data,
    })

    return rental
  }

  async create(data: Rental): Promise<Rental> {
    const rental = await prisma.rental.create({
      data,
    })

    return rental
  }
}
