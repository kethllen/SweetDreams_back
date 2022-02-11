import { Router } from 'express';
import { postItemOnCart } from '../controllers/cartController.js';
import validSchema from '../middlewares/validSchema.js';
import cartSchema from '../schemas/cartSchema.js';
import validaTokenMiddleware from '../middlewares/validaTokenMiddleware.js';

const cartRouter = Router();
// cartRouter.post("/cart", validSchema(cartSchema), validaTokenMiddleware, postItemOnCart);
cartRouter.post("/cart", validSchema(cartSchema), postItemOnCart);

export default cartRouter;