import { Router } from 'express';
import postsRouter from './posts.js';

import authMiddleware from '../../middlewares/auth.js';

import AuthController from '../../controllers/AuthController.js';

const routes = new Router();

// Middlewares
routes.use('/api', authMiddleware);

// User Routes
routes.post('/register', AuthController.create);
routes.post('/login', AuthController.store);

// Posts Routes
routes.use('/api', postsRouter);

export default routes;