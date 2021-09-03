import { Router } from 'express';

import postsRouter from './posts.js';
import AuthController from '../../controllers/AuthController.js';

const routes = new Router();

// Middlewares

// User
routes.post('/register', AuthController.store);

// Posts
routes.use('/api', postsRouter);

export default routes;