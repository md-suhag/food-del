import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbURI = process.env.db_url;
mongoose
  .connect(dbURI)
  .then(() => console.log("db connected"))
  .catch((err) => {
    console.log("db is not connected");
    console.log(err.message);
    process.exit(1);
  });
