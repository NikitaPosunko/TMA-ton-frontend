export const webApp: WebApp | null = window?.Telegram?.WebApp;

export const disableMainButton = () => {
  webApp.MainButton.setText("Main button");
  webApp.MainButton.onClick(() => {});
  webApp.MainButton.hide();
};

export const backButton = webApp.BackButton;
export const mainButton = webApp.MainButton;

export const rowInitData: string | null = webApp?.initData || null;
