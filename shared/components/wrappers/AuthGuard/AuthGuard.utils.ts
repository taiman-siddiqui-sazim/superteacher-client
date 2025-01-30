import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";

export const getLoginUrlWithRedirectParam = (redirectTo: string) => {
  const url = new URL("/login", window.location.origin);
  url.searchParams.set("redirect", redirectTo);
  return url.toString();
};

export const getDefaultAllowedRolesInLoggedInRoute = () => [EUserRole.TEACHER, EUserRole.STUDENT];
