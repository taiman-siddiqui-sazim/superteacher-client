import {
  EGender,
  EEducationLevel,
  EMedium,
  ESchoolClass,
  ECollegeClass,
  EDegreeType,
  EHighestEducationLevel,
} from "@/shared/typedefs";

export type TLoginRequestFields = {
  email: string;
  password: string;
};

export enum EUserRole {
  SUPER_USER = "SUPER_USER",
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
}

export type TTokenizedUser = {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  user_type: EUserRole;
};

export type TLoginResponse = {
  accessToken: string;
  user: TTokenizedUser;
};

export type TRegisterStudentFields = {
  first_name: string;
  last_name: string;
  gender: EGender;
  email: string;
  phone: string;
  address: string;
  education_level: EEducationLevel;
  password: string;
  confirm_password: string;
  medium?: EMedium;
  class?: ESchoolClass | ECollegeClass;
  degree_type?: EDegreeType;
  degree_name?: string;
  semester_year?: string;
};

export type TRegisterTeacherFields = {
  first_name: string;
  last_name: string;
  unique_code: string;
  gender: EGender;
  email: string;
  password: string;
  confirm_password: string;
  highest_education: EHighestEducationLevel;
  major_subject: string;
  subjects: string[];
};

export type TForgotPasswordResponse = {
  message: string;
};
