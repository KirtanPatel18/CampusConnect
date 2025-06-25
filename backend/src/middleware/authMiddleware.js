// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECERET_KEY); // use the same secret as in login
    req.userId = decoded.userId;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
