import { StatusCodes } from 'http-status-codes'
import { AppError } from '../../error/AppError'
import { CustomerProps, DriverLicense } from '../../models/Customer'
import { CustomerRepository } from '@/infra/database/repositories/ICustomerRepository'

interface UpdateCustomerServiceRequest {
  id: string
  cpf: string
  email: string
  name: string
  driverLicense: DriverLicense
}

interface UpdateCustomerServiceResponse {
  customer: CustomerProps
}

export class UpdateCustomerService {
  constructor(private customerRepository: CustomerRepository) {}
  async execute({
    id,
    cpf,
    email,
    name,
    driverLicense,
  }: UpdateCustomerServiceRequest): Promise<UpdateCustomerServiceResponse> {
    const customerData = await this.customerRepository.findById(id)

    if (!customerData) {
      throw new AppError('Customer not found', StatusCodes.NOT_FOUND)
    }

    const data = { id, cpf, email, name, driverLicense }

    const customer = await this.customerRepository.update(data)

    return {
      customer,
    }
  }
}
