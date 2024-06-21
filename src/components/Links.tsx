import { /*Link,*/ useNavigate } from "react-router-dom";
import { useErrorContext } from "../contexts/useContext";
import {
  SUBSCRIPTION_PAGE_ROUTE,
  SUBSCRIPTION_ADMIN_PAGE_ROUTE,
  PHOTOS_ROUTE,
  BASE_ROUTE,
  VIDEO_FROM_CAMERA_ROUTE,
  TELEGRAM_USER_ROUTE,
  GOOGLE_USER_ROUTE,
  ERROR_ROUTE,
} from "../static/routes";
import { addToHistoryPage } from "../utils/localStorageUtils";
import React from "react";


interface LastPageProps {
  lastPage: string;
}

//--------------------------------- Link to subscription page ---------------------------------//

export const LinkToSubscriptionPage : React.FC<LastPageProps>  = ({lastPage}) => {
  const navigate = useNavigate();
  const errorContext = useErrorContext();
  return (
    <button
      onClick={() => {
        addToHistoryPage(lastPage);
        errorContext.setError(null);
        navigate(SUBSCRIPTION_PAGE_ROUTE, { replace: true });
      }}
    >
      Go to Subscription Page
    </button>
  );
};

//--------------------------------- Link to Photoes Page ---------------------------------//

export const LinkToPhotosPage : React.FC<LastPageProps>  = ({lastPage}) => {
  const navigate = useNavigate();
  const errorContext = useErrorContext();

  return (
    <button
      onClick={() => {
        addToHistoryPage(lastPage);
        errorContext.setError(null);
        navigate(PHOTOS_ROUTE, { replace: true });
      }}
    >
      Go to Photos Page
    </button>
  );
};


//--------------------------------- Link to Login Page ---------------------------------//

export const LinkToLoginPage = () => {
  const navigate = useNavigate();
  const errorContext = useErrorContext();
  return (
    <button
      onClick={() => {
        errorContext.setError(null);
        navigate(BASE_ROUTE, { replace: true });
      }}
    >
      Go to Login Page
    </button>
  );
};

//------------------------------ Go to base page and clear error context ------------------------------//

export const GoToBasePageAndClearErrorContext = () => {
  const navigate = useNavigate();
  const errorContext = useErrorContext();
  return (
    <button
      onClick={() => {
        errorContext.setError(null);
        navigate(BASE_ROUTE, { replace: true });
      }}
    >
      Go to Base Page
    </button>
  );
};

//--------------------------------- Link to Video From Camera Page ---------------------------------//

export const LinkToVideoFromCameraPage : React.FC<LastPageProps>  = ({lastPage}) => {
  const navigate = useNavigate();
  const errorContext = useErrorContext();
  return (
    <button
      onClick={() => {
        addToHistoryPage(lastPage);
        errorContext.setError(null);
        navigate(VIDEO_FROM_CAMERA_ROUTE, { replace: true });
      }}
    >
      Go to Video From Camera Page
    </button>
  );
};



export const LinkToTelegramUserPage = () => {
  const navigate = useNavigate();
  const errorContext = useErrorContext();
  return (
    <button
      onClick={() => {
        errorContext.setError(null);
        navigate(TELEGRAM_USER_ROUTE, { replace: true });
      }}
    >
      Go to Telegram User Page
    </button>
  );
};



export const LinkToGoogleUserPage = () => {
  const navigate = useNavigate();
  const errorContext = useErrorContext();
  return (
    <button
      onClick={() => {
        errorContext.setError(null);
        navigate(GOOGLE_USER_ROUTE, { replace: true });
      }}
    >
      Go to Google User
    </button>
  );
};



export const LinkToErrorPage = () => {
  const navigate = useNavigate();
  const errorContext = useErrorContext();
  return (
    <button
      onClick={() => {
        errorContext.setError(null);
        navigate(ERROR_ROUTE, { replace: true });
      }}
    >
      Go to Error page
    </button>
  );
};



export const LinkToSubscriptionAdminPage : React.FC<LastPageProps>  = ({lastPage}) => {
  const navigate = useNavigate();
  const errorContext = useErrorContext();
  return (
    <button
      onClick={() => {
        addToHistoryPage(lastPage);
        errorContext.setError(null);
        navigate(SUBSCRIPTION_ADMIN_PAGE_ROUTE, { replace: true });
      }}
    >
      Go to Subscription Admin page
    </button>
  );
};