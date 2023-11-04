import { Routes } from "./enums";

export const OWNER_NAME = "Dominic Arrojado";
export const OWNER_WEBSITE = "https://dominicarrojado.com";
export const OWNER_EMAIL = "dominicarrojado@gmail.com";
export const OWNER_DONATION_LINK =
  "https://www.paypal.com/paypalme/DominicArrojado";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const SITE_NAME = "SG Alerts";
export const MAIN_TITLE = `${SITE_NAME} | ${OWNER_NAME}`;
export const MAIN_DESCRIPTION =
  "Subscribe to all things Singapore. Save time. Stay updated.";
export const MAIN_ORIGIN = "https://dominicarrojado.com";
export const MAIN_URL = `${MAIN_ORIGIN}/sg-alerts/`;
export const MAIN_IMAGE = `${MAIN_ORIGIN}/images/og-image.png`;

export const ROUTES_WITH_NO_TITLE = [
  Routes.Home,
  Routes.Subscribe,
  Routes.Settings,
];

export const PH_ALERTS_URL = `${MAIN_ORIGIN}/ph-alerts/`;
export const PH_ALERTS_CEBU_PACIFIC_URL = `${PH_ALERTS_URL}topics/cebu-pacific-flights/`;
