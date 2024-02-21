import { Router } from 'express'
import { vehicleController } from '@/app/controller/VehicleController'
import { infoRequestMiddleware } from './/middlewares/InfoRequestMiddleware'
import { errorHandlerMiddleware } from './middlewares/ErrorHandlerMiddleware'
import { validateVehicleData } from './middlewares/ValidationRequestDataMiddleware'

const vehicleRoutes = Router()

vehicleRoutes.use(infoRequestMiddleware.execute)

vehicleRoutes.post('/vehicles', validateVehicleData, vehicleController.create)
vehicleRoutes.get('/vehicles/available', vehicleController.getAvailable)
vehicleRoutes.get('/vehicles', vehicleController.getAll)
vehicleRoutes.get('/vehicles/:id', vehicleController.getById)
vehicleRoutes.patch('/vehicles', validateVehicleData, vehicleController.update)
vehicleRoutes.delete('/vehicles/:id', vehicleController.delete)

vehicleRoutes.use(errorHandlerMiddleware.execute)

export { vehicleRoutes }
