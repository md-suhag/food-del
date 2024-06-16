import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/food.controller.js";
// import multer from "multer";

const foodRouter = express.Router();
// image storage engine

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "tmp"); // Use temporary directory
//   },
//   filename: (req, file, cb) => {
//     return cb(null, `${Date.now()}${file.originalname}`);
//   },
// });
// const upload = multer({
//   storage: storage,
// });
import multer from "multer";
// import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
// import dotenv from 'dotenv';

// Load environment variables from .env file
// dotenv.config();

// const app = express();

// Configure Cloudinary
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Folder where images will be stored in Cloudinary
    format: async (req, file) => "png", // supports promises as well
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({ storage });
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
