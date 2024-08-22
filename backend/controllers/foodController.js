import { FoodModel } from "../models/foodModel.js";
import fs from "fs";
import { asyncErrorHandler } from "../utils/asynchErrorHandller.js";
import { CustomError } from "../utils/CustomeError.js";

// ---------------------------------------------------------------------------------------------------------------
// add new foodItem
const addFood = asyncErrorHandler(async (req, res, next) => {
  // console.log('req.file', req.file);
  const { name, description, price, category } = req.body;
  let image_filename = req.file.filename;

  const food = new FoodModel({
    name,
    description,
    price,
    category,
    image: image_filename,
  });

  let newFood = await food.save();
  return res.status(201).json({
    status: "success",
    message: "Food added successfully.",
    food: newFood,
  });
});

// ---------------------------------------------------------------------------------------------------------------
// display all foodItems
const foodList = asyncErrorHandler(async (req, res, next) => {

  // const allFoods = await FoodModel.find();

  // pagination logic
  const page = parseInt(req.query.page) || 1; // default page is 1 if not specified
  const limit = parseInt(req.query.limit) || 10 // default items per page is 10 
  const skip = (page - 1) * limit;    // mongoose skip(10) will skip first 10 documents
  const allFoods = await FoodModel.find().skip(skip).limit(limit);

  const totalDocuments = await FoodModel.countDocuments();
  const totalPages = Math.ceil(totalDocuments / limit);
  

  // if (allFoods.length < 1) {
  //   const err = new CustomError("Food List is empty. Add some Food.", 404);
  //   return next(err);
  // }

  return res.status(200).json({
    status: "success",
    foodList: allFoods,
    totalPages: totalPages,
    currentPage: page,
    totalDocuments: totalDocuments
  });
});

// ---------------------------------------------------------------------------------------------------------------
// remove specific foodItem
const removeFood = asyncErrorHandler(async (req, res, next) => {
  const food = await FoodModel.findById({ _id: req.body._id });

  if (!food) {
    const err = new CustomError("food not found", 404);
    return next(err);
  }

  // const food_name = food.name;

  await FoodModel.findByIdAndDelete({ _id: req.body._id });

  // remove image from uploads folder
  fs.unlinkSync(`uploads/${food.image}`, () => {});

  return res.status(200).json({
    status: "success",
    message: `${food.name} removed successfully.`,
  });
});

// ---------------------------------------------------------------------------------------------------------------

export { addFood, foodList, removeFood };
