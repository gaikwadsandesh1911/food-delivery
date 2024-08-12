import jwt from "jsonwebtoken";
import { CustomError } from "../utils/CustomeError.js";
import { asyncErrorHandler } from "../utils/asynchErrorHandller.js";

const authMiddleware = asyncErrorHandler(async (req, res, next) => {

    let token;

    token = req.headers.token;

    if (!token) {
        const error = new CustomError("Unauthorized, Please LogIn!", 401);
        return next(error);
    }

    if(token && token.startsWith("Bearer")){
        token = token.split(" ")[1];
    }

  const decoded_token = await jwt.verify(token, process.env.JWT_SECRET);
    //  console.log('decoded_token', decoded_token)
     /* 
          at the time of jwt.sign({userId: userId, userEmail: userEmail}) .
          here,  on req.body object we create userId property and assign value of decoded_token.userId to req.body.userId.
          req.body is express.js object
    */
  req.body.userId = decoded_token.userId; 
  
  next();

});

export default authMiddleware;
