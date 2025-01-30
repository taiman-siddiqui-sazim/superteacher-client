import { useState, useEffect } from "react";

export const useReset = <T>(reset: (values: T) => void, initialValues: T) => {
  const [resetPassword, setResetPassword] = useState(false);

  const handleReset = () => {
    reset(initialValues);
    setResetPassword(true);
  };

  useEffect(() => {
    if (resetPassword) {
      reset({ ...initialValues, password: "" });
      setResetPassword(false);
    }
  }, [resetPassword, reset, initialValues]);

  return { handleReset };
};
