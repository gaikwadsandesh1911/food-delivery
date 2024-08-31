import { User } from "../models/userModel.js";
import { asyncErrorHandler } from "../utils/asynchErrorHandller.js";
import { CustomError } from "../utils/CustomeError.js";

//add items to user cart
const addTocart = asyncErrorHandler(async(req, res, next)=>{
    // console.log('req.body', req.body)

    const {itemId, userId} = req.body;
    /* 
        frontEnd => FoodDisplay.jsx renders FoodCard.jsx
        FoodCard.jsx have addToCart(itemId) which is defined in StoreContext.jsx
        from StoreContex.jsx addToCart(itemId) methods on api calls we sends => itemId in req.body;
    */

    /*  
        userId is from authaMiddleware.js where on req.body object we added userId property,
        so => req.body.userId
    */

    let userData = await User.findOne({_id: userId}).select("cartData email");
    let cartData = userData?.cartData;

    // cartData.[66b3672699e18dddde48c983] = quantity => if itemId is not already,  then first time we set quantity to 1
    if(!cartData[itemId]){
        cartData[itemId] = 1;
    }
    // if itemId is already in cartData[66b3672699e18dddde48c983] then we increse the quantity by 1
    else{
        cartData[itemId] += 1;
    }

    await User.findByIdAndUpdate(userId, {cartData: cartData}, {new: true});
    // req.body.userId => is from jwt middleware
    return res.status(200).json({
        status: 'success',
        message: "added to cart successfully",
        cartData,
    });
});

// ---------------------------------------------------------------------------------------------

const removeFromCart = asyncErrorHandler(async(req, res, next)=>{

    const {itemId, userId} = req.body;
    /*  frontEnd => FoodDisplay.jsx renders FoodCard.jsx 
        FoodCard.jsx have removeFromCart(itemId) which is defined in StoreContext.jsx
        from StoreContex.jsx removeFromCart(itemId) methods on api calls sends => itemId in req.body
    */

    /*  
        userId is from authaMiddleware.js where on req.body object we added userId property,
        so => req.body.userId
    */
    let userData = await User.findById(userId).select("cartData email");
    // console.log('userData', userData)

    let cartData = userData?.cartData;

    // cartData[itemId] : quantity
    if(cartData[itemId] > 0){
        cartData[itemId] -= 1;
    }

    if(cartData[itemId] === 0){
        delete cartData[itemId];
    }

    await User.findByIdAndUpdate(req.body.userId, {cartData: cartData}, {new: true});

    return res.status(200).json({
        status: 'success',
        message: "removed from cart successfully",
        cartData
    });

});

// ---------------------------------------------------------------------------------------------

const getCartDetails = asyncErrorHandler(async(req, res, next)=>{

    const {userId} = req.body; 
    let userData = await User.findById(userId).select("cartData email");
    let cartData = userData?.cartData
    
    return res.status(200).json({
        status: 'success',
        cartData,
    });
});

// ---------------------------------------------------------------------------------------------

export { addTocart, removeFromCart, getCartDetails }

