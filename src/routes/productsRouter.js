import { Router } from "express";
import { getProducts } from "../controllers/productsController.js";
import validSchema from "../middlewares/validSchema.js";

const productsRouter = Router();
productsRouter.get("/products", getProducts);

export default productsRouter;
