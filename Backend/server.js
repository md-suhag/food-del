import express from "express";
import cors from "cors";
import "./config/db.js";
import foodRouter from "./routes/food.route.js";
import dotenv from "dotenv";

dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware

app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("api is working");
});

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
