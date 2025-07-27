import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import materialRoutes from "./routes/materialRoutes.js";
import groupBuyRoutes from "./routes/groupBuyRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import rateLimit from "express-rate-limit";
import chatbotRoutes from "./routes/chatbotRoutes.js";

dotenv.config();
connectDB();

const app = express();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: "Too many requests, please try again later."
});

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Route Middleware
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/groupbuy", groupBuyRoutes);
app.use("/api/chatbot", chatbotRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
