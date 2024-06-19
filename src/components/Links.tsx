import { Link, useNavigate } from "react-router-dom";
import { useErrorContext } from "../contexts/useContext";
import {
  SUBSCRIPTION_PAGE_ROUTE,
  PHOTOS_ROUTE,
  BASE_ROUTE,
  VIDEO_FROM_CAMERA_ROUTE,
} from "../static/routes";

//--------------------------------- Link to subscription page ---------------------------------//

export const LinkToSubscriptionPage = () => {
  return (
    <Link to={SUBSCRIPTION_PAGE_ROUTE} replace={true}>
      Go to Subscription Page
    </Link>
  );
};

//--------------------------------- Link to Photoes Page ---------------------------------//

export const LinkToPhotosPage = () => (
  <Link to={PHOTOS_ROUTE} replace={true}>
    Go to Photos Page
  </Link>
);

//--------------------------------- Link to Login Page ---------------------------------//

export const LinkToLoginPage = () => {
  return (
    <Link to={BASE_ROUTE} replace={true}>
      Go to Login Page
    </Link>
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

export const LinkToVideoFromCameraPage = () => {
  return (
    <Link to={VIDEO_FROM_CAMERA_ROUTE} replace={true}>
      Go to Video From Camera Page
    </Link>
  );
};
