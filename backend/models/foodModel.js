import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "This is required field"],
        unique: true,
        minlength: [4, 'At least four char is requiered']
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
},{timestamps: true});

export const FoodModel = mongoose.model('foods', foodSchema);