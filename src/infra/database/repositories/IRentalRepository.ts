import { Rental, Prisma } from '@prisma/client'

export interface RentalRepository {
  findAll(): Promise<Rental[] | []>
  findById(id: string): Promise<Rental | null>
  // findByCustomerCpf(cpf: string): Promise<Rental | null>
  // findByPlate(plateId: string): Promise<Rental | null>
  update(rental: Rental): Promise<Rental>
  create(data: Prisma.RentalUncheckedCreateInput): Promise<Rental>
}
