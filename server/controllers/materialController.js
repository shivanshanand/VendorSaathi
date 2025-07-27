import { validationResult } from "express-validator";
import geolib from "geolib";
import RawMaterial from "../models/RawMaterial.js";

export const createMaterial = async (req, res) => {
  if (req.user?.role !== "supplier") {
    return res.status(403).json({ message: "Only suppliers can create materials" });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newMaterial = new RawMaterial(req.body);
    await newMaterial.save();
    res.status(201).json({ success: true, data: newMaterial });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const filterMaterials = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, available, lat, lng, maxDistance } = req.query;
    const query = {};
    if (category) query.category = category;
    if (available) query.available = available === "true";
    if (minPrice || maxPrice)
      query.pricePerUnit = {
        ...(minPrice && { $gte: Number(minPrice) }),
        ...(maxPrice && { $lte: Number(maxPrice) }),
      };
    let materials = await RawMaterial.find(query);
    // Geospatial filtering
    if (lat && lng && maxDistance) {
      materials = materials.filter(mat => {
        if (!mat.location?.lat || !mat.location?.lng) return false;
        const dist = geolib.getDistance(
          { latitude: Number(lat), longitude: Number(lng) },
          { latitude: mat.location.lat, longitude: mat.location.lng }
        );
        return dist <= Number(maxDistance);
      });
    }
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
