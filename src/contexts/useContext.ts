import { useContext } from "react";
import { GoogleAuthContext, TelegramAuthContext } from "./authContext";
import { ErrorContext } from "./errorContext";

// use Google Auth Context
export function useGoogleAuthContext() {
  return useContext(GoogleAuthContext);
}

// use Telegram Auth Context
export function useTelegramAuthContext() {
  return useContext(TelegramAuthContext);
}

// use Error Context
export function useErrorContext() {
  return useContext(ErrorContext);
}
