import { Food} from "../models/foodModel.js";
import fs from "fs";
import { asyncErrorHandler } from "../utils/asynchErrorHandller.js";
import { CustomError } from "../utils/CustomeError.js";

// ---------------------------------------------------------------------------------------------------------------
// add new foodItem
const addFood = asyncErrorHandler(async (req, res, next) => {
  // console.log('req.file', req.file);
  const { name, description, price, category } = req.body;
  let image_filename = req.file.filename;

  const food = new Food({
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

  let allFoods;

  // allFoods = await FoodModel.find();

  // pagination logic
  const page = parseInt(req.query.page) || 1; // default page is 1 if not specified
  const limit = parseInt(req.query.limit) || 10 // default items per page is 10 
  const skip = (page - 1) * limit;    // mongoose skip(10) will skip first 10 documents

// ----------------------------------------------------------------------------------------------------------------

  const {category, search} = req.query;

  let query = {}

  if(category){
    query.category = category;
  }
  // if(search){
  //   query.name = {$regex: search, $options: 'i'}
  // }

  allFoods = await Food.find(query).skip(skip).limit(limit);

  const totalDocuments = await Food.countDocuments();
  const totalPages = Math.ceil(totalDocuments / limit);
  

  // if (allFoods.length < 1) {
  //   const err = new CustomError("No Items Found", 404);
  //   return next(err);
  // }

  return res.status(200).json({
    status: "success",
    foodList: allFoods,
    totalPages: totalPages,
    currentPage: page,
    totalDocuments: totalDocuments,
    length: allFoods?.length
  });
});

// ---------------------------------------------------------------------------------------------------------------

const singleFood = asyncErrorHandler(async(req, res, next)=>{
  const {id} = req.params;
  const food = await Food.findById({_id: id});
  if (!food) {
    const err = new CustomError("food not found", 404);
    return next(err);
  }
  return res.status(200).json({
    status: "success",
    food: food
  })
})

// ---------------------------------------------------------------------------------------------------------------
// remove specific foodItem
const removeFood = asyncErrorHandler(async (req, res, next) => {
  const {id} = req.params;
  const food = await Food.findById({ _id: id});

  if (!food) {
    const err = new CustomError("food not found", 404);
    return next(err);
  }

  await Food.findByIdAndDelete({ _id: id});

  // remove image from uploads folder
  fs.unlinkSync(`uploads/${food.image}`, () => {});

  return res.status(200).json({
    status: "success",
    message: `${food.name} removed successfully.`,
  });
});

// ---------------------------------------------------------------------------------------------------------------

  const updateFood = asyncErrorHandler(async(req, res, next)=>{
    // console.log('req.file', req.file)
    const {id} = req.params;
    const food = await Food.findById({_id: id})
    if (!food) {
      const err = new CustomError("food not found", 404);
      return next(err);
    };

    if(req.file){
      // remove image from uploads folder
      fs.unlinkSync(`uploads/${food.image}`, () => {});
      food.image = req.file.filename;
    }

    food.name = req.body.name || food.name;
    food.price = req.body.price || food.price;

    const updatedFood = await food.save();

    return res.status(200).json({
      status: "success",
      message: `${food.name} updated successfully.`,
      food: updatedFood
    });
  })

// ---------------------------------------------------------------------------------------------------------------

export { addFood, foodList, singleFood, removeFood, updateFood};
