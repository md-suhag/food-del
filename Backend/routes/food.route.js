import express from "express";

import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/food.controller.js";
import multer from "multer";

const foodRouter = express.Router();
// image storage engine

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp"); // Use temporary directory
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
});

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
