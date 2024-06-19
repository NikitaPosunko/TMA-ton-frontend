export interface TelegramAuthResponse {
  token?: string;
  authData?: WebAppInitData;
  needsSignUp?: boolean;
}
