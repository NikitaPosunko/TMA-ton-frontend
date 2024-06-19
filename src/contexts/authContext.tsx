import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import React, { useEffect, useState } from "react";
import {
  BACKEND_GOOGLE_LOG_IN_REQUEST,
  BACKEND_GOOGLE_SIGN_UP_REQUEST,
  BACKEND_TELEGRAM_LOG_IN_REQUEST,
  BACKEND_TELEGRAM_SIGN_UP_REQUEST,
} from "../static/url";
import { rowInitData } from "../telegram/webApp";
import { Loading } from "../components/Components";
import { useNavigate } from "react-router-dom";
import { useErrorContext } from "./useContext";
import { ERROR_ROUTE, BASE_ROUTE } from "../static/routes";
import {
  GoogleAuthAction,
  clearGoogleAuthAction,
  clearGoogleAuthToken,
  clearTelegramAuthToken,
  clearUserDbId,
  getGoogleAuthAction,
  getGoogleAuthToken,
  isGoogleAuthToken,
  isTelegramTokenExpired,
  setGoogleAuthAction,
  setGoogleAuthToken,
  setTelegramAuthToken,
  setUserDbId,
} from "../utils/localStorageUtils";
import { TelegramAuthResponse } from "../telegram/types/types";
import { backendAxios } from "../utils/axiosConfig";
import { useTonConnectUI } from "@tonconnect/ui-react";

// ------------------------------------------------------------------------------------ //

// ------------------------------------- Google --------------------------------------- //

// Google Auth Context
export const GoogleAuthContext = React.createContext<{
  isUserLoggedIn: boolean;
  doLogInWithGoogle: () => Promise<void>;
  doLogOutFromGoogle: () => Promise<void>;
  doSignUpWithGoogle: () => Promise<void>;
  googleAuthBackendConfirmatin: () => Promise<void>;
  errorMessage: string | null;
  clearErrorMessage: () => void;
  loading: boolean;
}>({
  isUserLoggedIn: false,
  doLogInWithGoogle: async () => {},
  doLogOutFromGoogle: async () => {},
  doSignUpWithGoogle: async () => {},
  googleAuthBackendConfirmatin: async () => {},
  errorMessage: null,
  clearErrorMessage: () => {},
  loading: false,
});

// Google Auth Context Provider
export const GoogleAuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const [tonConnectUI] = useTonConnectUI();
  //
  //const errorContext = useErrorContext();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  //-------------------------------  subscribe to auth state changes  ------------------------------//
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true);

      //----- saving google auth token to local storage -----//
      const token = await user?.getIdToken();
      setGoogleAuthToken(token ?? "");

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  //--------------------------------------  google auth backend confirmation  ------------------------------------//

  const googleAuthBackendConfirmatin = async () => {
    // verify user on backend
    setLoading(true);

    if (isGoogleAuthToken()) {
      const token = getGoogleAuthToken();
      // there is google user logged in vie google auth

      const googleAuthAction = getGoogleAuthAction();

      //------ perform login on backend --------//
      if (googleAuthAction === GoogleAuthAction.LOG_IN) {
        try {
          const response = await backendAxios.post(
            BACKEND_GOOGLE_LOG_IN_REQUEST,
            {
              token: token,
            }
          );
          if (!response.data) {
            // response doesn't have data

            setErrorMessage("Something went wrong. Please try again 1");
            //setLoading(false);
          } else if (response.data.needsSignUp) {
            // user needs to sign up

            setErrorMessage("You need to sign up");
            //setLoading(false);
          } else if (response.data.email === auth.currentUser?.email) {
            // log in success

            setIsUserLoggedIn(true);
            setUserDbId(response.data.userDbId);
            clearGoogleAuthAction();
          } else {
            // log in fail

            setErrorMessage("Something went wrong. Please try again 2");
            //setLoading(false);
          }
        } catch (error) {
          // login fail

          setErrorMessage((error as Error).message);
          //setLoading(false);
        }
      } // --------------- end of if (isLogInButtonPressed)

      //------ perform signup on backend --------//
      else if (googleAuthAction === GoogleAuthAction.SIGN_UP) {
        try {
          const response = await backendAxios.post(
            BACKEND_GOOGLE_SIGN_UP_REQUEST,
            {
              token: token,
            }
          );
          if (!response.data) {
            // response doesn't have data

            setErrorMessage("Something went wrong. Please try again 1");
            //setLoading(false);
          } else if (response.data.alreadySignedUp) {
            // user already signed up

            setErrorMessage("User already signed up");
            //setLoading(false);
          } else if (response.data.email === auth.currentUser?.email) {
            // sign up success

            setIsUserLoggedIn(true);
            setUserDbId(response.data.userDbId);
            clearGoogleAuthAction();
          } else {
            // sign up fail

            setErrorMessage("Something went wrong. Please try again 2");
            //setLoading(false);
          }
        } catch (error) {
          // sign up fail

          setErrorMessage((error as Error).message);
          //setLoading(false);
        }
      } //--------------------- end of if (isSignUpButtonPressed)
    } // -------- end of if (isGoogleAuthToken())

    setLoading(false);
  };

  // -------------------------- HELPER ----- google sign in with redirect  ----------------------------//

  const googleSignInWithRedirect = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  //--------------------------------------  google sign up  ------------------------------------//
  const doSignUpWithGoogle = async () => {
    setLoading(true);

    setGoogleAuthAction(GoogleAuthAction.SIGN_UP);

    if (isGoogleAuthToken() === false) {
      await googleSignInWithRedirect();
    }

    setLoading(false);
    // The onAuthStateChanged listener will update the isUserLoggedIn state
  };

  //--------------------------------------  google log in  ------------------------------------//
  const doLogInWithGoogle = async () => {
    setLoading(true);

    setGoogleAuthAction(GoogleAuthAction.LOG_IN);

    if (isGoogleAuthToken() === false) {
      await googleSignInWithRedirect();
    }

    setLoading(false);
    // The onAuthStateChanged listener will update the isUserLoggedIn state
  };

  // google log out
  const doLogOutFromGoogle = async () => {
    setLoading(true);

    clearGoogleAuthToken();
    clearUserDbId();
    tonConnectUI.disconnect();
    try {
      await signOut(auth);
    } catch (error) {
      setErrorMessage((error as Error).message);
    }

    setIsUserLoggedIn(false);
    setLoading(false);
  };

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  const value = {
    isUserLoggedIn,
    doLogInWithGoogle,
    doLogOutFromGoogle,
    doSignUpWithGoogle,
    googleAuthBackendConfirmatin,
    //needGoogleAuthBackendConfirmation,
    errorMessage,
    clearErrorMessage,
    loading,
  };

  return (
    <GoogleAuthContext.Provider value={value}>
      {loading ? <Loading /> : children}
    </GoogleAuthContext.Provider>
  );
};

//---------------------------------- Telegram ------------------------------------------//

// Telegram Auth Context
export const TelegramAuthContext = React.createContext<{
  authResponse: TelegramAuthResponse | null;
  doLogInWithTelegram: () => Promise<void>;
  doLogOutFromTelegram: () => Promise<void>;
  doSignUpWithTelegram: () => Promise<void>;
  loading: boolean;
}>({
  authResponse: null,
  doLogInWithTelegram: async () => {},
  doLogOutFromTelegram: async () => {},
  doSignUpWithTelegram: async () => {},
  loading: false,
});

// Telegram Auth Context Provider
export const TelegramAuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authResponse, setAuthResponse] = useState<TelegramAuthResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const [tonConnectUI] = useTonConnectUI();

  // error handling
  const errorContext = useErrorContext();
  const navigate = useNavigate();

  const handleError = (error: { message: string }) => {
    setLoading(false);
    errorContext.setError(error.message);
    navigate(ERROR_ROUTE, { replace: true });
  };

  // telegram log in
  const doLogInWithTelegram = async () => {
    // loading indicator
    setLoading(true);

    if (isTelegramTokenExpired() === false) {
      // if token is fresh i.e. user is logged in, don't do anything
      setLoading(false);
      return;
    }

    // if token is not fresh i.e. user is not logged in, do login
    backendAxios
      .post(BACKEND_TELEGRAM_LOG_IN_REQUEST, { initData: rowInitData })
      .then((response) => {
        setLoading(false);
        if (response?.data) {
          if (response.data.needsSignUp === false) {
            setAuthResponse(response.data);
            setTelegramAuthToken(response.data.token ?? "");
            setUserDbId(response.data.userDbId ?? "");
          } else {
            handleError({ message: "You are not signed up" });
          }
        } else {
          handleError({ message: "You are not from telegram" });
        }
      })
      .catch((error) => {
        handleError(error);
      });
  };

  // telegram log out
  const doLogOutFromTelegram = async () => {
    clearTelegramAuthToken();
    clearUserDbId();
    setAuthResponse(null);

    tonConnectUI.disconnect();

    // navigate to login page
    navigate(BASE_ROUTE, { replace: true });
  };

  // telegram sign up
  const doSignUpWithTelegram = async () => {
    setLoading(true);
    backendAxios
      .post(BACKEND_TELEGRAM_SIGN_UP_REQUEST, { initData: rowInitData })
      .then((response) => {
        setLoading(false);
        if (response?.data) {
          if (response.data.alreadySignedUp === false) {
            setAuthResponse(response.data);
            setTelegramAuthToken(response.data.token ?? "");
            setUserDbId(response.data.userDbId ?? "");
          } else {
            handleError({ message: "You are already signed up" });
          }
        } else {
          handleError({ message: "You are not from telegram" });
        }
      })
      .catch((error) => {
        setLoading(false);
        handleError(error);
      });
  };

  const value = {
    authResponse: authResponse,
    doLogInWithTelegram,
    doLogOutFromTelegram,
    doSignUpWithTelegram,
    loading,
  };

  return (
    <TelegramAuthContext.Provider value={value}>
      {/* {children} */}
      {loading ? <Loading /> : children}
    </TelegramAuthContext.Provider>
  );
};
