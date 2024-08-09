import { UserModel } from "../models/userModel.js";
import { asyncErrorHandler } from "../utils/asynchErrorHandller.js";

//add items to user cart
const addTocart = asyncErrorHandler(async(req, res, next)=>{

    let userData = await UserModel.findOne({_id: req.body.userId}).select("cartData email");
    
    let cartData = userData?.cartData;

    // if itemId is not already in cartData = { itemId: quantity } then first time we set quantity to 1
    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId] = 1;
    }
    // if itemId is already in cartData = { itemId: quantity } then we increse the quantity by 1
    else{
        cartData[req.body.itemId] += 1;
    }

    await UserModel.findByIdAndUpdate(req.body.userId, {cartData});

    return res.status(200).json({
        status: 'success',
        message: "added to cart successfully",
        cartData,
    })
});

// ---------------------------------------------------------------------------------------------

const removeFromCart = asyncErrorHandler(async(req, res, next)=>{

});

// ---------------------------------------------------------------------------------------------

const getCartDetails = asyncErrorHandler(async(req, res, next)=>{

});

// ---------------------------------------------------------------------------------------------

export { addTocart, removeFromCart, getCartDetails }

