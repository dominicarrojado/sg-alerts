import { Environment } from "./enums";
import { MAIN_URL } from "./constants";

export function getAssetUrl(path: string) {
  return process.env.NODE_ENV === Environment.Production
    ? `${MAIN_URL}${path}`
    : `/${path}`;
}
