import { jwtDecode } from "jwt-decode";
import { auth } from "../firebase/firebaseConfig";

export const TOKEN_LOCAL_STORAGE_KEY_TELEGRAM = "token_telegram";
export const TOKEN_LOCAL_STORAGE_KEY_GOOGLE = "token_google";
export const GOOGLE_AUTH_ACTION_KEY = "google_auth_action";

export enum GoogleAuthAction {
  LOG_IN = "log_in",
  SIGN_UP = "sign_up",
}

export const USER_DB_ID_KEY = "user_db_id";

//-----------------------------------------------------------------//

export const getGoogleAuthToken = () => {
  return localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY_GOOGLE);
};

export const setGoogleAuthToken = (token: string) => {
  localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY_GOOGLE, token);
};

export const isGoogleAuthToken = () => {
  if (getGoogleAuthToken() === null || getGoogleAuthToken() === "")
    return false;
  return true;
};

export const clearGoogleAuthToken = () => {
  localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY_GOOGLE);
};

//-----------------------------------------------------------------//

export const getTelegramAuthToken = () => {
  return localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY_TELEGRAM) ?? "";
};

export const setTelegramAuthToken = (token: string) => {
  localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY_TELEGRAM, token);
};

export const isTelegramAuthToken = () => {
  if (getTelegramAuthToken() === null || getTelegramAuthToken() === "")
    return false;
  return true;
};

export const clearTelegramAuthToken = () => {
  localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY_TELEGRAM);
};

//-----------------------------------------------------------------//

export const getGoogleAuthAction = () => {
  return localStorage.getItem(GOOGLE_AUTH_ACTION_KEY) ?? "";
};

export const setGoogleAuthAction = (action: GoogleAuthAction) => {
  localStorage.setItem(GOOGLE_AUTH_ACTION_KEY, action);
};

export const isGoogleAuthAction = () => {
  if (getGoogleAuthAction() === null || getGoogleAuthAction() === "")
    return false;
  return true;
};

export const clearGoogleAuthAction = () => {
  localStorage.removeItem(GOOGLE_AUTH_ACTION_KEY);
};

//-----------------------------------------------------------------//

export const getUserDbId = () => {
  return localStorage.getItem(USER_DB_ID_KEY) ?? "";
};

export const setUserDbId = (userDbId: string) => {
  localStorage.setItem(USER_DB_ID_KEY, userDbId);
};

export const clearUserDbId = () => {
  localStorage.removeItem(USER_DB_ID_KEY);
};

//-----------------------------------------------------------------//

export const isTelegramTokenExpired = () => {
  if (isTelegramAuthToken() === false) return true;

  const jwt = getTelegramAuthToken();
  const decoded = jwtDecode(jwt);
  const now = Date.now() / 1000; // current time in seconds
  if (decoded.exp) return decoded.exp < now;

  return true;
};

export const isGoogleTokenExpired = () => {
  if (auth.currentUser && isGoogleAuthAction() === false) return false;

  return true;
};
