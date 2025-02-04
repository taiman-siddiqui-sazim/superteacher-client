import { z } from "zod";

const classroomSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must be at most 50 characters"),
  days_of_week: z.array(z.string()).min(1, "Select at least one day").max(4, "Select at most 4 days"),
  subject: z.string().nonempty("Subject is required"),
  class_time: z.string().nonempty("Class time is required"),
});

export default classroomSchema;
