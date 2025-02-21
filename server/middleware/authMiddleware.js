import jwt from "jsonwebtoken";
import dotenv from "dotenv";
    
dotenv.config();

export const authenticateUser = (req, res, next) => {
  try {
    const token = req.cookies.authToken; // Extract token from headers

    if (!token) {
      return res.status(401).json({ message: "Access denied." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user details to request
    //console.log(decoded)

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
