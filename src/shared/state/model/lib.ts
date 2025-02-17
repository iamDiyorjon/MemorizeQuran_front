import WebApp from "@twa-dev/sdk";
export const getTelegramId = () => {
  const telegramId = WebApp.initDataUnsafe?.user?.id;
  if (!telegramId) null;
  return telegramId;
};

export const resolveUrl = (base: string, relative: string): string => {
  const baseUrl = new URL(base, window.location.origin);
  const resolvedUrl = new URL(relative, baseUrl);
  const pathname = resolvedUrl.pathname.replace(/\/$/, "");

  return pathname;
};
