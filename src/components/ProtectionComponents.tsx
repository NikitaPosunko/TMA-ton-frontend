import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useErrorContext,
  useTelegramAuthContext,
} from "../contexts/useContext";
import { BASE_ROUTE, ERROR_ROUTE } from "../static/routes";
import {
  isTelegramTokenExpired,
  isGoogleTokenExpired,
} from "../utils/localStorageUtils";
import { Loading } from "./Components";
import { BACKEND_ADMIN_CHECK_REQUEST } from "../static/url";
import { AdminCheckResponseDto } from "../types/adminCheckType";
import { backendAxios } from "../utils/axiosConfig";

//--------------------------------- Login protection Component ---------------------------------//

export const LoginProtection = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const telegramAuthContext = useTelegramAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isTelegramTokenExpired() && isGoogleTokenExpired()) {
      // 1. remove telegram auth data because it is expired
      telegramAuthContext.doLogOutFromTelegram().then(() => {
        // 2. google auth data ara controlled by google auth object
        // and removed automatically when user signs out from google

        alert("You need to log in first!");

        // 3. go to base route
        navigate(BASE_ROUTE, { replace: true });

        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [telegramAuthContext, navigate]);
  if (loading) return <Loading />;
  return children;
};

//--------------------------------- Admin protection Component ---------------------------------//

export const AdminProtection = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [adminCheckResponse, setadminCheckResponse] =
    useState<AdminCheckResponseDto | null>(null);

  // error handling
  const errorContext = useErrorContext();
  const navigate = useNavigate();

  const handleError = useCallback(
    (error: { message: string }) => {
      errorContext.setError(error.message);
      console.log(errorContext.errorMessage);
      navigate(ERROR_ROUTE, { replace: true });
    },
    [errorContext, navigate]
  );

  // main part

  useEffect(() => {
    const doAdminCheck = async () => {
      try {
        const adminCheckResponseDto = (
          await backendAxios.get(BACKEND_ADMIN_CHECK_REQUEST)
        ).data;
        setadminCheckResponse(adminCheckResponseDto);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleError(error as { message: string });
      }
    };

    doAdminCheck();
  }, [handleError]);

  if (loading) return <Loading />;

  if (!adminCheckResponse?.isAdmin) {
    handleError({ message: "You are not an admin" });
  }
  return children;
};

//---------------------------------------------- TODO -----------------------------------------------//
//--------------------------------- Subscriber protection Component ---------------------------------//
//---------------------------------------------- TODO -----------------------------------------------//
