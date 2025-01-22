import { z } from "zod";

import { EGender, EHighestEducationLevel } from "@/shared/typedefs";

export const teacherFormSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .nonempty("First name is required")
      .max(50, "First name must be at most 50 characters"),
    lastName: z
      .string()
      .trim()
      .nonempty("Last name is required")
      .max(50, "Last name must be at most 50 characters"),
    uniqueCode: z
      .string()
      .refine((val) => /^\d{6}$/.test(val), {
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
    confirmPassword: z.string().trim().min(1, "Confirm password is required"),
    highestEducation: z.nativeEnum(EHighestEducationLevel, {
      errorMap: () => ({ message: "Invalid highest education level" }),
    }),
    majorSubject: z
      .string()
      .trim()
      .nonempty("Major subject is required")
      .max(50, "Major subject must be at most 50 characters"),
    subjects: z
      .array(z.string())
      .min(1, "At least one subject is required"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
