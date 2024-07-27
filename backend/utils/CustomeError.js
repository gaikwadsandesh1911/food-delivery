export class CustomError extends Error {
    constructor(message, statusCode){
        super(message); // calling constructor of Error().  
        this.statusCode = statusCode
        this.isOperational = true

        // Error.captureStackTrace(this, this.constructor);
    }
}

/* 

on CustomError object, set the property isOperational = true
we send only those error in production. where isOperational = true.. means 
will send error through CustomError()

*/