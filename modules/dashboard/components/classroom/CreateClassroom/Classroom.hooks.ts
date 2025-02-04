import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCreateClassroomMutation } from "@/shared/redux/rtk-apis/classrooms/classroom.api";
import { TClassroom } from "@/shared/redux/rtk-apis/classrooms/classroom.types";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { classroomInitialValues } from "./Classroom.constants";
import classroomSchema from "./Classroom.schema";

export const useClassroomForm = (onClose: () => void) => {
  const form = useForm<Omit<TClassroom, "teacher_id">>({
    resolver: zodResolver(classroomSchema),
    defaultValues: classroomInitialValues,
    mode: "onChange",
    reValidateMode: "onSubmit",
  });
  const [createClassroom] = useCreateClassroomMutation();

  const onSubmit = async (values: Omit<TClassroom, "teacher_id">) => {
    try {
      await createClassroom(values).unwrap();
      toast.success("Classroom created successfully!");
      form.reset();
      onClose();
    } catch (error) {
      const errorMessage =
        (error as { data?: { message?: string[] } })?.data?.message?.[0] ||
        parseApiErrorMessage(error);
      toast.error("Classroom creation failed", {
        description: errorMessage,
      });
    }
  };

  return { form, onSubmit };
};
