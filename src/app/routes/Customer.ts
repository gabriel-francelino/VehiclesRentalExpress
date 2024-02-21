import { Router } from 'express'
import { customerController } from '@/app/controller/CustomerController'
import { infoRequestMiddleware } from './/middlewares/InfoRequestMiddleware'
import { errorHandlerMiddleware } from './middlewares/ErrorHandlerMiddleware'
import { validateCustomerData } from './middlewares/ValidationRequestDataMiddleware'

const customerRoutes = Router()

customerRoutes.use(infoRequestMiddleware.execute)

customerRoutes.post(
  '/customers',
  validateCustomerData,
  customerController.create,
)
customerRoutes.get('/customers/:id', customerController.getById)
customerRoutes.get('/customers', customerController.getAll)
// customerRoutes.get('/customers', customerController.getByCpf);
customerRoutes.patch(
  '/customers/',
  validateCustomerData,
  customerController.update,
)
customerRoutes.delete('/customers/:id', customerController.delete)

customerRoutes.use(errorHandlerMiddleware.execute)

export { customerRoutes }
