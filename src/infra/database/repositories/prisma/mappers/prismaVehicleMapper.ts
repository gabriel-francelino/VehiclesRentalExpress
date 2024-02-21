import { Vehicle as RawVehicle } from '@prisma/client'
import { Vehicle, VehicleType } from '@/app/models/Vehicle'

export class PrismaVehicleMapper {
  static toPrisma(vehicle: Vehicle) {
    return {
      id: vehicle.id,
      model: vehicle.model,
      color: vehicle.color,
      type: vehicle.type,
      plate: vehicle.plate,
      dailyRental: vehicle.dailyRental,
      isRented: vehicle.isRented,
      increasePorcentage: vehicle.increasePorcentage,
      updatedAt: vehicle.updatedAt,
      createdAt: vehicle.createdAt,
    }
  }

  static toDomain(raw: RawVehicle): Vehicle {
    return new Vehicle({
      model: raw.model,
      color: raw.color,
      type: this.mapVehicleType(raw.type),
      plate: raw.plate,
      dailyRental: raw.dailyRental,
      isRented: raw.isRented,
      increasePorcentage: raw.increasePorcentage,
      updatedAt: raw.updatedAt,
      createdAt: raw.createdAt,
    })
  }

  private static mapVehicleType(rawType: string): VehicleType {
    switch (rawType) {
      case 'CAR':
      case 'MOTORCYCLE':
        return rawType
      default:
        throw new Error(`Invalid driver license: ${rawType}`)
    }
  }
}
