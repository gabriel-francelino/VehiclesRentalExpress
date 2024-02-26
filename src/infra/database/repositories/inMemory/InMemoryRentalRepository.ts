import { Rental } from '@prisma/client'

export class InMemoryRentalRepository {
  private rental: Rental[] = []

  async create(rental: Rental): Promise<Rental> {
    this.rental.push(rental)
    return rental
  }

  async findMany(): Promise<Rental[] | []> {
    return this.rental
  }

  async findById(id: string): Promise<Rental | undefined> {
    return this.rental.find((rental) => rental.id === id)
  }

  // TODO: modificar para criar os testes.
  // async findByCustomerCpf(customerCpf: string): Promise<Rental[]> {
  //   return this.rental.filter((rental) => rental.customer.cpf === customerCpf)
  // }

  // async findByVehiclePlate(vehiclePlate: string): Promise<Rental[]> {
  //   return this.rental.filter((rental) => rental.vehicle.plate === vehiclePlate)
  // }
}
