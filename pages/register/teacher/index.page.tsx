import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import TeacherFormContainer from "@/modules/registration/containers/TeacherFormContainer";
import LoadingSpinner from "@/shared/components/LoadingSpinner/LoadingSpinner";
import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import { DASHBOARD_ROUTE } from "@/shared/constants/route.constants";

const RegisterTeacherPage: React.FC = () => {
  const router = useRouter();
  const { isLoading, user } = useSessionContext();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (isLoading || typeof location === "undefined") return;

    if (user) {
      router.replace(DASHBOARD_ROUTE);
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
        <TeacherFormContainer />
      )}
    </div>
  );
};

export default RegisterTeacherPage;
