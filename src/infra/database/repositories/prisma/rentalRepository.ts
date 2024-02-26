import { RentalRepository } from '../IRentalRepository'
import { prisma } from '../../prismaService'
import { Rental, RentalProps } from '../../../../app/models/Rental'
import { PrismaRentalMapper } from './mappers/prismaRentalMapper'

export class PrismaRentalRepository implements RentalRepository {
  async findMany(): Promise<Rental[] | []> {
    const rentalData = await prisma.rental.findMany()

    const rentals = rentalData.map((item) => {
      return PrismaRentalMapper.toDomainProps(item) as Rental
    })

    return rentals
  }

  async findById(id: string): Promise<RentalProps | null> {
    const rental = await prisma.rental.findUnique({
      where: {
        id,
      },
    })

    if (!rental) {
      return null
    }

    return PrismaRentalMapper.toDomainProps(rental)
  }

  async findRentalsByCustomerId(customerId: string): Promise<RentalProps[]> {
    const rentalData = await prisma.rental.findMany({
      where: {
        customerId,
      },
    })

    const rentals = rentalData.map((item) => {
      return PrismaRentalMapper.toDomainProps(item) as Rental
    })

    return rentals
  }

  async updateDevolutionById(id: string, devolutionDate: Date) {
    await prisma.rental.update({
      where: {
        id,
      },
      data: {
        devolutionDate,
      },
    })
  }

  async update(data: Rental): Promise<Rental> {
    const rental = await prisma.rental.update({
      where: {
        id: data.id,
      },
      data,
    })

    return PrismaRentalMapper.toDomainProps(rental) as Rental
  }

  async create(data: Rental): Promise<RentalProps> {
    const raw = PrismaRentalMapper.toPrisma(data)

    const rental = await prisma.rental.create({
      data: raw,
    })

    return PrismaRentalMapper.toDomainProps(rental)
  }
}
