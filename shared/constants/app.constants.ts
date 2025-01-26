export const APP_NAME = "Superteacher App";

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
export const MAX_TOTAL_IMAGE_SIZE = 10 * MAX_IMAGE_SIZE;

export const ACCESS_TOKEN_LOCAL_STORAGE_KEY = "ACCESS_TOKEN";

export const NOTIFICATION_AUTO_CLOSE_TIMEOUT_IN_MILLISECONDS = 5000;

export const DEFAULT_REDIRECT_PATH_AS_LOGGED_IN_USER = "/";

export const DASHBOARD_PATH = (userType: string, userId: number) => `/dashboard/${userType.toLowerCase()}/${userId.toString()}`;
