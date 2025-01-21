import { z } from "zod";

import {
  EGender,
  EEducationLevel,
  EMedium,
  ESchoolClass,
  ECollegeClass,
  EDegreeType,
} from "@/shared/typedefs/enums";

export const studentFormSchema = z
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
    gender: z.nativeEnum(EGender, { errorMap: () => ({ message: "Invalid gender" }) }),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    phoneNumber: z
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
    educationLevel: z.nativeEnum(EEducationLevel, {
      errorMap: () => ({ message: "Invalid education level" }),
    }),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,128}$/,
        "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    confirmPassword: z.string().trim().min(1, "Confirm password is required"),
    medium: z.nativeEnum(EMedium).optional(),
    class: z.union([z.nativeEnum(ESchoolClass), z.nativeEnum(ECollegeClass)]).optional(),
    degreeType: z.nativeEnum(EDegreeType).optional(),
    degreeName: z
      .string()
      .trim()
      .min(1, "Degree name is required")
      .max(50, "Degree name must be at most 50 characters")
      .optional(),
    semesterYear: z
      .string()
      .trim()
      .min(1, "Semester/Year is required")
      .max(25, "Semester/Year must be at most 25 characters")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }

    if (
      data.educationLevel === EEducationLevel.School ||
      data.educationLevel === EEducationLevel.College
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

    if (data.educationLevel === EEducationLevel.University) {
      if (!data.degreeType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Degree type is required",
          path: ["degreeType"],
        });
      }
      if (!data.degreeName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Degree name is required",
          path: ["degreeName"],
        });
      }
      if (!data.semesterYear) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Semester/Year is required",
          path: ["semesterYear"],
        });
      }
    }
  });
