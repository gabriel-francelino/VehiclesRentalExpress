import { VehicleRepository } from '../IVehicleRepository'
import { prisma } from '../../prismaService'
import { Vehicle, VehicleProps } from '../../../../app/models/Vehicle'
import { PrismaVehicleMapper } from './mappers/prismaVehicleMapper'

export class PrismaVehicleRepository implements VehicleRepository {
  async findMany(page: number, pageSize: number): Promise<Vehicle[] | []> {
    const vehicleData = await prisma.vehicle.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
    })

    const vehicles = vehicleData.map((item) => {
      return PrismaVehicleMapper.toDomainProps(item) as Vehicle
    })

    return vehicles
  }

  async findById(id: string): Promise<VehicleProps | null> {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id,
      },
    })

    if (!vehicle) {
      return null
    }

    return PrismaVehicleMapper.toDomainProps(vehicle)
  }

  async findByPlate(plate: string): Promise<VehicleProps | null> {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        plate,
      },
    })

    if (!vehicle) {
      return null
    }

    return PrismaVehicleMapper.toDomainProps(vehicle)
  }

  async findRentedStatusById(isRentedStatus: boolean): Promise<VehicleProps[]> {
    // console.log('\nisRentedStatus: ', isRentedStatus)
    const vehiclesData = await prisma.vehicle.findMany({
      where: {
        isRented: isRentedStatus,
      },
    })

    const vehicles = vehiclesData.map((item) => {
      return PrismaVehicleMapper.toDomainProps(item) as Vehicle
    })

    return vehicles
  }

  async updateRentedStatusById(id: string, isRented: boolean): Promise<void> {
    await prisma.vehicle.update({
      where: {
        id,
      },
      data: {
        isRented,
      },
    })
  }

  async update(data: Partial<VehicleProps>): Promise<VehicleProps> {
    const vehicle = await prisma.vehicle.update({
      where: {
        id: data.id,
      },
      data,
    })

    return PrismaVehicleMapper.toDomainProps(vehicle)
  }

  async create(data: Vehicle): Promise<VehicleProps> {
    const raw = PrismaVehicleMapper.toPrisma(data)

    const vehicle = await prisma.vehicle.create({
      data: raw,
    })

    return PrismaVehicleMapper.toDomainProps(vehicle)
  }

  async delete(id: string): Promise<void> {
    await prisma.vehicle.delete({
      where: {
        id,
      },
    })
  }
}
