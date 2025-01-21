import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import {
  TLoginRequestFields,
  TLoginResponse,
  TRegisterStudentFields,
  TRegisterResponse,
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
    registerStudent: builder.mutation<TRegisterResponse, TRegisterStudentFields>({
      query: (data) => ({
        url: "register/student",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: TApiResponse<TRegisterResponse>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useRegisterStudentMutation } = authApi;
