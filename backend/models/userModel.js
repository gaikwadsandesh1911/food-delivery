import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required field"],
  },
  email: {
    type: String,
    required: [true, "email is required field"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "password is required field"],
  },
  cartData: {
    type: Object,
    default: {},
  },
},{minimize: false, timestamps: true});

export const UserModel = mongoose.model("users", userSchema);


/* 
  when we create empty object property (cartData) it dosen't appear in database, 
  but with { minimize: false }  it appears in database

*/
