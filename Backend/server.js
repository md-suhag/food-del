import express from "express";
import cors from "cors";
import "./config/db.js";
import foodRouter from "./routes/food.route.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import fileUpload from "express-fileupload";
dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
// const corsConfig = {
//   origin: "*",
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
// };
// app.options("*", cors(corsConfig));
// app.use(express.json());

// app.use(cors(corsConfig));

const allowedOrigins = [
  "https://food-del-admin-two.vercel.app",
  "https://food-del-opal.vercel.app",
];

const corsConfig = {
  origin: function (origin, callback) {
    // Check if the origin is in the allowedOrigins array
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Handle preflight requests
app.options("*", cors(corsConfig));

// Apply CORS middleware
app.use(cors(corsConfig));

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// api endpoints
app.use("/api/food", foodRouter);
// app.use("/images", express.static("tmp"));
app.use("/api/user", userRouter);
app.get("/", (req, res) => {
  res.send("api is working");
});

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
