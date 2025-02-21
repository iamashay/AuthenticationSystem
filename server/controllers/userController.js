import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { generateOTP } from "../utils/otp.js";
import dotenv from "dotenv";
import { registerSchema, loginSchema } from "../schemas/user.js";
import { stat } from "fs";

dotenv.config();
const prisma = new PrismaClient();

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    // Validate input
    const parsedInput = registerSchema.safeParse(req.body);
    if (!parsedInput.success) {
      return res.status(400).json({ errors: parsedInput.error.format() });
    }

    const { name, email, password, company, age, dob } = parsedInput.data;
    const image = req.file.filename;
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, company, age, dob, image },
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// LOGIN USER & GENERATE OTP
export const loginUser = async (req, res) => {
  try {
    // Validate input
    const parsedInput = loginSchema.safeParse(req.body);
    if (!parsedInput.success) {
      return res.status(400).json({ errors: parsedInput.error.format() });
    }

    const { email, password } = parsedInput.data;

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (user.failedAttempt >= 3) { 
      return res.status(401).json({ message: "Too many failed login attempts", status: "BLOCKED" });
    }
    if (!user || !(await bcrypt.compare(password, user.password))) {
      await prisma.user.update({
        where: { email: email },
        data: { failedAttempt: { increment: 1 } },
      });
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    console.log({
      where: { user: user.id },
      update: { code: otp, expiresAt },
      create: { userId: user.id, code: otp, expiresAt },
    })
    await prisma.oTP.upsert({
      where: {  userId: user.id },
      update: { code: otp, expiresAt },
      create: { userId: user.id, code: otp, expiresAt },
    });



    res.status(200).json({ message: "OTP generated successfully", otp });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// VERIFY OTP & ISSUE JWT
export const verifyOTP = async (req, res) => {
  try {

    const parsedInput = loginSchema.safeParse(req.body);
    if (!parsedInput.success) {
      return res.status(400).json({ errors: parsedInput.error.format() });
    }

    const { email, otp } = parsedInput.data;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ message: "User not found" });

    const storedOtp = await prisma.oTP.findUnique({ where: { userId: user.id } });

    if (!storedOtp || storedOtp.code !== otp || storedOtp.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    await prisma.oTP.delete({ where: { userId: user.id } });

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set token in an HTTP-only cookie
    res.cookie("authToken", token, {
      httpOnly: true,   // Prevents access via JavaScript (XSS protection)
      secure: process.env.NODE_ENV === "production", // Only HTTPS in production
      sameSite: "lax", // Prevents CSRF
      maxAge: 3600000, // 1 hour
    });

    
    res.status(200).json({ message: "OTP verified successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🔴 DELETE ACCOUNT
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.user;

    await prisma.user.delete({ where: { id: userId } });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🟣 GET USER PROFILE
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await prisma.user.findUnique({ where: { id: userId }, select: {
      name: true,
      email: true,
      company: true,
      age: true,
      dob: true,
      image: true,
    }});

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
