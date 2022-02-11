import { Router } from "express";
import authRouter from "./authRouter.js";
import cartRouter from "./cartRouter.js";
import productsRouter from "./productsRouter.js";

const router = Router();
router.use(authRouter);
router.use(productsRouter);
router.use(cartRouter);

export default router;
