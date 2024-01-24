import { DriverLicense } from "../models/Customer";

export interface CustomerDTO {
    id?: string;
    cpf: string;
    name: string;
    dateOfBirth: Date;
    driverLicense: DriverLicense;
}