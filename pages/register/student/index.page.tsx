import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import StudentFormContainer from "@/modules/registration/containers/StudentFormContainer";
import LoadingSpinner from "@/shared/components/LoadingSpinner/LoadingSpinner";
import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import { DASHBOARD_ROUTE } from "@/shared/constants/route.constants";

const RegisterStudentPage: React.FC = () => {
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
        <StudentFormContainer />
      )}
    </div>
  );
};

export default RegisterStudentPage;
