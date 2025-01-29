import { TRegisterStudentFields } from "@/shared/redux/rtk-apis/auth/auth.types";

export type TStudentFormInitialValues = Omit<
  TRegisterStudentFields,
  "gender" | "education_level" | "medium" | "class" | "degree_type"
>;
