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
        "model": "Fiat",
        "color": "Branco",
        "type": "Uno",
        "plate": "ABC-1234",
        "dailyRental": 100,
        "increasePorcentage": 0.1
    }
    ```
- `PUT /vehicles` - Update a vehicle
    ```json
    {
        "id": "d10acca1-8814-4c32-b9dc-a65ab499de46",
        "model": "Fiat",
        "color": "Uno",
        "type": "Vermelha",
        "plate": "ABC-1234",
        "dailyRental": 60,
        "rented": false,
        "increasePorcentage": 0.1
    }
    ```
- `DELETE /vehicles/:id` - Delete a vehicle by id

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get a user by id
- `GET /users/:cpf` - Get a user by cpf
- `POST /users` - Create a new user
    ```json
    {
        "cpf": "12345678901",
        "name": "Gabriel Francelino",
        "dateOfBirth": "2001-01-01T00:00:00.000Z",
        "driverLicense": "B"
    }
    ```
- `PUT /users` - Update a user
- `DELETE /users/:id` - Delete a user by id

### Rentals

- `GET /rents` - Get all rents
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