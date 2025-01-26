import { z } from "zod";

import { EGender, EHighestEducationLevel } from "@/shared/typedefs";

export const teacherFormSchema = z
  .object({
    first_name: z
      .string()
      .trim()
      .min(1, "First name is required")
      .max(50, "First name must be at most 50 characters"),
    last_name: z
      .string()
      .trim()
      .min(1, "Last name is required")
      .max(50, "Last name must be at most 50 characters"),
    unique_code: z.string().refine((val) => /^\d{6}$/.test(val), {
      message: "Unique code must be a 6-digit number",
    }),
    gender: z.nativeEnum(EGender, { errorMap: () => ({ message: "Invalid gender" }) }),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,128}$/,
        "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    confirm_password: z.string().trim().min(1, "Confirm password is required"),
    highest_education: z.nativeEnum(EHighestEducationLevel, {
      errorMap: () => ({ message: "Invalid highest education level" }),
    }),
    major_subject: z
      .string()
      .trim()
      .min(1, "Major subject is required")
      .max(50, "Major subject must be at most 50 characters"),
    subjects: z.array(z.string()).min(1, "At least one subject is required"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirm_password"],
      });
    }
  });
