import { Router } from "express";
import {
  postItemOnCart,
  getCart,
  deleteCollection,
  updatedCart,
} from "../controllers/cartController.js";
import validSchema from "../middlewares/validSchema.js";
import cartSchema from "../schemas/cartSchema.js";
import validaTokenMiddleware from "../middlewares/validaTokenMiddleware.js";

const cartRouter = Router();
cartRouter.post(
  "/cart",
  validSchema(cartSchema),
  validaTokenMiddleware,
  postItemOnCart
);
cartRouter.get("/cart", validaTokenMiddleware, getCart);
cartRouter.update("/cart", validaTokenMiddleware, updatedCart);
cartRouter.post("/del", deleteCollection);
export default cartRouter;
