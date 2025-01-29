import React, { useEffect } from "react";

import { useRouter } from "next/router";

import LoginContainer from "@/modules/login/container/LoginContainer";
import LoadingSpinner from "@/shared/components/LoadingSpinner/LoadingSpinner";
import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import { DEFAULT_REDIRECT_PATH_AS_LOGGED_IN_USER } from "@/shared/constants/app.constants";
import { NextApplicationPage } from "@/shared/typedefs";

const Login: NextApplicationPage = () => {
  const router = useRouter();
  const { isLoading, user } = useSessionContext();

  useEffect(() => {
    if (isLoading || typeof location === "undefined") return;

    if (user) {
      if (router.query["redirect"]) {
        router.push(router.query["redirect"] as string);
      } else {
        router.push(DEFAULT_REDIRECT_PATH_AS_LOGGED_IN_USER);
      }
    }
  }, [isLoading, user, router]);

  return (
    <>
      <div className="relative flex justify-center items-center h-screen">
        {isLoading || user ? (
          <LoadingSpinner />
        ) : (
          <div className="max-w-2xl w-full">
            <LoginContainer />
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
