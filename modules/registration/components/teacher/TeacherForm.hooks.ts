import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useRegisterTeacherMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { TRegisterTeacherFields } from "@/shared/redux/rtk-apis/auth/auth.types";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { teacherFormSchema } from "./TeacherForm.schema";

export const useTeacherForm = () => {
  const form = useForm<TRegisterTeacherFields>({
    resolver: zodResolver(teacherFormSchema),
    reValidateMode: "onSubmit",
  });
  const [register] = useRegisterTeacherMutation();
  const router = useRouter();

  const onSubmit = async (values: TRegisterTeacherFields) => {
    try {
      await register(values).unwrap();
      toast.success("Registration successful!");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      toast.error("Registration failed", {
        description: parseApiErrorMessage(error),
      });
    }
  };

  return {
    form,
    onSubmit,
  };
};
