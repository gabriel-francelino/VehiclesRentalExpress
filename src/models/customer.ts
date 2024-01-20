import { v4 as uuid } from 'uuid';

export class Customer {
  private _id: string;
  private _cpf: string;
  private _name: string;
  private _dateOfBirth: Date;
  private _driverLicense: string;
  private _hasRent: boolean;

  constructor(cpf: string, name: string, dateOfBirth: Date, driverLicense: string) {
    this._id = uuid();
    this._cpf = cpf;
    this._name = name;
    this._dateOfBirth = dateOfBirth;
    this._driverLicense = driverLicense;
    this._hasRent = false;
  }

  get id(): string {
    return this._id;
  }

  get cpf(): string {
    return this._cpf;
  }

  get name(): string {
    return this._name;
  }

  get dateOfBirth(): Date {
    return this._dateOfBirth;
  }

  get driverLicense(): string {
    return this._driverLicense;
  }

  get hasRent(): boolean {
    return this._hasRent;
  }

  set cpf(cpf: string) {
    this._cpf = cpf;
  }

  set name(name: string) {
    this._name = name;
  }

  set dateOfBirth(dateOfBirth: Date) {
    this._dateOfBirth = dateOfBirth;
  }

  set driverLicense(driverLicense: string) {
    this._driverLicense = driverLicense;
  }

  set hasRent(hasRent: boolean) {
    this._hasRent = hasRent;
  }
}