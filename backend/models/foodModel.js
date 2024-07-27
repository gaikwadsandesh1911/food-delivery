import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required field"],
        unique: true,
        minlength: [4, 'name should have atleast four char.']
    },
    description: {
        type: String,
        required: [true, "description is required field"],
    },
    price: {
        type: Number,
        required: [true, "price is required field"],
    },
    image: {
        type: String,
        required: [true, "image is required field"],
    },
    category: {
        type: String,
        required: [true, "category is required field"],
    }
},{timestamps: true});

export const FoodModel = mongoose.model('foods', foodSchema);