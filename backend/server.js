import express from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv'
import foodRouter from "./routes/foodRoutes.js";
import { globalErrorHandler } from "./utils/globalErrorHandler.js";
import { CustomError } from "./utils/CustomeError.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/image', express.static('uploads'));      // image url => http://localhost:4000/image/image_Name.jpg

const port = process.env.PORT || 8000;

app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter)


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
