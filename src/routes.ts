import { Router } from "express";
import { vehicleController } from "./controller/VehicleController";

const routes = Router();

routes.post('/vehicles',vehicleController.create);
routes.get('/vehicles',vehicleController.getAll);
routes.get('/vehicles/:id',vehicleController.getById);
routes.put('/vehicles/:id',() => {});
routes.delete('/vehicles/:id',vehicleController.delete);

routes.post('/custumer',() => {});
routes.get('/custumer',() => {});
routes.get('/custumer/:id',() => {});
routes.put('/custumer/:id',() => {});
routes.delete('/custumer/:id',() => {});

export { routes };