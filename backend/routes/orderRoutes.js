import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js';
import { placeOrder, userOrders, verifyOrder, allOrders, updateOrderStatus } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/place-order", authMiddleware, placeOrder);
orderRouter.post('/verify-order', verifyOrder);
orderRouter.post('/user-orders', authMiddleware, userOrders);
orderRouter.get('/all-orders', allOrders);
orderRouter.patch('/order-status', updateOrderStatus)
export default orderRouter