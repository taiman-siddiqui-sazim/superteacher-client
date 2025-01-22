import {
  EGender,
  EEducationLevel,
  EMedium,
  ESchoolClass,
  ECollegeClass,
  EDegreeType,
  EHighestEducationLevel
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
  firstName: string;
  lastName: string;
  gender: EGender;
  email: string;
  phoneNumber: string;
  address: string;
  educationLevel: EEducationLevel;
  password: string;
  confirmPassword: string;
  medium?: EMedium;
  class?: ESchoolClass | ECollegeClass;
  degreeType?: EDegreeType;
  degreeName?: string;
  semesterYear?: string;
};

export type TRegisterTeacherFields = {
  firstName: string;
  lastName: string;
  uniqueCode: string;
  gender: EGender;
  email: string;
  password: string;
  confirmPassword: string;
  highestEducation: EHighestEducationLevel;
  majorSubject: string;
  subjects: string[];
};

export type TRegisterResponse = {
  user: TTokenizedUser;
};
