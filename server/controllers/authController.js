import { validationResult } from "express-validator";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { 
      name, 
      mobile, 
      password, 
      role,
      shopName,
      whatSell,
      businessName,
      whatSupply,
      warehouse,
      area,
      city,
      years
    } = req.body;

    const existing = await User.findOne({ mobile });
    if (existing)
      return res.status(400).json({ message: "User already exists with this mobile number" });

    const userData = {
      name,
      mobile,
      password,
      role,
      area,
      city
    };

    // Add role-specific fields
    if (role === 'vendor') {
      userData.shopName = shopName;
      userData.whatSell = whatSell;
      userData.years = years;
    } else if (role === 'supplier') {
      userData.businessName = businessName;
      userData.whatSupply = whatSupply;
      userData.warehouse = warehouse;
    }

    const user = await User.create(userData);
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });
    const userResponse = {
      name,
      mobile,
      role,
      area,
      city,
      ...(role === 'vendor' ? { shopName, whatSell, years } : { businessName, whatSupply, warehouse })
    };
    res.status(201).json({ success: true, user: userResponse });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(400).json({ message: "Invalid credentials" });
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.json({
      success: true,
      user: { name: user.name, email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out" });
};

export const getCurrentUser = (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not logged in" });
  res.json({ user: req.user });
};
