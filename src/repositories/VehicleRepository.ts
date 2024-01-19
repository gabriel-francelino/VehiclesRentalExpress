import { Vehicle } from "../models/vehicle";

class VehicleRepository {
    private vehicleDatabase: Vehicle[] = [
        new Vehicle("Gol", "Preto", "9BWZZZ377VT004251", "CAR", "ABC-123", 200),
        new Vehicle("Uno", "Branco", "ZFA312000J0115977", "CAR", "DEF-456", 300),
        new Vehicle("Fiesta", "Vermelho", "WF0EXXGBBEFS12345", "CAR", "GHI-789", 400),
        new Vehicle("Celta", "Azul", "9BGRD68X07G123456", "CAR", "JKL-012", 250),
        new Vehicle("Onix", "Prata", "KL1TG48EJEB123456", "CAR", "MNO-345", 350),
        new Vehicle("HB20", "Amarelo", "94BTE48AHAZ123456", "CAR", "PQR-678", 280),
        new Vehicle("Palio", "Verde", "8AP172000H1523523", "CAR", "STU-901", 320),
        new Vehicle("Corsa", "Rosa", "93UZXW456YKL23456", "CAR", "VWX-234", 270),
        new Vehicle("Fusca", "Laranja", "3VWRF31Y76M123456", "CAR", "YZA-567", 380),
        new Vehicle("Fit", "Roxo", "MRHGD18504P123456", "CAR", "BCD-890", 310),
        new Vehicle("CG 125", "Azul", "MOTO-111", "MOTORCYCLE", "EFG-111", 150),
        new Vehicle("Titan 150", "Preto", "MOTO-222", "MOTORCYCLE", "HIJ-222", 180),
        new Vehicle("CB 300", "Vermelho", "MOTO-333", "MOTORCYCLE", "KLM-333", 200),
        new Vehicle("Falcon 400", "Amarelo", "MOTO-444", "MOTORCYCLE", "NOP-444", 220),
        new Vehicle("Ninja 650", "Verde", "MOTO-555", "MOTORCYCLE", "QRS-555", 250)
    ];

}

const vehicleRepository = new VehicleRepository();

export { vehicleRepository };