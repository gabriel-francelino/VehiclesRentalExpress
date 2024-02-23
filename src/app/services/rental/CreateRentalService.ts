import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../error/AppError'
import { Rental, RentalProps } from '../../models/Rental'
import { CustomerRepository } from '../../../infra/database/repositories/ICustomerRepository'
import { VehicleRepository } from '../../../infra/database/repositories/IVehicleRepository'
import { RentalRepository } from '../../../infra/database/repositories/IRentalRepository'
import { VehicleType } from '@prisma/client'
import {
  CalculateRentalValueRequest,
  calculateRentalValue,
} from '../../utils/calculateRentalValue'

interface CreateRentalServiceResponse {
  rental: RentalProps
}

interface CreateRentalServiceRequest {
  customerId: string
  vehicleId: string
  rentalDate: Date
  devolutionDate: Date
}

export class CreateRentalService {
  constructor(
    private customerRepository: CustomerRepository,
    private vehicleRepository: VehicleRepository,
    private rentalRepository: RentalRepository,
  ) {}

  async execute(
    rentalData: CreateRentalServiceRequest,
  ): Promise<CreateRentalServiceResponse> {
    const { customerId, vehicleId, rentalDate, devolutionDate } = rentalData

    const customer = await this.customerRepository.findById(customerId)

    // TODO: separar a validacao de carteira e data de devolucao em utils

    if (!customer) {
      throw new AppError('Customer not found', StatusCodes.NOT_FOUND)
    }

    const vehicle = await this.vehicleRepository.findById(vehicleId)

    if (!vehicle) {
      throw new AppError('Vehicle not found', StatusCodes.NOT_FOUND)
    }

    if (vehicle.isRented) {
      throw new AppError('Vehicle already rented', StatusCodes.BAD_REQUEST)
    }

    if (customer.hasRent) {
      throw new AppError('Customer already has a rent', StatusCodes.BAD_REQUEST)
    }

    if (rentalDate > devolutionDate) {
      throw new AppError('Invalid rental date', StatusCodes.BAD_REQUEST)
    }

    if (customer.driverLicense === 'A' && vehicle.type !== 'MOTORCYCLE') {
      throw new AppError(
        "People with driver license 'A' can rent motorcycles only",
        StatusCodes.BAD_REQUEST,
      )
    }

    if (customer.driverLicense === 'B' && vehicle.type === 'MOTORCYCLE') {
      throw new AppError(
        "People with driver license 'B' can rent cars only",
        StatusCodes.BAD_REQUEST,
      )
    }

    const rent = new Rental({
      customerId,
      vehicleId,
      rentalDate,
      devolutionDate,
    })

    this.customerRepository.updateHasRentById(customerId, true)
    this.vehicleRepository.updateRentedStatusById(vehicleId, true)

    // só para parar de dar erro
    const vehicleIncreasePorcentage: number =
      vehicle.type === VehicleType.CAR ? 0.5 : 0.1

    const dataToCalculate: CalculateRentalValueRequest = {
      dailyRental: vehicle.dailyRental,
      increasePorcentage: vehicleIncreasePorcentage,
      rentalDate,
      devolutionDate,
    }

    rent.rentalValue = calculateRentalValue(dataToCalculate)

    const rental: RentalProps = await this.rentalRepository.create(rent)

    return {
      rental,
    }
  }
}
