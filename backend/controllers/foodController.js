import { FoodModel } from "../models/foodModel.js";
import fs from "fs";
import { asyncErrorHandler } from "../utils/asynchErrorHandller.js";
import { CustomError } from "../utils/CustomeError.js";

/*   const addFood = async (req, res, next) => {
  console.log('file',req.file)

  let image_filename = req.file.filename;

  const { name, description, price, category } = req.body;

  const food = new FoodModel({
    name,
    description,
    price,
    category,
    image: image_filename,
  });

  try {
    let newFood = await food.save();
    return res.status(201).json({
      status: "success",
      message: "Food added successfully.",
      data: {
        food: newFood
      }
    });
  } catch (error) {
    fs.unlinkSync(`uploads\\${image_filename}`, () => {
    });
    return res.status(400).json({
      status: 'failed',
      error
    });
  }
} */


// add new foodItem
const addFood = asyncErrorHandler(async (req, res, next) => {
  let image_filename = req.file.filename;

  const { name, description, price, category } = req.body;

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
    data: {
      food: newFood,
    },
  });
});

// display all foodItems
const foodList = asyncErrorHandler(async (req, res, next) => {
  const allFoods = await FoodModel.find({});

  if (allFoods.length < 1) {
    const err = new CustomError("Food List is empty. Add some Food.", 404);
    return next(err);
  }

  return res.status(200).json({
    status: "success",
    data: {
      foodList: allFoods,
    },
  });
});

// remove specific foodItem
const removeFood = asyncErrorHandler(async (req, res, next) => {
  const food = await FoodModel.findById({ _id: req.body._id });

  if (!food) {
    const err = new CustomError("food not found", 404);
    return next(err);
  }

  const food_name = food.name;

  fs.unlinkSync(`uploads/${food.image}`, () => {});

  await FoodModel.findByIdAndDelete({ _id: req.body._id });
  return res.status(200).json({
    status: "success",
    message: `${food.name} removed successfully.`,
  });
});

export { addFood, foodList, removeFood };  
