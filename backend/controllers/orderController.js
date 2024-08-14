import { OrderModel } from "../models/orderModel.js";
import { UserModel } from "../models/userModel.js";
import Stripe from 'stripe'
import { asyncErrorHandler } from "../utils/asynchErrorHandller.js";


const placeOrder = asyncErrorHandler(async(req, res, next)=>{
    const {userId} = req.body;      // from authMiddleware
    const {items, amount, address} = req.body
    const frontEnd_url = 'http://localhost:5173';

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const newOrder = new OrderModel({
        userId,
        address,
        items ,
        amount,
    })

    await newOrder.save();

    //  once the order placed we have to clear cartData
    await UserModel.findByIdAndUpdate(userId, {cartData: {}}, {new: true})

    // payment link using stripe
    const line_items = items.map((item)=>({
        price_data: {
            currency: 'inr',
            product_data: {
                name: item.name
            },
            unit_amount: item.price * 100 * 80      // if 100 is not multiplied shows less amount erro, 80 => converted usd into inr
        },
        quantity: item.quantity, 
    }))

    // to add delivery charges in line_items
    line_items.push({
        price_data: {
            currency: "inr",
            product_data: {
                name: "Delivery Charges"
            },
            unit_amount: 2 * 100 * 80      // delivery fees
        },
        quantity: 1
    })

    // payment link using stripe
    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        success_url: `${frontEnd_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontEnd_url}/verify?success=false&orderId=${newOrder._id}`,
    })
    // console.log('session', session);

    return res.status(200).json({
        status: 'success',
        message: "order placed successfully.",
        session_url: session.url
    })
});

export { placeOrder };


/* 
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Product Name',
            },
            unit_amount: 20
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://your-domain.com/success',
      cancel_url: 'https://your-domain.com/cancel',
    });
*/