import { Router } from 'express';

import PostController from '../../controllers/PostController.js';

const postsRouter = new Router();

postsRouter.get('/posts', PostController.index);
postsRouter.post('/posts', PostController.store);

export default postsRouter;