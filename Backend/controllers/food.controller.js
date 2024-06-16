import foodModel from "../models/food.model.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const addFood = async (req, res) => {
  // console.log(req.body);
  let file = req.files.image;
  cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
    // console.log(result);
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: result.url,
    });
    try {
      await food.save();
      res.json({ success: true, message: "food Added" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "error" });
    }
  });
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});

    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    // const food = await foodModel.findById(req.body.id);
    // fs.unlink(`tmp/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
