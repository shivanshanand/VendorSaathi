import express from "express";
import { body, param } from "express-validator";
import { createGroupBuy, joinGroupBuy } from "../controllers/groupBuyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  [
    body("materialId").notEmpty(),
    body("targetQty").isInt({ gt: 0 }),
  ],
  createGroupBuy
);

router.post(
  "/:groupId/join",
  protect,
  [
    param("groupId").notEmpty(),
    body("buyerId").notEmpty(),
    body("quantity").isInt({ gt: 0 }),
  ],
  joinGroupBuy
);

export default router;
