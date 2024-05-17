const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");


    if (!token) {
      return res.status(401).json({ error: "Authentication token is missing" });
    }
    const  decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    
    res.status(401).json({ error: "Not authorized" });
  }
};

module.exports = authMiddleware;
