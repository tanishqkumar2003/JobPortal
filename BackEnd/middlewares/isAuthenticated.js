const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(411).json({
      message: "user not authenticated",
    });
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  if (!decoded) {
    return res.status(403).json({
      message: "Invalid token",
    });
  }
  req.id = decoded.userId;
  next();
};

module.exports = isAuthenticated;
