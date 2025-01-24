import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import LoginContainer from "@/modules/login/container/LoginContainer";
import LoadingSpinner from "@/shared/components/LoadingSpinner/LoadingSpinner";
import NextHead from "@/shared/components/NextHead";
import { Button } from "@/shared/components/shadui";
import { useSessionContext } from "@/shared/components/wrappers/AppInitializer/AppInitializerContext";
import { DEFAULT_REDIRECT_PATH_AS_LOGGED_IN_USER } from "@/shared/constants/app.constants";
import { NextApplicationPage } from "@/shared/typedefs";

const Login: NextApplicationPage = () => {
  const router = useRouter();
  const { isLoading, user } = useSessionContext();
  const [isNavigating, setIsNavigating] = useState(false);

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

  const handleNavButtonClick = () => {
    setIsNavigating(true);
    router.push("/");
  };

  return (
    <>
      <NextHead />
      <div className="relative flex justify-center items-center h-screen">
        <Button
          onClick={handleNavButtonClick}
          className="absolute top-4 left-4 sm:text-base lg:text-sm text-green-500 hover:underline bg-transparent hover:bg-transparent"
        >
          Back to Home
        </Button>
        {isLoading || user || isNavigating ? (
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
