export const webApp: WebApp | null = window?.Telegram?.WebApp;
export const rowInitData: string | null = webApp?.initData || null;