import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js';
import { placeOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/place-order", authMiddleware, placeOrder);

export default orderRouter