import { z } from "zod";

import { EGender, EEducationLevel, EMedium, EDegreeType } from "@/shared/typedefs";

export const studentFormSchema = z
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
    gender: z.nativeEnum(EGender, { errorMap: () => ({ message: "Invalid gender" }) }),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    phone: z
      .string()
      .regex(
        /^\d{10,15}$/,
        "Phone number must be between 10 to 15 digits and contain only numbers",
      ),
    address: z
      .string()
      .trim()
      .min(1, "Address is required")
      .max(100, "Address must be at most 100 characters"),
    education_level: z.nativeEnum(EEducationLevel, {
      errorMap: () => ({ message: "Invalid education level" }),
    }),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,128}$/,
        "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    confirm_password: z.string().trim().min(1, "Confirm password is required"),
    medium: z.nativeEnum(EMedium).optional(),
    class: z
      .string()
      .regex(/^(1[0-2]|[1-9])$/, { message: "Class must be a digit from 1 to 12" })
      .optional(),
    degree_type: z.nativeEnum(EDegreeType).optional(),
    degree_name: z
      .string()
      .trim()
      .min(1, "Degree name is required")
      .max(50, "Degree name must be at most 50 characters")
      .optional(),
    semester_year: z
      .string()
      .trim()
      .min(1, "Semester/Year is required")
      .max(25, "Semester/Year must be at most 25 characters")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirm_password"],
      });
    }

    if (
      data.education_level === EEducationLevel.School ||
      data.education_level === EEducationLevel.College
    ) {
      if (!data.medium) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Medium is required",
          path: ["medium"],
        });
      }
      if (!data.class) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Class is required",
          path: ["class"],
        });
      }
    }

    if (data.education_level === EEducationLevel.University) {
      if (!data.degree_type) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Degree type is required",
          path: ["degree_type"],
        });
      }
      if (!data.degree_name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Degree name is required",
          path: ["degree_name"],
        });
      }
      if (!data.semester_year) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Semester/Year is required",
          path: ["semester_year"],
        });
      }
    }
  });
