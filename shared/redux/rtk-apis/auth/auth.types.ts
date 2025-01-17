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
