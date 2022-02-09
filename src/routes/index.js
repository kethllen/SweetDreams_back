import { Router } from 'express';
import authRouter from './authRouter.js';
import dataRouter from './dataRouter.js';

const router = Router();
router.use(authRouter);
router.use(dataRouter);

export default router;