import {
    LinkToLoginPage,
    LinkToPhotosPage,
    LinkToSubscriptionPage,
    LinkToSubscriptionAdminPage,
    GoToBasePageAndClearErrorContext,
    LinkToVideoFromCameraPage,
    LinkToErrorPage,
    LinkToGoogleUserPage,
    LinkToTelegramUserPage
} from "../components/Links.tsx";
import { TEMP } from "../static/routes.tsx";
import { webApp } from "../telegram/webApp.ts";


const Temp = () => {
    webApp?.BackButton.hide();

    return <>
        <div>
            Temp page
        </div>
        <LinkToLoginPage />
        <br />
        <br />
        <LinkToPhotosPage lastPage={TEMP} />
        <br />
        <br />
        <LinkToSubscriptionPage lastPage={TEMP} />
        <br />
        <br />
        <LinkToSubscriptionAdminPage lastPage={TEMP} />
        <br />
        <br />
        <GoToBasePageAndClearErrorContext />
        <br />
        <br />
        <LinkToVideoFromCameraPage lastPage={TEMP} />
        <br />
        <br />
        <LinkToErrorPage />
        <br />
        <br />
        <LinkToGoogleUserPage />
        <br />
        <br />
        <LinkToTelegramUserPage />
    </>
}

export default Temp;