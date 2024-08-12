import express from 'express';
import { addTocart, getCartDetails, removeFromCart } from '../controllers/cartController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const cartRouter = express.Router();

cartRouter.post('/add-to-cart', authMiddleware,  addTocart)
cartRouter.post('/remove-from-cart', authMiddleware, removeFromCart)
cartRouter.get('/cart-details', authMiddleware, getCartDetails)

export default cartRouter;