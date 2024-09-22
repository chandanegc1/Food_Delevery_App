import express from "express";
import { login, signup } from "../controllers/user-Controls.js";
import {
  checkout,
  clearOrders,
  foodItems,
  getKey,
  getOrders,
  placeOrder,
  validate,
} from "../controllers/data-Controls.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/foodItems", foodItems);
router.post("/placeOrder", placeOrder);
router.post("/myOrder", getOrders);
router.post("/clearOrder", clearOrders);
router.post("/checkout", checkout);
router.post("/validate", validate);
router.get("/getkey", getKey);

export default router;
