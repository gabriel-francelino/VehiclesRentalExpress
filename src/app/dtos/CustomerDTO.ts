import { DriverLicense } from '../models/Customer'

export interface CustomerDTO {
  id?: string
  cpf: string
  name: string
  email: string
  dateOfBirth: string
  driverLicense: DriverLicense
}
