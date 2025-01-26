import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import StudentFormContainer from "@/modules/registration/containers/StudentFormContainer";
import LoadingSpinner from "@/shared/components/LoadingSpinner/LoadingSpinner";
import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import { DASHBOARD_PATH } from "@/shared/constants/app.constants";

const RegisterStudentPage: React.FC = () => {
  const router = useRouter();
  const { isLoading, user } = useSessionContext();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (isLoading || typeof location === "undefined") return;

    if (user) {
      router.push(DASHBOARD_PATH(user.user_type, user.id));
    } else {
      setIsCheckingAuth(false);
    }
  }, [isLoading, user, router]);

  return (
    <div>
      {isLoading || user || isCheckingAuth ? (
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <StudentFormContainer />
      )}
    </div>
  );
};

export default RegisterStudentPage;
