import {
  useErrorContext,
  useTelegramAuthContext,
} from "../contexts/useContext";
import { Loading, LogOutFromTelegramButton } from "../components/Components";
import { useNavigate } from "react-router-dom";
import { ERROR_ROUTE } from "../static/routes";
import {
  LinkToVideoFromCameraPage,
  LinkToPhotosPage,
  LinkToSubscriptionPage,
} from "../components/Links";
import { TELEGRAM_USER_ROUTE } from "../static/routes";
import { webApp } from "../telegram/webApp";
import { useCallback, useEffect, useState } from "react";

export function TelegramLoggedInUser() {
  const [loading, setLoading] = useState(true);
  const telegramAuthContext = useTelegramAuthContext();
  //const userInfo = telegramAuthContext.authResponse?.authData?.user;

  const [userInfo, setUserInfo] = useState<WebAppUser | undefined>(
    telegramAuthContext.authResponse?.authData?.user
  );

  const errorContext = useErrorContext();
  const navigate = useNavigate();

  const handleError = useCallback(
    (error: { message: string }) => {
      errorContext.setError(error.message);
      navigate(ERROR_ROUTE, { replace: true });
    },
    [errorContext, navigate]
  );

  useEffect(() => {
    // if user was logged in before closing mini app
    // then refetch telegram user info
    async function refreshTelegramUserInfo() {
      if (!userInfo) {
        try {
          await telegramAuthContext.doLogInWithTelegram();
          setUserInfo(telegramAuthContext.authResponse?.authData?.user);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          handleError({ message: (error as Error).message });
        }
      } else {
        setLoading(false);
      }
    }

    refreshTelegramUserInfo();

    //setLoading(false);
  });

  if (loading) {
    return <Loading />;
  }

  webApp?.BackButton.hide();

  if (!userInfo) {
    telegramAuthContext.doLogOutFromTelegram();
    handleError({ message: `no telegram user info` });
  } else {
    return (
      <div className="page">
        <h2>User Page</h2>
        <p>User authenticated</p>
        <hr />
        <div className="column">
          <LinkToSubscriptionPage lastPage={TELEGRAM_USER_ROUTE}/>
        </div>
        <hr />
        <h2>Telegram User Info:</h2>

        {userInfo.last_name && <p>User Last Name: {userInfo.last_name}</p>}
        {userInfo.username && <p>User Username: {userInfo.username}</p>}
        {userInfo.language_code && (
          <p>User Language Code: {userInfo.language_code}</p>
        )}
        {userInfo.photo_url && (
          <>
            <p>User Photo URL: {userInfo.photo_url}</p>
            <img src={userInfo.photo_url} alt="profile" />
          </>
        )}
        <p>User Is Bot: {userInfo.is_bot ? "Yes" : "No"}</p>
        <p>User Is Premium: {userInfo.is_premium ? "Yes" : "No"}</p>
        <p>
          User Added To Attachment Menu:{" "}
          {userInfo.added_to_attachment_menu ? "Yes" : "No"}
        </p>
        <p>
          User Allows Write To PM: {userInfo.allows_write_to_pm ? "Yes" : "No"}
        </p>
        <div style={{width: "68vw"}}>
          <LinkToVideoFromCameraPage lastPage={TELEGRAM_USER_ROUTE} />
          <LinkToPhotosPage lastPage={TELEGRAM_USER_ROUTE} />
          <LogOutFromTelegramButton />
        </div>
      </div>
    );
  }
}
