import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import classroomSchema from "@/modules/dashboard/components/classroom/CreateClassroom/Classroom.schema";
import { useUpdateClassroomMutation } from "@/shared/redux/rtk-apis/classrooms/classroom.api";
import { TClassroom } from "@/shared/redux/rtk-apis/classrooms/classroom.types";
import { parseApiErrorMessage } from "@/shared/utils/errors";

export const useEditClassroomForm = (onClose: () => void, classroom: TClassroom) => {
  const form = useForm<TClassroom>({
    resolver: zodResolver(classroomSchema),
    defaultValues: classroom,
    mode: "onChange",
    reValidateMode: "onSubmit",
  });
  const [updateClassroom] = useUpdateClassroomMutation();

  const onSubmit = async (values: Omit<TClassroom, "teacher_id">) => {
    try {
      await updateClassroom(values).unwrap();
      toast.success("Classroom updated successfully!");
      form.reset();
      onClose();
    } catch (error) {
      const errorMessage =
        (error as { data?: { message?: string[] } })?.data?.message?.[0] ||
        parseApiErrorMessage(error);
      toast.error("Classroom update failed", {
        description: errorMessage,
      });
    }
  };

  return { form, onSubmit };
};
