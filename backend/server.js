import express from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv'
import foodRouter from "./routes/foodRoutes.js";
import { globalErrorHandler } from "./utils/globalErrorHandler.js";
import { CustomError } from "./utils/CustomeError.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/images', express.static('uploads'));

const port = process.env.PORT || 800;

app.use('/api/food', foodRouter);


// if route not matches
app.all('*', (req, res, next)=>{

    /* return res.status(404).json({
        message: `can't find '${req.originalUrl}' on the server.`
    }); */

    /* const err = new Error(`can't find '${req.originalUrl}' on the server.`);        // in-built js Error object.
    err.statusCode = 404;
    return next(err); */

    const err = new CustomError(`can't find '${req.originalUrl}' on the server.`, 404)
    return next(err);
});

// global error handling middleware
app.use(globalErrorHandler);

app.listen(port, ()=>{
    connectDB();
    console.log(`Server is running on http://localhost:${port}`);
})
