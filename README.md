# Vehicles Rental API With ExpressJS

## Description

This is a simple API for a vehicles rental service. It allows you to create, read, update and delete vehicles and users. It also allows you to rent a vehicle and return it.

## Installation and Usage

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm start` to start the server

## API Endpoints

### Vehicles

- `GET /vehicles` - Get all vehicles
- `GET /vehicles/available` - Get all available vehicles
- `GET /vehicles/:id` - Get a vehicle by id
- `POST /vehicles` - Create a new vehicle
    ```json
    {
        "model": "Fiat Uno",
        "color": "Branco",
        "type": "car",
        "plate": "ABC-1235",
        "dailyRental": 100,
    }
    ```
- `PUT /vehicles` - Update a vehicle
    ```json
    {
        "id": "d10acca1-8814-4c32-b9dc-a65ab499de46",
        "model": "Fiat Uno",
        "color": "Vermelho",
        "type": "car",
        "plate": "ABC-1235",
        "dailyRental": 60,
    }
    ```
- `DELETE /vehicles/:id` - Delete a vehicle by id

### Customers

- `GET /customers` - Get all customers
- `GET /customers/:id` - Get a customer by id
- `GET /customers?cpf=12345678901` - Get a customer by cpf
- `POST /customers` - Create a new customer
    ```json
    {
        "cpf": "12345678901",
        "name": "Gabriel Francelino",
        "dateOfBirth": "2001-01-01T00:00:00.000Z",
        "driverLicense": "B"
    }
    ```
- `PUT /customers` - Update a customer
    ```json
    {
        "id": "d10acca1-8814-4c32-b9dc-a65ab499de46",
        "cpf": "12345678901",
        "name": "Gabriel Francelino",
        "dateOfBirth": "2001-01-01T00:00:00.000Z",
        "driverLicense": "B"
    }
    ```
- `DELETE /customers/:id` - Delete a customer by id

### Rentals

- `GET /rents` - Get all rents
- `GET /rents/active` - Get all active rents
- `GET /rents/:id/invoice` - Get a rental invoice by id
- `POST /rents` - Create a new rental
    ```json
    {
    "customerCpf": "15948726301",
    "vehiclePlate": "ABC-1234",
    "rentalDate": "2024-01-01T00:00:00.000Z",
    "devolutionDate": "2024-01-08T00:00:00.000Z"
    }
    ```
- `DELETE /rents/:id` - Delete a rental by id