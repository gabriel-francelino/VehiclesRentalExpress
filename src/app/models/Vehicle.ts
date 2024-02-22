import { Replace } from '@/helpers/replace'
import { v4 as uuid } from 'uuid'

export type VehicleType = 'CAR' | 'MOTORCYCLE'

export interface VehicleProps {
  id?: string
  model: string
  color: string
  type: VehicleType
  plate: string
  dailyRental: number
  isRented?: boolean
  increasePorcentage?: number
  updatedAt?: Date | null
  createdAt: Date
}

export class Vehicle {
  private props: VehicleProps

  constructor(props: Replace<VehicleProps, { createdAt?: Date }>) {
    this.props = {
      id: uuid(),
      // isRented: false,
      increasePorcentage: props.type === 'CAR' ? 0.1 : 0.05,
      createdAt: props.createdAt ?? new Date(),
      ...props,
    }
  }

  get id(): string {
    return this.id
  }

  get model(): string {
    return this.model
  }

  get color(): string {
    return this.color
  }

  get type(): VehicleType {
    return this.type
  }

  get plate(): string {
    return this.plate
  }

  get dailyRental(): number {
    return this.dailyRental
  }

  get isRented(): boolean {
    return this.isRented
  }

  get increasePorcentage(): number {
    return this.increasePorcentage
  }

  get updatedAt(): Date | null {
    const updatedAt = this.props.updatedAt

    return updatedAt ?? null
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  set id(newId: string) {
    this.id = newId
  }

  set model(newModel: string) {
    this.model = newModel
  }

  set color(newColor: string) {
    this.color = newColor
  }

  set type(newType: VehicleType) {
    this.type = newType
  }

  set plate(newPlate: string) {
    this.plate = newPlate
  }

  set dailyRental(newDailyRental: number) {
    // if (newDailyRental <= 0) {
    //   throw new BadRequest('O valor do aluguel deve ser maior que zero')
    // }
    this.dailyRental = newDailyRental
  }

  set isRented(newRented: boolean) {
    // if (this.rented === newRented) {
    //   throw new BadRequest('Não pode ser alterado para o mesmo status')
    // }
    this.isRented = newRented
  }

  set increasePorcentage(newIncreasePorcentage: number) {
    this.increasePorcentage = newIncreasePorcentage
  }
}
