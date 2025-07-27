import express from "express";
import { askChatbot, askGemini } from "../controllers/chatbotController.js";

const router = express.Router();

router.post("/ask", askChatbot);

export default router;
