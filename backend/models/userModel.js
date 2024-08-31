import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required field"],
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: [true, "email is required field"],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "password is required field"],
    trim: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  cartData: {
    type: Object,
    default: {},
  },
},{minimize: false, timestamps: true});

export const User = mongoose.model("User", userSchema);


/* 
  when we create empty object property (cartData) it dosen't appear in database, 
  but with { minimize: false }  it appears in database

*/
