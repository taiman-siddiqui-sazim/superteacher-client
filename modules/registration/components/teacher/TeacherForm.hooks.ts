import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@/shared/constants/app.constants";
import { useRegisterTeacherMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { TRegisterTeacherFields } from "@/shared/redux/rtk-apis/auth/auth.types";
import { parseApiErrorMessage } from "@/shared/utils/errors";
import { setInLocalStorage } from "@/shared/utils/localStorage";

import { teacherFormSchema } from "./TeacherForm.schema";

export const useTeacherForm = () => {
  const form = useForm<TRegisterTeacherFields>({
    resolver: zodResolver(teacherFormSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
  });
  const [register] = useRegisterTeacherMutation();
  const { getMe } = useSessionContext();

  const onSubmit = async (values: TRegisterTeacherFields) => {
    try {
      const data = await register(values).unwrap();
      setInLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY, data.accessToken);
      await getMe().unwrap();
      toast.success("Registration successful!");
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
