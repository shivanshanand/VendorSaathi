import express from "express";
import { body } from "express-validator";
import { register, login, logout, getCurrentUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("role").isIn(["supplier", "vendor"]),
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  login
);

router.post("/logout", logout);
router.get("/me", protect, getCurrentUser);

export default router;
