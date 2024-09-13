import express from "express";
import { upload } from "../middlewares/fileUploadMiddleware.js";
import { addFood, foodList, singleFood, removeFood, updateFood } from "../controllers/foodController.js";

const foodRouter = express.Router();

foodRouter.post('/add-food', upload.single("image"), addFood);
foodRouter.get("/food-list", foodList);
foodRouter.get('/single-food/:id', singleFood)
foodRouter.delete('/remove-food/:id', removeFood);
foodRouter.put('/update-food/:id', upload.single('image'), updateFood);

export default foodRouter;