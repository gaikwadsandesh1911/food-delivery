import { FoodModel } from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res, next) => {
  // console.log('file',req.file)

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
    const newFood = await food.save();

    return res.status(201).json({
      success: true,
      message: "Food added successfully.",
      newFood,
    });
  } catch (error) {
    fs.unlinkSync(`uploads\\${image_filename}`, () => {
      // console.log('image deleted');
    });
    return res.status(400).json({
      success: false,
      message: "Error",
      error: error,
    });
  }
};

const foodList = async (req, res, next) => {
  try {
    const allFoods = await FoodModel.find({});

    if(allFoods.length < 1){
        return res.status(404).json({
            message: "Food List is empty. Add some Food."
        });
    }

    return res.status(200).json({
      success: true,
      allFoods,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error",
      error: error,
    });
  }
};

const removeFood = async (req, res, next) => {
  try {
    const food = await FoodModel.findById({_id: req.body._id});
    console.log('food', food);

    if(!food){
        return res.status(404).json({
            success: 'false',
            message: "food not found"
        })
    }

    const food_name = food.name;

    fs.unlinkSync(`uploads/${food.image}`, ()=>{});

    await FoodModel.findByIdAndDelete({_id: req.body._id});
    return res.status(200).json({
        success: true,
        message: `${food.name} removed successfully.`
    })

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error",
      error: error,
    });
  }
};

export { addFood, foodList, removeFood };
