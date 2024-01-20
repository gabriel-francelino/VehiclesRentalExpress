import { v4 as uuid } from 'uuid'

export class Vehicle {
  private _id: string;
  private _model: string
  private _color: string
  private _chassis: string
  private _type: string
  private _plate: string
  private _dailyRental: number
  private _rented: boolean
  private _increasePorcentage: number

  constructor(model: string, color: string, chassis: string, type: string, plate: string, dailyRental: number, rented: boolean, increasePorcentage: number) {
    this._id = uuid()
    this._model = model
    this._color = color
    this._chassis = chassis
    this._type = type
    this._plate = plate
    this._dailyRental = dailyRental
    this._rented = rented
    this._increasePorcentage = increasePorcentage
  }
  
  get id(): string {
    return this._id
  }

  get model(): string {
    return this._model
  }

  get color(): string {
    return this._color
  }

  get chassis(): string {
    return this._chassis
  }

  get type(): string {
    return this._type
  }

  get plate(): string {
    return this._plate
  }

  get dailyRental(): number {
    return this._dailyRental
  }

  get rented(): boolean {
    return this._rented
  }

  get increasePorcentage(): number {
    return this._increasePorcentage
  }

  set id(newId: string) {
    this._id = newId
  }

  set model(newModel: string) {
    this._model = newModel
  }

  set color(newColor: string) {
    this._color = newColor
  }

  set chassis(newChassis: string) {
    this._chassis = newChassis
  }

  set type(newType: string) {
    this._type = newType
  }

  set plate(newPlate: string) {
    this._plate = newPlate
  }

  set dailyRental(newDailyRental: number) {
    // if (newDailyRental <= 0) {
    //   throw new BadRequest('O valor do aluguel deve ser maior que zero')
    // }
    this._dailyRental = newDailyRental
  }

  set rented(newRented: boolean) {
    // if (this._rented === newRented) {
    //   throw new BadRequest('Não pode ser alterado para o mesmo status')
    // }
    this._rented = newRented
  }

  set increasePorcentage(newIncreasePorcentage: number) {
    this._increasePorcentage = newIncreasePorcentage
  }
}
