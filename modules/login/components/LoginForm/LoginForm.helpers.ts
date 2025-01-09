import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { TLoginFormFields } from "./LoginForm.types";

export const loginFormInitialValues: TLoginFormFields = {
  email: "",
  password: "",
};

export const loginFormValidationSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Required"),
  password: z
    .string()
    .min(8, "Must be at least 8 characters long")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[@$!%*?&#]/, "Must contain at least one special character"),
});

export const loginFormValidationSchemaResolver = zodResolver(loginFormValidationSchema);
