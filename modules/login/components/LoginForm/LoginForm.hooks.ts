import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@/shared/constants/app.constants";
import { DASHBOARD_ROUTE } from "@/shared/constants/route.constants";
import { useLoginMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { parseApiErrorMessage } from "@/shared/utils/errors";
import { setInLocalStorage } from "@/shared/utils/localStorage";

import { loginFormInitialValues, loginFormValidationSchemaResolver } from "./LoginForm.helpers";
import { TLoginFormFields } from "./LoginForm.types";

export const useLoginForm = () => {
  const form = useForm<TLoginFormFields>({
    defaultValues: loginFormInitialValues,
    resolver: loginFormValidationSchemaResolver,
    reValidateMode: "onSubmit",
  });

  const [login] = useLoginMutation();
  const { getMe } = useSessionContext();
  const router = useRouter();

  const onSubmit = async (values: TLoginFormFields) => {
    try {
      const data = await login(values).unwrap();
      setInLocalStorage(ACCESS_TOKEN_LOCAL_STORAGE_KEY, data.accessToken);
      await getMe().unwrap();
      toast.success("Login successful!");
      setTimeout(() => {
        router.replace(DASHBOARD_ROUTE);
      }, 1000);
    } catch (error) {
      toast.error("Login failed", {
        description: parseApiErrorMessage(error),
      });
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
