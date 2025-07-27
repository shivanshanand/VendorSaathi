import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const isSupplier = (req, res, next) => {
  if (req.user.role !== "supplier")
    return res.status(403).json({ message: "Only suppliers allowed" });
  next();
};

export const isVendor = (req, res, next) => {
  if (req.user.role !== "vendor")
    return res.status(403).json({ message: "Only vendors allowed" });
  next();
};
