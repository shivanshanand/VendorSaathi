import mongoose from "mongoose";

const groupBuySchema = new mongoose.Schema({
  materialId: { type: mongoose.Schema.Types.ObjectId, ref: "RawMaterial" },
  buyers: [
    {
      buyerId: String,
      quantity: Number
    }
  ],
  totalQty: { type: Number, default: 0 },
  targetQty: Number,
  status: { type: String, enum: ['open', 'closed'], default: 'open' }
}, { timestamps: true });

export default mongoose.model("GroupBuy", groupBuySchema);
