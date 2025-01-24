import { TRegisterStudentFields } from "@/shared/redux/rtk-apis/auth/auth.types";

export type TStudentFormInitialValues = Omit<
  TRegisterStudentFields,
  "gender" | "educationLevel" | "medium" | "class" | "degreeType"
>;
