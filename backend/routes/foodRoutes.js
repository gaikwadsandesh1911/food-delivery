import express from "express";
import { upload } from "../middlewares/fileUploadMiddleware.js";
import { addFood, foodList, removeFood } from "../controllers/foodController.js";

const foodRouter = express.Router();

foodRouter.post('/add-food', upload.single("image"), addFood);
foodRouter.get("/food-list", foodList);
foodRouter.post('/remove-food', removeFood)

export default foodRouter;