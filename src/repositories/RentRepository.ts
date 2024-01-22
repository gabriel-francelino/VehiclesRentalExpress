import { Rent } from "../models/Rent";

class RentRepository {
    private rent: Rent[] = [];
}

const rentRepository = new RentRepository();

export { rentRepository };