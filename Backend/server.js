import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "./config/db.js";
import foodRouter from "./routes/food.route.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import fileUpload from "express-fileupload";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
dotenv.config();

// app config
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const port = process.env.PORT || 4000;
app.use(
  cors({
    origin: "*",
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// api endpoints
app.use("/api/food", foodRouter);
// app.use("/images", express.static("tmp"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("api is working");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
