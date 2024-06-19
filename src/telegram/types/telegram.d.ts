interface WebAppUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
  photo_url?: string;
}

interface WebAppInitData {
  user?: WebAppUser;
  auth_date: number;
  query_id?: string;
}

interface WebApp {
  ready: () => void;
  initData: string;
  initDataUnsafe: WebAppInitData;
}

interface Window {
  Telegram: {
    WebApp: WebApp;
  };
}
