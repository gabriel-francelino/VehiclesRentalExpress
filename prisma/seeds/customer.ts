import { Customer, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function customerSeed() {
  const customers: Customer[] = [
    {
      id: '1',
      cpf: '123.456.789-00',
      name: 'João da Silva',
      email: 'joao.silva@example.com',
      dateOfBirth: new Date('1990-05-15T00:00:00.000Z'),
      driverLicense: 'A',
      hasRent: false,
      updatedAt: null,
      createdAt: new Date('2024-02-24T00:00:00.000Z'),
    },
    {
      id: '2',
      cpf: '987.654.321-00',
      name: 'Maria Souza',
      email: 'maria.souza@example.com',
      dateOfBirth: new Date('1990-05-15T00:00:00.000Z'),
      driverLicense: 'AB',
      hasRent: true,
      updatedAt: null,
      createdAt: new Date('2024-02-24T00:00:00.000Z'),
    },
  ]

  for await (const customer of customers) {
    await prisma.customer.upsert({
      where: {
        id: customer.id,
      },
      update: customer,
      create: customer,
    })
  }
}
