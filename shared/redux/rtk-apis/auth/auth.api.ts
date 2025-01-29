import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import {
  TLoginRequestFields,
  TLoginResponse,
  TRegisterStudentFields,
  TRegisterTeacherFields,
  TForgotPasswordResponse,
} from "./auth.types";

const authApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TLoginResponse, TLoginRequestFields>({
      query: (data) => ({
        url: "authorize/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: TApiResponse<TLoginResponse>) => response.data,
    }),
    registerStudent: builder.mutation<TLoginResponse, TRegisterStudentFields>({
      query: (data) => ({
        url: "users/register/student",
        method: "POST",
        body: { user: data },
      }),
      transformResponse: (response: TApiResponse<TLoginResponse>) => response.data,
    }),
    registerTeacher: builder.mutation<TLoginResponse, TRegisterTeacherFields>({
      query: (data) => ({
        url: "users/register/teacher",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: TApiResponse<TLoginResponse>) => response.data,
    }),
    forgotPassword: builder.mutation<TForgotPasswordResponse, string>({
      query: (email) => ({
        url: "authorize/passwords/forgot",
        method: "POST",
        body: { email },
      }),
    }),
    checkOtp: builder.mutation({
      query: (data) => ({
        url: "authorize/passwords/check_otp",
        method: "POST",
        body: { email: data.email, otp: data.otp },
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "authorize/passwords/reset",
        method: "POST",
        body: { email: data.email, otp: data.otp, password: data.password },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterStudentMutation,
  useRegisterTeacherMutation,
  useForgotPasswordMutation,
  useCheckOtpMutation,
  useResetPasswordMutation,
} = authApi;
