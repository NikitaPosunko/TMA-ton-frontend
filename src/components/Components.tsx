import { useNavigate } from "react-router-dom";
import {
  useGoogleAuthContext,
  useTelegramAuthContext,
} from "../contexts/useContext";
import { BASE_ROUTE } from "../static/routes";
import Button from "@mui/material/Button";

//--------------------------------- Loading Component ---------------------------------//

export const Loading = () => {
  return <h2>🌀 Loading...</h2>;
};

//----------------------------------  auth button blueprint  ------------------------------------//
export const AuthButton = ({
  imageSrc,
  onClick,
  buttonText,
}: {
  imageSrc: string;
  onClick: () => void;
  buttonText: string;
}) => {
  return (
    <Button
      variant="outlined"
      onClick={() => {
        onClick();
      }}
      startIcon={
        <img
          src={imageSrc}
          alt="Telegram"
          style={{ width: "24px", height: "24px" }}
        />
      }
      sx={{
        mt: 2,
        backgroundColor: "var(--tg-theme-section-bg-color)",
        color: "var(--tg-theme-text-color)",
        width: "100%",
        borderColor: "var(--tg-theme-button-color)",
        //
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start", // Align content to the left
        textAlign: "left", // Align text to the left
        p: 2, // Add padding for spacing
        '&:hover': {
          backgroundColor: "var(--tg-theme-secondary-bg-color)",
          borderColor: "var(--tg-theme-link-color)",
          opacity: "0.7"
        },
      }}
    >
      {buttonText}
    </Button>
  );
};

//------------------------------------ TELEGRAM auth buttons ------------------------------------//

// button for sign up with telegram
export const SignUpWithTelegramButton = () => {
  const telegramAuthContext = useTelegramAuthContext();
  return (
    <AuthButton
      imageSrc="img/TelegramLogo.png"
      onClick={() => {
        telegramAuthContext.doSignUpWithTelegram();
      }}
      buttonText="Sign up with Telegram"
    />
  );
};

// button for login with telegram
export const LogInWithTelegramButton = () => {
  const telegramAuthContext = useTelegramAuthContext();
  return (
    <AuthButton
      imageSrc="img/TelegramLogo.png"
      onClick={() => {
        telegramAuthContext.doLogInWithTelegram();
      }}
      buttonText="Log in with Telegram"
    />
  );
};

//----- button for logout from telegram -----//
export const LogOutFromTelegramButton = () => {
  const telegramAuthContext = useTelegramAuthContext();

  return (
    <AuthButton
      imageSrc="img/TelegramLogo.png"
      onClick={() => {
        telegramAuthContext.doLogOutFromTelegram();
      }}
      buttonText="Log out from Telegram"
    />
  );
};

//------------------------------------ GOOGLE auth buttons ------------------------------------//

// button for sign up with google
export const SignUpWithGoogleButton = () => {
  const googleAuthContext = useGoogleAuthContext();

  return (
    <AuthButton
      imageSrc="img/GoogleLogo.png"
      onClick={() => {
        googleAuthContext.doSignUpWithGoogle();
      }}
      buttonText="Sign up with Google"
    />
  );
};

// button for login with google
export const LogInWithGoogleButton = () => {
  const googleAuthContext = useGoogleAuthContext();

  return (
    <AuthButton
      imageSrc="img/GoogleLogo.png"
      onClick={() => {
        googleAuthContext.doLogInWithGoogle();
      }}
      buttonText="Log in with Google"
    />
  );
};

// button for logout from google
export const LogOutFromGoogleButton = () => {
  const googleAuthContext = useGoogleAuthContext();
  const navigate = useNavigate();

  return (
    <AuthButton
      imageSrc="img/GoogleLogo.png"
      onClick={() => {
        googleAuthContext.doLogOutFromGoogle();
        navigate(BASE_ROUTE);
      }}
      buttonText="Log out from Google"
    />
  );
};

//------------------------------------ ADMIN set admin wallet button ------------------------------------//

export const SetAdminWalletButton = () => {
  //const navigate = useNavigate();
  return (
    <Button variant="outlined" onClick={() => {}}>
      Set admin wallet
    </Button>
  );
};
