// frontend url
export const BASE_URL = "http://localhost:5173";

// frontend https url
//export const BASE_HTTPS_URL = "https://adapted-worm-one.ngrok-free.app";
export const BASE_HTTPS_URL = "https://curious-serval-usable.ngrok-free.app";

// backend

export const BACKEND_BASE_LOCAL_URL = "http://localhost:3000";

export const BACKEND_BASE_URL = BACKEND_BASE_LOCAL_URL;

// BACKEND API REQUESTS

// admin check

export const BACKEND_ADMIN_CHECK_REQUEST = `/auth/admin-check`;

// telegram

export const BACKEND_TELEGRAM_LOG_IN_REQUEST = `/auth/telegram-log-in`;

export const BACKEND_TELEGRAM_SIGN_UP_REQUEST = `/auth/telegram-sign-up`;

// google

export const BACKEND_GOOGLE_LOG_IN_REQUEST = `/auth/google-log-in`;

export const BACKEND_GOOGLE_SIGN_UP_REQUEST = `/auth/google-sign-up`;

// subscription

export const BACKEND_SUBSCRIPTION_PLANS_REQUEST = `/subscription/get-plans`;

export const BACKEND_SUBSCRIPTION_STATUS_REQUEST = `/subscription/get-subscription-status`;

export const BACKEND_USER_WALLET_CONFIRMATION_REQUEST = `/subscription/user-wallet-confirmation`;

export const BACKEND_GET_ACTIVE_ADMIN_CONFIG_REQUEST = `/subscription/active-admin-config`;

export const BACKEND_MAKE_SUBSCRIPTION_REQUEST = `/subscription/make-subscription`;

export const BACKEND_USER_BALANCE_REQUEST = `/subscription/user-balance`;

// subscribed user

// auth guard test
export const BACKEND_SUBSCRIPTION_PHOTOS_REQUEST = `/subscription/photos`;

// subscriber guard test
export const BACKEND_SUBSCRIBER_PROTECTED_ROUTE_REQUEST = `/subscription/subscriber-protected-route`;

// subscription-admin

export const BACKEND_GET_ADMIN_CONFIG_REQUEST = `/subscription/admin-wallet`;

export const BACKEND_SET_ADMIN_CONFIG_REQUEST = `/subscription/set-admin-wallet`;

// photo

export const BACKEND_UPLOAD_IMAGE_REQUEST = `/bot/upload-image`;
