# Vehicles Rental API With ExpressJS

## Description

This is a simple API for a vehicles rental service. It allows you to create, read, update and delete vehicles and users. It also allows you to rent a vehicle and return it.

## Installation and Usage

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `docker compose up -d` to create database
4. Run `npm run migrate dev` to create the tables
5. Run `npm start` to start the server

## API Endpoints

### Vehicles

- `GET /vehicles` - Get all vehicles
- `GET /vehicles/available` - Get all available vehicles
- `GET /vehicles/:id` - Get a vehicle by id
- `DELETE /vehicles/:id` - Delete a vehicle by id
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
- `PUT /vehicles/:id` - Update a vehicle
    ```json
    {
        "model": "Fiat Uno",
        "color": "Vermelho",
        "type": "car",
        "plate": "ABC-1235",
        "dailyRental": 60,
    }
    ```

### Customers

- `GET /customers` - Get all customers
- `GET /customers/:id` - Get a customer by id
- `DELETE /customers/:id` - Delete a customer by id
- `POST /customers` - Create a new customer
    ```json
    {
        "cpf": "12345678901",
        "name": "Gabriel Francelino",
        "email": "gabriel2@gmail.com",
        "dateOfBirth": "2001-01-01T00:00:00.000Z",
        "driverLicense": "B"
    }
    ```
- `PUT /customers/:id` - Update a customer
    ```json
    {
        "cpf": "12345678901",
        "name": "Gabriel Silva",
        "email": "gabriel@gmail.com",
        "dateOfBirth": "2001-01-01T00:00:00.000Z",
        "driverLicense": "B"
    }
    ```

### Rentals

- `GET /rents` - Get all rents
- `GET /rents/active` - Get all active rents
- `GET /rents/:id/invoice` - Get a rental invoice by id
- `DELETE /rents/:id` - Returns a rental by id
- `POST /rents` - Create a new rental
    ```json
    {
        "customerId": "6a9df101-24d7-4f0a-b17d-8cfd56af47ff",
        "vehicleId":"b78a5dd4-fec4-4ee4-8d9f-4e5abc33fb1c",
        "rentalDate": "2024-01-01T00:00:00.000Z",
        "devolutionDate": "2024-01-08T00:00:00.000Z"
    }
    ```

## Team
<div style="display: flex; gap: 8px;">
    <a href="https://github.com/gabriel-francelino" target="_blank"><img src="https://img.shields.io/static/v1?label=Github&message=Gabriel Francelino&color=f8efd4&style=for-the-badge&logo=GitHub"></a>
    <a href="https://github.com/WagnerNasc" target="_blank"><img src="https://img.shields.io/static/v1?label=Github&message=Wagner Nascimento&color=f8efd4&style=for-the-badge&logo=GitHub"></a>
</div>