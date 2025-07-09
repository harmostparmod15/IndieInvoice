const jwt = require("jsonwebtoken");
const User = require("../model/user");

const protectFromCookie = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing in cookies" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET );

    console.log(decoded);

    const user = await User.findById(decoded.id).select("-passwordHash");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // attach user to request
    next();
  } catch (error) {
    console.error("Auth from cookie error:", error.message);
    res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

module.exports = protectFromCookie;
