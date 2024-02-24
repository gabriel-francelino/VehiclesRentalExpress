import { PrismaClient } from '@prisma/client'
import { vehicleSeed, customerSeed } from './seeds'
const prisma = new PrismaClient()

async function main() {
  await vehicleSeed()
  await customerSeed()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
