import {
  useErrorContext,
  useTelegramAuthContext,
} from "../contexts/useContext";
import { LogOutFromTelegramButton } from "../components/Components";
import { useNavigate } from "react-router-dom";
import { ERROR_ROUTE } from "../static/routes";
import {
  LinkToVideoFromCameraPage,
  LinkToPhotosPage,
  LinkToSubscriptionPage,
} from "../components/Links";
import { TonConnectPage } from "./tonConnect/TonConnectPage";

export function TelegramLoggedInUser() {
  const telegramAuthContext = useTelegramAuthContext();
  const userInfo = telegramAuthContext.authResponse?.authData?.user;

  const errorContext = useErrorContext();
  const navigate = useNavigate();

  const handleError = (error: { message: string }) => {
    errorContext.setError(error.message);
    navigate(ERROR_ROUTE, { replace: true });
  };

  //if (!userInfo) {
  //  telegramAuthContext.doLogOutFromTelegram();
  //  handleError({ message: `${JSON.stringify(userInfo)}` });
 // } else {
    return (
      <>
        <h2>User Page</h2>
        <p>User authenticated</p>
        <hr />
        <div className="column">
          <LinkToSubscriptionPage />
          <LogOutFromTelegramButton />
          <LinkToVideoFromCameraPage />
          <LinkToPhotosPage />
        </div>
        <hr />
        <h2>Telegram User Info:</h2>

        {/*userInfo.last_name &&*/ <p>User Last Name: {/*userInfo.last_name*/}</p>}
        {/*userInfo.username &&*/ <p>User Username: {/*userInfo.username*/}</p>}
        {/*userInfo.language_code &&*/ (
          <p>User Language Code: {/*userInfo.language_code*/}</p>
        )}
        {/*userInfo.photo_url &&*/ (
          <>
            <p>User Photo URL: {/*userInfo.photo_url*/}</p>
            <img src={/*userInfo.photo_url*/ "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"} alt="profile" />
          </>
        )}
        <p>User Is Bot: {/*userInfo.is_bot ? "Yes" : "No"*/}</p>
        <p>User Is Premium: {/*userInfo.is_premium ? "Yes" : "No"*/}</p>
        <p>
          User Added To Attachment Menu:{" "}
          {/*userInfo.added_to_attachment_menu ? "Yes" : "No"*/}
        </p>
        <p>
          User Allows Write To PM: {/*userInfo.allows_write_to_pm ? "Yes" : "No"*/}
        </p>
      </>
    );
  }
//}
