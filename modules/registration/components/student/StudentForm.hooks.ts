import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useRegisterStudentMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { parseApiErrorMessage } from "@/shared/utils/errors";

import { studentFormSchema } from "./StudentForm.schema";
import { TStudentFormFields } from "./StudentForm.types";




export const useStudentForm = () => {
  const form = useForm<TStudentFormFields>({
    resolver: zodResolver(studentFormSchema),
    reValidateMode: "onSubmit",
  });
  const [register] = useRegisterStudentMutation();
  const router = useRouter();

  const onSubmit = async (values: TStudentFormFields) => {
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
