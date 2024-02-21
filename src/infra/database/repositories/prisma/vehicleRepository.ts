import { VehicleRepository } from '../IVehicleRepository'
import { prisma } from '../../prismaService'
import { Vehicle } from '@prisma/client'

export class PrismaVehicleRepository implements VehicleRepository {
  async findAll(): Promise<Vehicle[] | []> {
    const vehicle = await prisma.vehicle.findMany()

    return vehicle
  }

  async findById(id: string): Promise<Vehicle | null> {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id,
      },
    })

    if (!vehicle) {
      return null
    }

    return vehicle
  }

  async findByPlate(plate: string): Promise<Vehicle | null> {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        plate,
      },
    })

    if (!vehicle) {
      return null
    }

    return vehicle
  }

  async findRentedStatusById(isRented: boolean): Promise<Vehicle[] | []> {
    const vehicle = await prisma.vehicle.findMany({
      where: {
        isRented,
      },
    })

    return vehicle
  }

  async updateRentedStatusById(
    id: string,
    isRented: boolean,
  ): Promise<Vehicle> {
    const vehicle = await prisma.vehicle.update({
      where: {
        id,
      },
      data: {
        isRented,
      },
    })

    return vehicle
  }

  async update(data: Vehicle): Promise<Vehicle> {
    const vehicle = await prisma.vehicle.update({
      where: {
        id: data.id,
      },
      data,
    })

    return vehicle
  }

  async create(data: Vehicle): Promise<Vehicle> {
    const vehicle = await prisma.vehicle.create({
      data,
    })

    return vehicle
  }
}
