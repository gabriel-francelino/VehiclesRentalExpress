import { RentalProps } from '@/app/models/Rental'

export interface RentalRepository {
  findAll(): Promise<RentalProps[] | []>
  findById(id: string): Promise<RentalProps | null>
  findRentalsByCustomerId(id: string): Promise<RentalProps[]>
  updateDevolutionById(id: string, devolutionDate: Date): void
  update(rental: RentalProps): Promise<RentalProps>
  create(data: RentalProps): Promise<RentalProps>
}
