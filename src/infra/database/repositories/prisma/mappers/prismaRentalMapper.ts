import { Rental as RawRental } from '@prisma/client'
import { Rental, RentalProps } from '../../../../../app/models/Rental'

export class PrismaRentalMapper {
  static toPrisma(rental: Rental) {
    return {
      id: rental.id,
      customerId: rental.customerId,
      vehicleId: rental.vehicleId,
      rentalDate: rental.rentalDate,
      devolutionDate: rental.devolutionDate,
      rentalValue: rental.rentalValue,
      updatedAt: rental.updatedAt,
      createdAt: rental.createdAt,
    }
  }

  static toDomain(raw: RawRental): Rental {
    return new Rental({
      customerId: raw.customerId,
      vehicleId: raw.vehicleId,
      rentalDate: raw.rentalDate,
      devolutionDate: raw.devolutionDate,
      rentalValue: raw.rentalValue,
      updatedAt: raw.updatedAt,
      createdAt: raw.createdAt,
    })
  }

  static toDomainProps(raw: RawRental): RentalProps {
    return {
      id: raw.id,
      customerId: raw.customerId,
      vehicleId: raw.vehicleId,
      rentalDate: raw.rentalDate,
      devolutionDate: raw.devolutionDate,
      rentalValue: raw.rentalValue,
      updatedAt: raw.updatedAt,
      createdAt: raw.createdAt,
    }
  }
}
