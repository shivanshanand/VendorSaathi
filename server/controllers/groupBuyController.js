import { validationResult } from "express-validator";
import GroupBuy from "../models/GroupBuy.js";

export const createGroupBuy = async (req, res) => {
  if (req.user?.role !== "supplier") {
    return res.status(403).json({ message: "Only suppliers can create group buys" });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newGroup = new GroupBuy(req.body);
    await newGroup.save();
    res.status(201).json({ success: true, data: newGroup });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const joinGroupBuy = async (req, res) => {
  if (req.user?.role !== "vendor") {
    return res.status(403).json({ message: "Only vendors can join group buys" });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { groupId } = req.params;
    const { buyerId, quantity } = req.body;
    if (quantity <= 0) return res.status(400).json({ message: "Quantity must be positive" });
    const group = await GroupBuy.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });
    group.buyers.push({ buyerId, quantity });
    group.totalQty += quantity;
    if (group.totalQty >= group.targetQty) {
      group.status = "closed";
    }
    await group.save();
    res.json({ success: true, data: group });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
