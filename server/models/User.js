import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["vendor", "supplier"], required: true },
    
    // Vendor specific fields
    shopName: { type: String },
    whatSell: { type: String, enum: ["Fruits", "Vegetables", "Spices", "Snacks", "Other"] },
    
    // Supplier specific fields
    businessName: { type: String },
    whatSupply: { type: String, enum: ["Vegetables", "Spices", "Grains", "Other"] },
    warehouse: { type: String },
    
    // Common fields for both
    area: { type: String },
    city: { type: String, enum: ["Mumbai", "Delhi", "Bangalore", "Other"] },
    years: { type: String, enum: ["<1", "1-3", "3-5", ">5"] }
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (inputPwd) {
  return bcrypt.compare(inputPwd, this.password);
};

export default mongoose.model("User", userSchema);
