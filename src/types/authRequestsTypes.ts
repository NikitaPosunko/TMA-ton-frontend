export interface TelegramAuthRequestBody {
  initData: string | null;
}

export interface GoogleSignUpRequestBody {
  initData: string | null;
  token: string | null;
}

export interface GoogleLogInRequestBody {
  token: string | null;
}
