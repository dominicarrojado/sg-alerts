import { TELEGRAM_SHORT_URL } from "./constants";

export function getTelegramChannelUrl(id: string) {
  return `${TELEGRAM_SHORT_URL}/${id}`;
}
