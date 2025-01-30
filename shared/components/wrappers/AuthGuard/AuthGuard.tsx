import { useEffect } from "react";

import { useRouter } from "next/router";

import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { useSessionContext } from "../AppInitializer/AppInitializerContext";
import { TAuthGuardProps } from "./AuthGuard.types";
import {
  getDefaultAllowedRolesInLoggedInRoute,
  getLoginUrlWithRedirectParam,
} from "./AuthGuard.utils";

const AuthGuard = ({ children, allowedRoles }: TAuthGuardProps) => {
  if (!allowedRoles || allowedRoles.length === 0) {
    allowedRoles = getDefaultAllowedRolesInLoggedInRoute();
  }

  const router = useRouter();
  const { isLoading, error, user } = useSessionContext();
  const isUnauthenticated = !isLoading && (error || !user);
  const isUnauthorized = !isLoading && !error && user && !allowedRoles.includes(user.user_type);

  useEffect(() => {
    if (isLoading || typeof location === "undefined") return;

    if (!isLoading && (isUnauthenticated)) {
      const redirectTo = `${location.pathname}${location.search}`;
      router.push(getLoginUrlWithRedirectParam(redirectTo));
    }
  }, [router, isLoading, error, isUnauthenticated]);

  if (isLoading || isUnauthenticated || isUnauthorized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
