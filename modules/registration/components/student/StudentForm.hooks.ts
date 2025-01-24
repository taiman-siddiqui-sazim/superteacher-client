import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useRegisterStudentMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { TRegisterStudentFields } from "@/shared/redux/rtk-apis/auth/auth.types";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { studentFormSchema } from "./StudentForm.schema";

export const useStudentForm = () => {
  const form = useForm<TRegisterStudentFields>({
    resolver: zodResolver(studentFormSchema),
    reValidateMode: "onSubmit",
  });
  const [register] = useRegisterStudentMutation();
  const router = useRouter();

  const onSubmit = async (values: TRegisterStudentFields) => {
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
