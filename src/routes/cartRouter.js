import { Router } from "express";
import { postItemOnCart, getCart } from "../controllers/cartController.js";
import validSchema from "../middlewares/validSchema.js";
import cartSchema from "../schemas/cartSchema.js";
import validateToken from "../middlewares/validaTokenMiddleware.js";

const cartRouter = Router();
cartRouter.post(
  "/cart",
  validSchema(cartSchema),
  validateToken,
  postItemOnCart
);
cartRouter.get("/cart", validateToken, getCart);
export default cartRouter;
