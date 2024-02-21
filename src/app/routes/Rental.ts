// import { Router } from 'express'
// import { rentalController } from '@/app/controller/RentalController'
// import { infoRequestMiddleware } from './/middlewares/InfoRequestMiddleware'
// import { errorHandlerMiddleware } from './middlewares/ErrorHandlerMiddleware'
// import { validateRentalData } from './middlewares/ValidationRequestDataMiddleware'

// const rentalRoutes = Router()

// rentalRoutes.use(infoRequestMiddleware.execute)

// rentalRoutes.post('/rents', validateRentalData, rentalController.create)
// rentalRoutes.get('/rents/:id/invoice', rentalController.generateInvoice)
// rentalRoutes.get('/rents/active', rentalController.getAllActive)
// rentalRoutes.get('/rents', rentalController.getAll)
// rentalRoutes.delete('/rents/:id', rentalController.return)

// rentalRoutes.use(errorHandlerMiddleware.execute)

// export { rentalRoutes }
