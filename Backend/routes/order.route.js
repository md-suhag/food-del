import express from "express";
import authMiddleware from "./../middleware/auth.js";
import {
  placeOrder,
  userOrder,
  verifyOrder,
} from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrder);

export default orderRouter;
