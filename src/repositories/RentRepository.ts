import { Rent } from "../models/rent";

class RentRepository {
    private rent: Rent[] = [];
}

const rentRepository = new RentRepository();

export { rentRepository };