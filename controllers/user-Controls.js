import jwt from "jsonwebtoken";
import User from "../models/user-Model.js";
import bcrypt from "bcryptjs";

const SECRET_KEY = "thisisafoodpurchasingwebsite";

export const signup = async (req, res) => {
  const { name, email, password, address } = req.body;

  // Check if all required fields are present
  if (!name || !email || !password || !address) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let user = await User.findOne({ email });

    if (user) return res.status(409).json({ error: "User Already Exist" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
    });

    const authToken = jwt.sign({ userId: user.id }, SECRET_KEY);

    return res.status(201).json({ success: true, authToken, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(400).json({ error: "User Does Not Exist" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ error: "Password is Incorrect" });

    const authToken = jwt.sign({ userId: user.id }, SECRET_KEY);

    return res.status(200).json({ success: true, authToken, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
