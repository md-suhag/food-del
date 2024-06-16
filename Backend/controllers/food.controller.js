import foodModel from "../models/food.model.js";
import fs from "fs";
// import { v2 as cloudinary } from "cloudinary";

const addFood = async (req, res) => {
  // let file = req.files.photo;
  // cloudinary.uploader.upload(file, tempFilePath, (err, result) => {
  //   console.log(result);
  // });
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.file.path,
  });
  try {
    await food.save();
    res.json({ success: true, message: "food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }

  // if (req.file) {
  //   res.json({
  //     message: "Image uploaded successfully",
  //     imageUrl: req.file.path,
  //   });
  // } else {
  //   res.status(400).json({ error: "Failed to upload image" });
  // }
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
