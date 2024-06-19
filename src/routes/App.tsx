import "../App.css";
import { useEffect } from "react";
import { webApp } from "../telegram/webApp";
import {
  GoogleAuthContextProvider,
  TelegramAuthContextProvider,
} from "../contexts/authContext";
import { Outlet } from "react-router-dom";
import { ErrorContextProvider } from "../contexts/errorContext";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { BASE_HTTPS_URL } from "../static/url";

export const App = () => {
  useEffect(() => {
    // Initialize the Telegram Web App
    if (webApp) {
      webApp.ready();
    } else {
      throw new Error("You are not from telegram");
    }
  }, []);

  return (
    // context for error handling
    <ErrorContextProvider>
      {/* context for tonconnect handling */}
      <TonConnectUIProvider
        manifestUrl={`${BASE_HTTPS_URL}/tonconnect-manifest.json`}
      >
        {/* context for telegram auth handling */}
        <TelegramAuthContextProvider>
          {/* context for google auth handling */}
          <GoogleAuthContextProvider>
            <Outlet />
          </GoogleAuthContextProvider>
        </TelegramAuthContextProvider>
      </TonConnectUIProvider>
    </ErrorContextProvider>
  );
};
