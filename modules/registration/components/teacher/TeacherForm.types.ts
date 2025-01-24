import { TRegisterTeacherFields } from "@/shared/redux/rtk-apis/auth/auth.types";

export type TTeacherFormInitialValues = Omit<TRegisterTeacherFields, "gender" | "highestEducation">;
