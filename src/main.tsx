import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RouterErrorPage from "./components/error/RouterErrorPage.tsx";
import { TelegramLoggedInUser } from "./routes/TelegramLoggedInUser.tsx";
import { GoogleLoggedInUser } from "./routes/GoogleLoggedInUser.tsx";
import { App } from "./routes/App.tsx";
import {
  BASE_ROUTE,
  ERROR_ROUTE,
  GOOGLE_USER_ROUTE,
  PHOTOS_ROUTE,
  SUBSCRIBER_PROTECTED_ROUTE,
  SUBSCRIPTION_ADMIN_PAGE_ROUTE,
  SUBSCRIPTION_PAGE_ROUTE,
  TELEGRAM_USER_ROUTE,
  TEST_HOME_ROUTE,
  VIDEO_FROM_CAMERA_ROUTE,
  TEMP,
} from "./static/routes.tsx";

import { Login } from "./routes/Login.tsx";

import { ErrorPageWithMessage } from "./components/error/ErrorPageWithMessage.tsx";
import { VideoFromCamera } from "./routes/VideoFromCamera.tsx";
import { Photos } from "./routes/Photos.tsx";
import { AuthPage } from "./routes/AuthPage.tsx";
import { TonConnectPage } from "./routes/tonConnect/TonConnectPage.tsx";
import { SubscriptionAdminPage } from "./routes/SubscriptionAdminPage.tsx";
import Temp from "./routes/Temp.tsx";
import {
  AdminProtection,
  LoginProtection,
} from "./components/ProtectionComponents.tsx";
import { SubscriberProtectedPage } from "./routes/SubscriberProtectedPage.tsx";
import Camera from "./components/Camera/Camera.tsx";

// Create router
const router = createBrowserRouter([
  {
    path: TEMP,
    element: <App />,
    errorElement: <RouterErrorPage />,
    children: [
      {
        path: ERROR_ROUTE,
        element: <ErrorPageWithMessage />,
      },
      {
        index: true,
        element: <Temp />,
      },
      {
        path: BASE_ROUTE,
        element: <Login />,
      },
      {
        path: TELEGRAM_USER_ROUTE,
        element: <TelegramLoggedInUser />,
      },
      {
        path: GOOGLE_USER_ROUTE,
        element: <GoogleLoggedInUser />,
      },
      {
        path: VIDEO_FROM_CAMERA_ROUTE,
        element: (
          <LoginProtection>
            <Camera />
            {/* <VideoFromCamera /> */}
          </LoginProtection>
        ),
      },
      {
        path: PHOTOS_ROUTE,
        element: <Photos />,
      },
      {
        path: TEST_HOME_ROUTE,
        element: <AuthPage />,
      },
      {
        path: SUBSCRIPTION_PAGE_ROUTE,
        element: (
          <LoginProtection>
            <TonConnectPage />
          </LoginProtection>
        ),
      },
      {
        path: SUBSCRIPTION_ADMIN_PAGE_ROUTE,
        element: (
          <LoginProtection>
            <AdminProtection>
              <SubscriptionAdminPage />
            </AdminProtection>
          </LoginProtection>
        ),
      },
      {
        path: SUBSCRIBER_PROTECTED_ROUTE,
        element: <SubscriberProtectedPage />,
      },
      {
        path: "*",
        element: <RouterErrorPage />,
      },
    ],
  },
]);

// Render
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
