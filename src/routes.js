import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.get('/', (req, res) => {
  res.json({
    status: 'ok',
  });
});

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

export default routes;
