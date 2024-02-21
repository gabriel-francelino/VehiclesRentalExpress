import { Router } from 'express'
import { customerRoutes } from './Customer'
import { rentalRoutes } from './Rental'
import { vehicleRoutes } from './Vehicle'

const routes = Router()

routes.use(customerRoutes)
routes.use(rentalRoutes)
routes.use(vehicleRoutes)

export { routes }
