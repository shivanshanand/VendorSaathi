import express from "express";
import { body, query } from "express-validator";
import { createMaterial, filterMaterials } from "../controllers/materialController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  [
    body("name").notEmpty(),
    body("pricePerUnit").isFloat({ gt: 0 }),
    body("minOrderQty").isInt({ gt: 0 }),
    body("category").notEmpty(),
    body("supplierId").notEmpty(),
    body("location.lat").isFloat(),
    body("location.lng").isFloat(),
  ],
  createMaterial
);

router.get(
  "/filter",
  [
    query("minPrice").optional().isFloat({ gt: 0 }),
    query("maxPrice").optional().isFloat({ gt: 0 }),
    query("lat").optional().isFloat(),
    query("lng").optional().isFloat(),
    query("maxDistance").optional().isInt({ gt: 0 }),
  ],
  filterMaterials
);

export default router;
