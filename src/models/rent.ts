import { v4 as uuid } from "uuid";

import { Customer } from "./Customer";
import { Vehicle } from "./Vehicle";

export interface Invoice {
    customerName: string;
    customerCpf: string;
    customerCnh: string;
    vehiclePlate: string;
    vehicleType: string;
    vehicleModel: string;
    vehicleRental: number;
    rentalDate: Date;
    devolutionDate: Date;
    valueRental: number;
}
export class Rent {
    private _id: string;
    private _customer: Customer;
    private _vehicle: Vehicle;
    private _rentalDate: Date;
    private _devolutionDate: Date;
    private _valueRental: number;

    constructor(customer: Customer, vehicle: Vehicle, rentalDate: Date, devolutionDate: Date) {
        this._id = uuid();
        this._customer = customer;
        this._vehicle = vehicle;
        this._rentalDate = rentalDate;
        this._devolutionDate = devolutionDate;
        this._valueRental = 0;
    }

    get id(): string {
        return this._id;
    }

    get customer(): Customer {
        return this._customer;
    }

    get vehicle(): Vehicle {
        return this._vehicle;
    }

    get rentalDate(): Date {
        return this._rentalDate;
    }

    get devolutionDate(): Date {
        return this._devolutionDate;
    }

    get valueRental(): number {
        return this._valueRental;
    }

    set id(id: string) {
        this._id = id;
    }

    set customer(customer: Customer) {
        this._customer = customer;
    }

    set vehicle(vehicle: Vehicle) {
        this._vehicle = vehicle;
    }

    set rentalDate(rentalDate: Date) {
        this._rentalDate = rentalDate;
    }

    set devolutionDate(devolutionDate: Date) {
        this._devolutionDate = devolutionDate;
    }

    set valueRental(valueRental: number) {
        this._valueRental = valueRental;
    }
}
