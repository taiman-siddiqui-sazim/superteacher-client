import {
  EGender,
  EEducationLevel,
  EMedium,
  ESchoolClass,
  ECollegeClass,
  EDegreeType,
} from "@/shared/typedefs/enums";

export type TStudentFormFields = {
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

export type TStudentFormInitialValues = Omit<
  TStudentFormFields,
  "gender" | "educationLevel" | "medium" | "class" | "degreeType"
>;
