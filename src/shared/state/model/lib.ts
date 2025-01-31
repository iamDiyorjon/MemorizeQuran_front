import WebApp from "@twa-dev/sdk";
export const getTelegramId = () => {
  const telegramId = WebApp.initDataUnsafe?.user?.id;
  if (!telegramId) throw new Error("Telegram id not found");
  return telegramId;
};
