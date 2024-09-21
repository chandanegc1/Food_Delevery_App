import Order from "../models/order-Model.js";
import { instance } from "../utils/razorpay.js";
import crypto from "crypto";

export const foodItems = async (req, res) => {
  try {
    return res.status(200).send([global.foodItems, global.foodCategory]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const placeOrder = async (req, res) => {
  try {
    const { name, qty, price, userId } = req.body;

    const order = new Order({
      name,
      qty,
      price,
      userId,
    });
    await order.save();
    return res.status(201).json({ message: "Order Saved in DB" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getOrders = async (req, res) => {
  const { userId } = req.body;
  try {
    const myOrderData = await Order.find({ userId });
    let sortedData;
    myOrderData.length > 0
      ? (sortedData = myOrderData.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        ))
      : (sortedData = []);
    res.status(201).json({ sortedData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const clearOrders = async (req, res) => {
  const { userId } = req.body;
  try {
    await Order.deleteMany({ userId });
    const deletedOrder = await Order.find({ userId });
    return res.json({ order: deletedOrder });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const checkout = async (req, res) => {
  const { totalPrice } = req.body;
  try {
    const options = {
      amount: Number(totalPrice) * 100,
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const validate = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body.toString())
      .digest("hex");

    const isAuthenticate = expectedSignature === razorpay_signature;

    if (isAuthenticate) {
      return res.status(200).json({ redirect: "http://localhost:3000/order" });
    } else {
      return res.status(401).json({ error: "Payment information is invalid" });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getKey = (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
};
