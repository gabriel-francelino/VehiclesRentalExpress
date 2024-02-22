import { Router } from 'express'
import { rentalController } from '@/app/controller/RentalController'
import { infoRequestMiddleware } from './/middlewares/InfoRequestMiddleware'
import { errorHandlerMiddleware } from './middlewares/ErrorHandlerMiddleware'

const rentalRoutes = Router()

rentalRoutes.use(infoRequestMiddleware.execute)

rentalRoutes.post('/rents', rentalController.create)
rentalRoutes.get('/rents/:id/invoice', rentalController.generateInvoice)
rentalRoutes.get('/rents/customer/:id', rentalController.getAllByCustomer)
rentalRoutes.get('/rents', rentalController.getAll)
rentalRoutes.delete('/rents/:id', rentalController.devolution)

rentalRoutes.use(errorHandlerMiddleware.execute)

export { rentalRoutes }
