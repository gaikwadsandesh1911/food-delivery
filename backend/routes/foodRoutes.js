import express from "express";
import multer from 'multer';
import { addFood, foodList, removeFood } from "../controllers/foodController.js";

const foodRouter = express.Router();


// image Storage
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb)=>{
        // console.log('file', file)
        if(file.mimetype.startsWith('image/')){
            return cb(null, `${Date.now()}-${file.originalname}`);
        }
        else{
            cb(new Error("Only image file is allowed"));
        }
    }
});
const upload = multer({storage: storage});

foodRouter.post('/add-food', upload.single("image"), addFood);
foodRouter.get("/food-list", foodList);
foodRouter.post('/remove-food', removeFood)

export default foodRouter;