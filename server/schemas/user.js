import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  company: z.string().optional(),
  age: z.coerce.number(),
  dob: z.string(),
  //image: z.string().optional(), // Assuming base64 string or file path
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  otp: z.string().min(6, "OTP must be at least 6 characters").optional(),
});
