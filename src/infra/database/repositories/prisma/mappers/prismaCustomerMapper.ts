import { Customer as RawCustomer } from '@prisma/client'
import { Customer, DriverLicense } from '@/app/models/Customer'

export class PrismaCustomerMapper {
  static toPrisma(customer: Customer) {
    return {
      id: customer?.id,
      cpf: customer.cpf,
      name: customer.name,
      email: customer.email,
      dateOfBirth: customer.dateOfBirth,
      driverLicense: customer.driverLicense,
      hasRent: customer.hasRent,
      createdAt: customer?.createdAt,
      updatedAt: customer?.updatedAt,
    }
  }

  static toDomain(raw: RawCustomer): Customer {
    return new Customer({
      cpf: raw.cpf,
      name: raw.name,
      email: raw.email,
      dateOfBirth: raw.dateOfBirth,
      driverLicense: this.mapDriverLicense(raw.driverLicense),
      hasRent: raw.hasRent,
      updatedAt: raw.updatedAt,
      createdAt: raw.createdAt,
    })
  }

  private static mapDriverLicense(rawLicense: string): DriverLicense {
    switch (rawLicense) {
      case 'A':
      case 'B':
      case 'C':
      case 'D':
      case 'E':
      case 'AB':
        return rawLicense
      default:
        throw new Error(`Invalid driver license: ${rawLicense}`)
    }
  }
}
