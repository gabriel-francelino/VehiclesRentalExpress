import { v4 as uuid } from 'uuid'

export type VehicleType = 'car' | 'motorcycle'

interface VehicleProps {
  id?: string
  model: string
  color: string
  type: VehicleType
  plate: string
  dailyRental: number
  rented?: boolean
  increasePorcentage?: number
}

export class Vehicle {
  private props: VehicleProps

  constructor(props: VehicleProps) {
    this.props = {
      id: uuid(),
      rented: false,
      increasePorcentage: props.type === 'car' ? 0.1 : 0.05,
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

  get type(): string {
    return this.type
  }

  get plate(): string {
    return this.plate
  }

  get dailyRental(): number {
    return this.dailyRental
  }

  get rented(): boolean {
    return this.rented
  }

  get increasePorcentage(): number {
    return this.increasePorcentage
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

  set rented(newRented: boolean) {
    // if (this.rented === newRented) {
    //   throw new BadRequest('Não pode ser alterado para o mesmo status')
    // }
    this.rented = newRented
  }

  set increasePorcentage(newIncreasePorcentage: number) {
    this.increasePorcentage = newIncreasePorcentage
  }
}
