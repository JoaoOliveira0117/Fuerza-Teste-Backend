import { Router } from 'express';

import PostController from '../../controllers/PostController.js';

import validateIdMiddleware from '../../middlewares/validateId.js';

const postsRouter = new Router();

// Middlewares

/* Validate uuid */
postsRouter.use('/posts/:id', validateIdMiddleware);

// Posts Routes
postsRouter.get('/posts', PostController.index);
postsRouter.get('/posts/:id', PostController.get);

postsRouter.post('/posts', PostController.store);

postsRouter.put('/posts/:id', PostController.update);

postsRouter.delete('/posts/:id', PostController.delete);

export default postsRouter;