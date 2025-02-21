import express from "express";
import { registerUser, loginUser, verifyOTP, deleteUser, getUserProfile } from "../controllers/userController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png") {
      cb(null, true); // Accept file
    } else {
      cb(new Error("Only PNG files are allowed!"), false); // Reject file
    }
};

const router = express.Router();
const upload = multer({ limits: { fileSize: 50 * 1024 }, dest: process.env.UPLOAD, fileFilter }); // 50KB limit

// User Registration
router.post("/register", upload.single("image"), registerUser);

// User Login
router.post("/login", loginUser);

// OTP Verification
router.post("/verifyotp", verifyOTP);

// Delete User
router.delete("/delete/", authenticateUser, deleteUser);

router.get("/profile", authenticateUser, getUserProfile); // Secured route


export default router;