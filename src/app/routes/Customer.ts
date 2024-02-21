import { Router } from 'express'
import { customerController } from '../../app/controller/CustomerController'
import { infoRequestMiddleware } from './/middlewares/InfoRequestMiddleware'
import { errorHandlerMiddleware } from './middlewares/ErrorHandlerMiddleware'

const customerRoutes = Router()

customerRoutes.use(infoRequestMiddleware.execute)

customerRoutes.post('/customers', customerController.create)
customerRoutes.get('/customers/:id', customerController.getById)
customerRoutes.get('/customers', customerController.getAll)
customerRoutes.get('/customers', customerController.getByCpf)
customerRoutes.put('/customers/:id', customerController.update)

customerRoutes.use(errorHandlerMiddleware.execute)

export { customerRoutes }
