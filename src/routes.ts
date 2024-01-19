import { Router } from "express";

const routes = Router();

routes.post('/vehicles',() => {});
routes.get('/vehicles',() => {});
routes.get('/vehicles/:id',() => {});
routes.put('/vehicles/:id',() => {});
routes.delete('/vehicles/:id',() => {});

routes.post('/custumer',() => {});
routes.get('/custumer',() => {});
routes.get('/custumer/:id',() => {});
routes.put('/custumer/:id',() => {});
routes.delete('/custumer/:id',() => {});

export { routes };