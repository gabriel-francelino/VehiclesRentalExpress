import { PrismaClient } from '@prisma/client'
import { vehicleSeed, customerSeed } from './seeds'
import { env } from 'src/env'
const prisma = new PrismaClient()

async function main() {
  if (env.NODE_ENV !== 'production') {
    await vehicleSeed()
    await customerSeed()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
