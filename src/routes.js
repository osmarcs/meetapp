import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  res.json({
    status: 'ok',
  });
});

export default routes;
