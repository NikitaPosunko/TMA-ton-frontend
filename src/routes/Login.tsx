import { Navigate } from "react-router-dom";
import {
  Loading,
  LogInWithGoogleButton,
  LogInWithTelegramButton,
  LogOutFromGoogleButton,
  SignUpWithGoogleButton,
  SignUpWithTelegramButton,
} from "../components/Components";
import {
  ERROR_ROUTE,
  GOOGLE_USER_ROUTE,
  TELEGRAM_USER_ROUTE,
  BASE_ROUTE
} from "../static/routes";
import { auth } from "../firebase/firebaseConfig";
import {
  clearGoogleAuthAction,
  isGoogleAuthAction,
  isTelegramTokenExpired,
} from "../utils/localStorageUtils";
import { useEffect, /*useRef,*/ useState } from "react";
import { useErrorContext, useGoogleAuthContext } from "../contexts/useContext";
import {
  LinkToVideoFromCameraPage,
  LinkToPhotosPage,
} from "../components/Links";

export const Login = () => {
  const [loading, setLoading] = useState(true);
  const googleAuthContext = useGoogleAuthContext();
  const errorContext = useErrorContext();

  // TODO
  //const isAlreadyRendered = useRef(false); // Track the first render

  useEffect(() => {
    // TODO
    // if (isAlreadyRendered.current === true) {
    //   return;
    // }

    if (isGoogleAuthAction()) {
      googleAuthContext.googleAuthBackendConfirmatin().then(() => {
        clearGoogleAuthAction();
        setLoading(false);
      });
    } else {
      setLoading(false);
    }

    // TODO
    //isAlreadyRendered.current = true;
  }, [googleAuthContext]);

  useEffect(() => {
    if (googleAuthContext.errorMessage !== null) {
      googleAuthContext.clearErrorMessage();

      googleAuthContext.doLogOutFromGoogle().then(() => {
        errorContext.setError(googleAuthContext.errorMessage);
        console.log(errorContext.errorMessage);
      });
    }
  }, [errorContext, googleAuthContext]);

  if (loading) return <Loading />;

  if (errorContext.errorMessage !== null && errorContext.errorMessage !== "") {
    return <Navigate to={ERROR_ROUTE} replace={true} />;
  }

  if (isTelegramTokenExpired() === false) {
    return <Navigate to={TELEGRAM_USER_ROUTE} replace={true} />;
  }

  if (
    auth.currentUser &&
    isGoogleAuthAction() === false &&
    googleAuthContext.errorMessage === null
  ) {
    return <Navigate to={GOOGLE_USER_ROUTE} replace={true} />;
  }

  return (
    <div className="page">
      <p>{googleAuthContext.errorMessage}</p>
      <h2>This is main page</h2>
      <div className="column">
        <hr />
        <SignUpWithTelegramButton />
        <SignUpWithGoogleButton />
        <hr />
        <LogInWithTelegramButton />
        <LogInWithGoogleButton />
        <LogOutFromGoogleButton />
        <hr />
        <LinkToVideoFromCameraPage lastPage={BASE_ROUTE}/>
        <LinkToPhotosPage lastPage={BASE_ROUTE} />
      </div>
    </div>
  );
};
