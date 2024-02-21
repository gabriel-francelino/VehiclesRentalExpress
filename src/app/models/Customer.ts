import { Replace } from '@/helpers/replace'
import { v4 as uuid } from 'uuid'

export type DriverLicense = 'A' | 'B' | 'C' | 'D' | 'E' | 'AB'

export interface CustomerProps {
  id?: string
  cpf: string
  name: string
  email: string
  dateOfBirth: Date
  driverLicense: DriverLicense
  hasRent?: boolean
  updatedAt?: Date | null
  createdAt: Date
}

export class Customer {
  private props: CustomerProps

  constructor(props: Replace<CustomerProps, { createdAt?: Date }>) {
    this.props = {
      id: uuid(),
      hasRent: false,
      createdAt: props.createdAt ?? new Date(),
      ...props,
    }
  }

  get id(): string {
    return this.id
  }

  get cpf(): string {
    return this.cpf
  }

  get name(): string {
    return this.name
  }

  get email(): string {
    return this.email
  }

  get dateOfBirth(): Date {
    return this.dateOfBirth
  }

  get driverLicense(): string {
    return this.driverLicense
  }

  get hasRent(): boolean {
    return this.hasRent
  }

  get updatedAt(): Date | null {
    const updatedAt = this.props.updatedAt

    return updatedAt ?? null
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  set cpf(cpf: string) {
    this.cpf = cpf
  }

  set name(name: string) {
    this.name = name
  }

  set dateOfBirth(dateOfBirth: Date) {
    this.dateOfBirth = dateOfBirth
  }

  set driverLicense(driverLicense: DriverLicense) {
    this.driverLicense = driverLicense
  }

  set hasRent(hasRent: boolean) {
    this.hasRent = hasRent
  }
}
