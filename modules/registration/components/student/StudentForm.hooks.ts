import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@/shared/constants/app.constants";
import { useRegisterStudentMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { TRegisterStudentFields } from "@/shared/redux/rtk-apis/auth/auth.types";
import { parseApiErrorMessage } from "@/shared/utils/errors";
import { setInLocalStorage } from "@/shared/utils/localStorage";

import { studentFormSchema } from "./StudentForm.schema";

export const useStudentForm = () => {
  const form = useForm<TRegisterStudentFields>({
    resolver: zodResolver(studentFormSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
  });
  const [register] = useRegisterStudentMutation();
  const { getMe } = useSessionContext();

  const onSubmit = async (values: TRegisterStudentFields) => {
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
