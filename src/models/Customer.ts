import { v4 as uuid } from 'uuid';

export type DriverLicense = 'A' | 'B' | 'C' | 'D' | 'E' | 'AB';

interface CustomerProps {
  id?: string;
  cpf: string;
  name: string;
  dateOfBirth: Date;
  driverLicense: DriverLicense;
  hasRent?: boolean;
}

export class Customer {
  private props: CustomerProps

  constructor(props: CustomerProps) {
    this.props = {
      id: uuid(),
      hasRent: false,
      ...props
    }
  }

  get id(): string {
    return this.id;
  }

  get cpf(): string {
    return this.cpf;
  }

  get name(): string {
    return this.name;
  }

  get dateOfBirth(): Date {
    return this.dateOfBirth;
  }

  get driverLicense(): string {
    return this.driverLicense;
  }

  get hasRent(): boolean {
    return this.hasRent;
  }

  set cpf(cpf: string) {
    this.cpf = cpf;
  }

  set name(name: string) {
    this.name = name;
  }

  set dateOfBirth(dateOfBirth: Date) {
    this.dateOfBirth = dateOfBirth;
  }

  set driverLicense(driverLicense: DriverLicense) {
    this.driverLicense = driverLicense;
  }

  set hasRent(hasRent: boolean) {
    this.hasRent = hasRent;
  }
}