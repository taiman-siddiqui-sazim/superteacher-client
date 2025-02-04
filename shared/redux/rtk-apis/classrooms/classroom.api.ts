import { TApiResponse } from "@/shared/typedefs";

import projectApi from "../api.config";
import { TClassroom, TClassroomResponse } from "./classroom.types";

const classroomsApi = projectApi.injectEndpoints({
  endpoints: (builder) => ({
    createClassroom: builder.mutation({
      query: (data) => ({
        url: "classroom/teacher",
        method: "POST",
        body: { classroom: data },
      }),
      invalidatesTags: ["Classrooms"],
      transformResponse: (response: TApiResponse<TClassroomResponse>) => response.data,
    }),
    getClassrooms: builder.query<TClassroom[], string>({
      query: (userId) => `classrooms?user_id=${userId}`,
      providesTags: ["Classrooms"],
      transformResponse: (response: TApiResponse<TClassroom[]>) => response.data,
    }),
    updateClassroom: builder.mutation({
      query: (data) => ({
        url: `classroom/${data.id}`,
        method: "PUT",
        body: {
          classroom: {
            title: data.title,
            subject: data.subject,
            class_time: data.class_time,
            days_of_week: data.days_of_week,
          },
        },
      }),
      invalidatesTags: ["Classrooms"],
      transformResponse: (response: TApiResponse<TClassroom>) => {
        const { teacher_id, ...classroomData } = response.data;
        return classroomData;
      },
    }),
    deleteClassroom: builder.mutation({
      query: (id: string) => ({
        url: `classroom/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Classrooms"],
      transformResponse: (response: TApiResponse<null>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useCreateClassroomMutation, useGetClassroomsQuery, useUpdateClassroomMutation, useDeleteClassroomMutation } = classroomsApi;
export default classroomsApi;
