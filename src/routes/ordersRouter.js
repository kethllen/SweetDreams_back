import { Router } from 'express';
import { postOrder } from '../controllers/ordersController.js';
import validaTokenMiddleware from '../middlewares/validaTokenMiddleware.js';
import validSchema from '../middlewares/validSchema.js';
import ordersSchema from '../schemas/ordersSchema.js';

const ordersRouter = Router();
ordersRouter.post('/orders', validSchema(ordersSchema), validaTokenMiddleware, postOrder);

export default ordersRouter;