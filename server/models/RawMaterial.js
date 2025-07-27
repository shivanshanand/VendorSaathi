import mongoose from "mongoose";

const rawMaterialSchema = new mongoose.Schema(
  {
    name: String,
    imageUrl: String,
    pricePerUnit: Number,
    minOrderQty: Number,
    category: String,
    deliveryOptions: [String],
    location: {
      lat: Number,
      lng: Number,
    },
    supplierId: String, // keep string for now (no user model)
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("RawMaterial", rawMaterialSchema);
