import { v4 as uuid } from 'uuid'

import { Replace } from '@/helpers/replace'

export interface RentalProps {
  id?: string
  customerId: string
  vehicleId: string
  rentalDate: Date
  devolutionDate: Date
  rentalValue?: number
  updatedAt?: Date | null
  createdAt: Date
}

export interface Invoice {
  customerName: string
  customerCpf: string
  customerCnh: string
  vehiclePlate: string
  vehicleType: string
  vehicleModel: string
  vehicleRental: number
  rentalDate: Date
  devolutionDate: Date
  rentalValue: number
}

export class Rental {
  private props: RentalProps

  constructor(props: Replace<RentalProps, { createdAt?: Date }>) {
    this.props = {
      id: uuid(),
      rentalValue: 0.0,
      createdAt: props.createdAt ?? new Date(),
      ...props,
    }
  }

  get id(): string {
    return this.id
  }

  get customerId(): string {
    return this.customerId
  }

  get vehicleId(): string {
    return this.vehicleId
  }

  get rentalDate(): Date {
    return this.rentalDate
  }

  get devolutionDate(): Date {
    return this.devolutionDate
  }

  get rentalValue(): number {
    return this.rentalValue
  }

  get updatedAt(): Date | null {
    const updatedAt = this.props.updatedAt

    return updatedAt ?? null
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  set customerId(customer: string) {
    this.customerId = customer
  }

  set vehicleId(vehicle: string) {
    this.vehicleId = vehicle
  }

  set rentalDate(rentalDate: Date) {
    this.rentalDate = rentalDate
  }

  set devolutionDate(devolutionDate: Date) {
    this.devolutionDate = devolutionDate
  }

  set rentalValue(rentalValue: number) {
    this.rentalValue = rentalValue
  }
}
