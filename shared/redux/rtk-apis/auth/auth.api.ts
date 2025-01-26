import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import {
  TLoginRequestFields,
  TLoginResponse,
  TRegisterStudentFields,
  TRegisterTeacherFields,
} from "./auth.types";

const authApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TLoginResponse, TLoginRequestFields>({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: TApiResponse<TLoginResponse>) => response.data,
    }),
    registerStudent: builder.mutation<TLoginResponse, TRegisterStudentFields>({
      query: (data) => ({
        url: "register/student",
        method: "POST",
        body: { user: data },
      }),
      transformResponse: (response: TApiResponse<TLoginResponse>) => response.data,
    }),
    registerTeacher: builder.mutation<TLoginResponse, TRegisterTeacherFields>({
      query: (data) => ({
        url: "register/teacher",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: TApiResponse<TLoginResponse>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterStudentMutation, useRegisterTeacherMutation } = authApi;
