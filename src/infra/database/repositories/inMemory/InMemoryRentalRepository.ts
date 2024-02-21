import { Rental } from '@prisma/client'

export class InMemoryRentalRepository {
  private rental: Rental[] = []

  async create(rental: Rental): Promise<Rental> {
    this.rental.push(rental)
    return rental
  }

  async getAll(): Promise<Rental[] | []> {
    return this.rental
  }

  async getAllActive(): Promise<Rental[] | []> {
    return this.rental
  }

  async getById(id: string): Promise<Rental | undefined> {
    return this.rental.find((rental) => rental.id === id)
  }

  // TODO: modificar para criar os testes.
  // async getByCustomerCpf(customerCpf: string): Promise<Rental[]> {
  //   return this.rental.filter((rental) => rental.customer.cpf === customerCpf)
  // }

  // async getByVehiclePlate(vehiclePlate: string): Promise<Rental[]> {
  //   return this.rental.filter((rental) => rental.vehicle.plate === vehiclePlate)
  // }
}
