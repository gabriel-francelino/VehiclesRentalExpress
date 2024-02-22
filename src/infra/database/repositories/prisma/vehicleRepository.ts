import { VehicleRepository } from '../IVehicleRepository'
import { prisma } from '../../prismaService'
import { Vehicle, VehicleProps } from '../../../../app/models/Vehicle'
import { PrismaVehicleMapper } from './mappers/prismaVehicleMapper'

export class PrismaVehicleRepository implements VehicleRepository {
  async findAll(): Promise<Vehicle[] | []> {
    const vehicleData = await prisma.vehicle.findMany()

    const vehicles = vehicleData.map((item) => {
      return PrismaVehicleMapper.toDomainProps(item) as Vehicle
    })

    return vehicles
  }

  // async findById(id: string): Promise<Vehicle | null> {
  //   const vehicle = await prisma.vehicle.findUnique({
  //     where: {
  //       id,
  //     },
  //   })

  //   if (!vehicle) {
  //     return null
  //   }

  //   return vehicle
  // }

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

  // async findRentedStatusById(isRented: boolean): Promise<Vehicle[] | []> {
  //   const vehicle = await prisma.vehicle.findMany({
  //     where: {
  //       isRented,
  //     },
  //   })

  //   return vehicle
  // }

  // async updateRentedStatusById(
  //   id: string,
  //   isRented: boolean,
  // ): Promise<Vehicle> {
  //   const vehicle = await prisma.vehicle.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       isRented,
  //     },
  //   })

  //   return vehicle
  // }

  // async update(data: Vehicle): Promise<Vehicle> {
  //   const vehicle = await prisma.vehicle.update({
  //     where: {
  //       id: data.id,
  //     },
  //     data,
  //   })

  //   return vehicle
  // }

  async create(data: Vehicle): Promise<VehicleProps> {
    const raw = PrismaVehicleMapper.toPrisma(data)

    const vehicle = await prisma.vehicle.create({
      data: raw,
    })

    return PrismaVehicleMapper.toDomainProps(vehicle)
  }
}
