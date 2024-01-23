import { Router } from "express";
import { vehicleController } from "./controller/VehicleController";
import { customerController } from "./controller/CustomerController";
import { infoRequestMiddleware } from "./middlewares/InfoRequestMiddleware";
import { errorHandlerMiddleware } from "./middlewares/ErrorHandlerMiddleware";
import { rentalController } from "./controller/RentalController";

const routes = Router();

routes.use(infoRequestMiddleware.execute);

routes.post('/vehicles', vehicleController.create);
routes.get('/vehicles/available', vehicleController.getAvailable);
routes.get('/vehicles', vehicleController.getAll);
routes.get('/vehicles/:id', vehicleController.getById);
routes.put('/vehicles', vehicleController.update);
routes.delete('/vehicles/:id', vehicleController.delete); // trocar para deletar por placa

routes.post('/customers', customerController.create);
routes.get('/customers', customerController.getAll);
routes.get('/customers/id/:id', customerController.getById);
routes.get('/customers/cpf/:cpf', customerController.getByCpf);
routes.put('/customers/',customerController.update);
routes.delete('/customers/:id', customerController.delete); // trocar para deletar por cpf

routes.post('/rents', rentalController.create);
routes.get('/rents', rentalController.getAll);
routes.delete('/rents/:id', rentalController.return);

routes.use(errorHandlerMiddleware.execute);

export { routes };