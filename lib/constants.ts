import {
  CdcService,
  JapanVisaType,
  Routes,
  SsdcService,
  SubscriptionTopic,
  TelegramChannel,
} from "./enums";

export const OWNER_NAME = "Dominic Arrojado";
export const OWNER_WEBSITE = "https://dominicarrojado.com";
export const OWNER_EMAIL = "dominicarrojado@gmail.com";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const SITE_NAME = "SG Alerts";
export const MAIN_TITLE = `${SITE_NAME} | ${OWNER_NAME}`;
export const MAIN_DESCRIPTION =
  "Subscribe to all things Singapore. Save time. Stay updated.";
export const MAIN_ORIGIN = "https://dominicarrojado.com";
export const MAIN_PATH = "/sg-alerts";
export const MAIN_URL = `${MAIN_ORIGIN}${MAIN_PATH}/`;
export const MAIN_IMAGE = `${MAIN_URL}og-image.png`;

export const ROUTES_WITH_NO_TITLE = [
  Routes.Home,
  Routes.Subscribe,
  Routes.Settings,
];

export const PH_ALERTS_URL = `${MAIN_ORIGIN}/ph-alerts/`;
export const PH_ALERTS_CEBU_PACIFIC_URL = `${PH_ALERTS_URL}topics/cebu-pacific-flights/`;

export const JAPAN_VISA_TYPES = Object.values(JapanVisaType);
export const JAPAN_VISA_TYPES_LENGTH = JAPAN_VISA_TYPES.length;

export const CDC_SERVICES = Object.values(CdcService);
export const CDC_SERVICES_LENGTH = CDC_SERVICES.length;

export const SSDC_SERVICES = Object.values(SsdcService);
export const SSDC_SERVICES_LENGTH = SSDC_SERVICES.length;

export const TELEGRAM_SHORT_URL = "https://t.me";

export const SUBSCRIBE_FORM_ID = "subscribe-form";

export const NOW_AVAILABLE_TEXT = "now available";

export const SUBSCRIPTION_TOPICS = Object.values(SubscriptionTopic);

export const TELEGRAM_CHANNELS = Object.values(TelegramChannel);

export const TOPICS_COUNT =
  SUBSCRIPTION_TOPICS.length + TELEGRAM_CHANNELS.length - 2; // exclude SG Alerts new features topic

export const TOAST_DURATION = 60000; // 1 minute

export const GOOGLE_ADSENSE_CLIENT_ID = "ca-pub-3632473845121107";
