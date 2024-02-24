import { Vehicle, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function vehicleSeed() {
  const vehicles: Vehicle[] = [
    {
      id: '1',
      model: 'Toyota Corolla',
      color: 'Blue',
      type: 'CAR',
      plate: 'ABC1234',
      dailyRental: 50.0,
      isRented: false,
      increasePorcentage: 0.1,
      updatedAt: null,
      createdAt: new Date('2024-02-24T00:00:00.000Z'),
    },
    {
      id: '2',
      model: 'Sahara',
      color: 'Red',
      type: 'MOTORCYCLE',
      plate: 'XYZ5678',
      dailyRental: 55.0,
      isRented: true,
      increasePorcentage: 0.15,
      updatedAt: null,
      createdAt: new Date('2024-02-24T00:00:00.000Z'),
    },
  ]

  for await (const vehicle of vehicles) {
    await prisma.vehicle.upsert({
      where: {
        id: vehicle.id,
      },
      update: vehicle,
      create: vehicle,
    })
  }
}
