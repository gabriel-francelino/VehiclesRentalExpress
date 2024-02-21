import { v4 as uuid } from 'uuid'

import { Customer } from './Customer'
import { Vehicle } from './Vehicle'
import { Replace } from '@/helpers/replace'

interface RentalProps {
  id?: string
  customer: Customer
  vehicle: Vehicle
  rentalDate: Date
  devolutionDate: Date
  rentalValue?: number
  updatedAt?: Date | undefined
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

  get customer(): Customer {
    return this.customer
  }

  get vehicle(): Vehicle {
    return this.vehicle
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

  get updatedAt(): Date | null | undefined {
    const updatedAt = this.props.updatedAt

    return updatedAt
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  set customer(customer: Customer) {
    this.customer = customer
  }

  set vehicle(vehicle: Vehicle) {
    this.vehicle = vehicle
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
