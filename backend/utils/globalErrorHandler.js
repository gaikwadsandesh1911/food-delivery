
import fs from 'fs';
import { CustomError } from './CustomeError.js';

// ---------------------------------------------------------------------------------------------------------------------------

//  development error
const devErrors = (res, error)=>{
    return res.status(error.statusCode).json({
        message: error.message,
        stackTrace: error.stack,
        error: error
    })
}

// ---------------------------------------------------------------------------------------------------------------------------

const duplicateKeyErrorHandler = (error)=>{
    // console.log("dupError", error)
    return new CustomError(`This '${error.keyValue.name}' value is already taken`, 400);
}

// ---------------------------------------------------------------------------------------------------------------------------

const mongooseValidationErrorHandler = (error)=>{
    
    const errors = Object.values(error.errors).map((val)=>val.message)
    const errorMessages = errors.join(", ")
    return new CustomError(errorMessages, 400);
}
// ---------------------------------------------------------------------------------------------------------------------------


// production error
const prodErrors = (res, error)=>{

    // console.log('prodError', error);
    
    /* on CustomError class, added isOperational = true. so error send through
    new CustomError() will have isOperational property */
    if(error.isOperational){   
        return res.status(error.statusCode).json({
            status: 'failed',
            message: error.message
        });
    }
    // some errors are send by mongoose. where isOperational = false, so, here we send generic error message in production.
    // we also handle some mongoose validation errors above
    else{       
        return res.status(error.statusCode).json({
            status: 'error',
            message: 'Something went wrong'
        })
    }
}
// -------------------------------------------------------------------------------------------------------------------------------

// global error handler.
/* 
    if next() function has argument, then it is treated as error. 
    and that error is captured by globalErrorHandler function with first parameter as an err
*/

export const globalErrorHandler = (err, req, res, next)=>{
    // console.error('globalErr', err);

    if(req.file){
        fs.unlinkSync(req.file.path, ()=>{})
    }

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error"
    err.status = err.status || "failed"

    console.log('node env', process.env.NODE_ENV);

    if(process.env.NODE_ENV === "development"){
        devErrors(res, err);
    }
    
    else if(process.env.NODE_ENV === "production"){

        if(err.code == 11000){
            err = duplicateKeyErrorHandler(err)        
            // the returned result of duplicateKeyErrorHandler() is stored in err variable and sent to prodErrors() function
        }

        if(err.name == "ValidationError")
            err = mongooseValidationErrorHandler(err)

        prodErrors(res, err);
    }


    // return res.status(err.statusCode).json({
    //     message: err.message
    // })
}