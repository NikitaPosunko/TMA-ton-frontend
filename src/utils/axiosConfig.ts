import axios from "axios";
import { BACKEND_BASE_URL } from "../static/url";
import {
  USER_DB_ID_KEY,
  getGoogleAuthToken,
  getTelegramAuthToken,
  getUserDbId,
} from "./localStorageUtils";

// Create an Axios instance
export const backendAxios = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the JWT token in the headers
backendAxios.interceptors.request.use(
  (config) => {
    const googleToken = getGoogleAuthToken();
    const telegramToken = getTelegramAuthToken();
    const userDbId = getUserDbId();

    if (googleToken) {
      config.headers["Authorization"] = `Bearer ${googleToken}`;
    } else if (telegramToken) {
      config.headers["Authorization"] = `Bearer ${telegramToken}`;
    }

    if (userDbId) {
      config.headers[USER_DB_ID_KEY] = userDbId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
