import{UserModel}  from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { asyncErrorHandler } from "../utils/asynchErrorHandller.js";
import { CustomError } from "../utils/CustomeError.js";

// ---------------------------------------------------------------------------------------------------------------------

const generateJwtToken = (id)=> {
    return jwt.sign({userId: id}, process.env.JWT_SECRET);
}

// ---------------------------------------------------------------------------------------------------------------------

const isStrongPassword = (pswd)=>{
    return validator.isStrongPassword(pswd,{
        minLength: 6,
        minUppercase: 1,
        minLowercase: 1,
        minNuminNumbers: 1,
        minSymbol: 1,
    })
}

// ---------------------------------------------------------------------------------------------------------------------

// login user
const registerUser = asyncErrorHandler(async (req, res, next) => {

    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return next(new CustomError("Please provide all fields", 400));
    }

    // if user already exist
    const userExists = await UserModel.findOne({ email });

    if(userExists){
        return next(new CustomError('user with email is already exist', 409));
    }

    // validate email
    if(!validator.isEmail(email)){
        const error = new CustomError('Please enter valid email address', 400);
        return next(error);
    }

    // validate password
    if(!isStrongPassword(password)){ 
        return next(new CustomError('Password should be 6 char long, one uppercase, one number and one symbol', 400));
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
        name,
        email,
        password: hashedPassword
    });

    const user = await newUser.save();
    
    // generate jsonwebtoken
    const token = generateJwtToken(user._id);

    return res.status(201).json({
        status : 'success',
        message: 'user created successfully',
        token
    })
});

//register user
const loginUser = asyncErrorHandler(async (req, res, next)=>{

    const { email, password } = req.body;

    if(!email || !password){
        return next(new CustomError("Please provide all fields", 400))
    }

    // check user
    const user = await UserModel.findOne({email});
    if(!user){
        return next(new CustomError('Invalid email or password', 401));
    }

    // compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return next(new CustomError('Invalid email or password', 401));
    }

    const token = generateJwtToken(user._id)

    return res.status(200).json({
        status: 'success',
        message: 'login successful',
        token
    });

});

export {loginUser, registerUser};


