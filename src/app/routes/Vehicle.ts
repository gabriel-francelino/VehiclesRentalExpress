import { Router } from 'express'
import { vehicleController } from '../../app/controller/VehicleController'
import { infoRequestMiddleware } from './/middlewares/InfoRequestMiddleware'
import { errorHandlerMiddleware } from './middlewares/ErrorHandlerMiddleware'

const vehicleRoutes = Router()

vehicleRoutes.use(infoRequestMiddleware.execute)

vehicleRoutes.post('/vehicles', vehicleController.create)
vehicleRoutes.get('/vehicles/:id', vehicleController.getById)
vehicleRoutes.get('/vehicles', vehicleController.getAll)
vehicleRoutes.put('/vehicles/:id', vehicleController.update)
// vehicleRoutes.get('/vehicles/available', vehicleController.getAvailable)
// vehicleRoutes.delete('/vehicles/:id', vehicleController.delete)

vehicleRoutes.use(errorHandlerMiddleware.execute)

export { vehicleRoutes }
