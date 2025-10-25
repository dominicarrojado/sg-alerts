import { Routes, SubscriptionTopic, TelegramChannel } from "./enums";

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

export const TELEGRAM_SHORT_URL = "https://t.me";

export const SUBSCRIBE_FORM_ID = "subscribe-form";

export const NOW_AVAILABLE_TEXT = "now available";

export const SUBSCRIPTION_TOPICS = Object.values(SubscriptionTopic);

export const INACTIVE_SUBSCRIPTION_TOPICS_INACTIVE = [
  SubscriptionTopic.JapanVisaBusiness,
  SubscriptionTopic.MoviesTheProjector,
  SubscriptionTopic.MoviesCathayCineplexes,
  SubscriptionTopic.SsdcEnrolmentWeekend,
  SubscriptionTopic.SsdcForeignLicenceWeekend,
  SubscriptionTopic.SsdcOtherCoursesEnrolment,
];

export const TELEGRAM_CHANNELS = Object.values(TelegramChannel);

export const INACTIVE_TELEGRAM_CHANNELS = [
  TelegramChannel.CdcLessonsAutoCarTampines,
  TelegramChannel.CdcLessonsClass2,
  TelegramChannel.CdcLessonsClass2A,
  TelegramChannel.CdcLessonsClass2B,
  TelegramChannel.CdcSimulatorBike,
  TelegramChannel.CdcSimulatorCar,
  TelegramChannel.CdcTestsAutoCar,
  TelegramChannel.CdcTestsClass2B,
  TelegramChannel.CdcTestsManualCar,
  TelegramChannel.CdcTestsPrivate,
  TelegramChannel.JapanVisaOthers,
  TelegramChannel.JapanVisaTourism,
  TelegramChannel.JetstarFlights,
  TelegramChannel.SsdcPracticalLessonBooking,
  TelegramChannel.SsdcPrivateLearners,
];

export const TOPICS_COUNT =
  SUBSCRIPTION_TOPICS.length +
  TELEGRAM_CHANNELS.length -
  INACTIVE_SUBSCRIPTION_TOPICS_INACTIVE.length -
  INACTIVE_TELEGRAM_CHANNELS.length -
  2; // exclude SG Alerts new features topic (both email and telegram)

export const TOAST_DURATION = 60000; // 1 minute

export const GOOGLE_ADSENSE_CLIENT_ID = "ca-pub-3632473845121107";
