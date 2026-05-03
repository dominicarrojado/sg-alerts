import {
  DepositRateBank,
  Routes,
  SubscriptionTopic,
  TelegramChannel,
} from "./enums";
import type { DepositRatesChartRange } from "./types";

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

export const DEPOSIT_RATES_CHART_COLORS = [
  "hsl(217, 91%, 60%)",
  "hsl(0, 84%, 60%)",
  "hsl(158, 64%, 52%)",
  "hsl(38, 92%, 50%)",
  "hsl(258, 90%, 66%)",
  "hsl(330, 81%, 60%)",
  "hsl(174, 84%, 40%)",
  "hsl(25, 95%, 53%)",
  "hsl(192, 91%, 45%)",
  "hsl(84, 81%, 44%)",
];

export const DEPOSIT_RATES_BANK_PRIMARY_COLORS: Record<
  DepositRateBank,
  string
> = {
  [DepositRateBank.DBS]: "#EE1C18",
  [DepositRateBank.OCBC]: "#CB2D3E",
  [DepositRateBank.UOB]: "#005EB8",
  [DepositRateBank.STANDARD_CHARTERED]: "#38D200",
  [DepositRateBank.HSBC]: "#DB0011",
  [DepositRateBank.CITIBANK]: "#007AFF",
  [DepositRateBank.MAYBANK]: "#FFC83D",
  [DepositRateBank.CIMB]: "#C4161C",
  [DepositRateBank.BANK_OF_CHINA]: "#A71930",
  [DepositRateBank.ICBC]: "#CB0202",
  [DepositRateBank.MARIBANK]: "#EA5F00",
  [DepositRateBank.GXS]: "#771FFF",
  [DepositRateBank.SYFE]: "#263159",
  [DepositRateBank.SSB]: "#D9B173",
  [DepositRateBank.T_BILLS]: "#08457E",
  [DepositRateBank.HONG_LEONG_FINANCE]: "#910B03",
  [DepositRateBank.SIF]: "#151D4F",
  [DepositRateBank.RHB]: "#5BC2E7",
};

export const DEPOSIT_RATES_CHART_RANGE_LABELS: Record<
  DepositRatesChartRange,
  string
> = {
  "6m": "Last 6 Months",
  "1y": "Last Year",
  "2y": "Last 2 Years",
};

export const SINGAPORE_AIRLINES_DESTINATION_LINKS: Partial<
  Record<string, string>
> = {
  KUL: Routes.SingaporeAirlinesFlightsKualaLumpur,
  PEN: Routes.SingaporeAirlinesFlightsPenang,
  HKT: Routes.SingaporeAirlinesFlightsPhuket,
  CGK: Routes.SingaporeAirlinesFlightsJakarta,
  KNO: Routes.SingaporeAirlinesFlightsMedan,
  SGN: Routes.SingaporeAirlinesFlightsHoChiMinhCity,
  DPS: Routes.SingaporeAirlinesFlightsDenpasarBali,
  SUB: Routes.SingaporeAirlinesFlightsSurabaya,
  HKG: Routes.SingaporeAirlinesFlightsHongKong,
  KTI: Routes.SingaporeAirlinesFlightsPhnom,
  BOM: Routes.SingaporeAirlinesFlightsMumbai,
  DAD: Routes.SingaporeAirlinesFlightsDaNang,
  MNL: Routes.SingaporeAirlinesFlightsManila,
  HAN: Routes.SingaporeAirlinesFlightsHanoi,
  MAA: Routes.SingaporeAirlinesFlightsChennai,
  RGN: Routes.SingaporeAirlinesFlightsYangon,
  CEB: Routes.SingaporeAirlinesFlightsCebu,
  BKK: Routes.SingaporeAirlinesFlightsBangkok,
  SAI: Routes.SingaporeAirlinesFlightsSiemReap,
  CCU: Routes.SingaporeAirlinesFlightsKolkata,
  SZX: Routes.SingaporeAirlinesFlightsShenzhen,
  BLR: Routes.SingaporeAirlinesFlightsBengaluru,
  CAN: Routes.SingaporeAirlinesFlightsGuangzhou,
  AMD: Routes.SingaporeAirlinesFlightsAhmedabad,
  TPE: Routes.SingaporeAirlinesFlightsTaipei,
  XMN: Routes.SingaporeAirlinesFlightsXiamen,
  BWN: Routes.SingaporeAirlinesFlightsBandarSeriB,
  BJS: Routes.SingaporeAirlinesFlightsBeijing,
  CKG: Routes.SingaporeAirlinesFlightsChongqing,
  HGH: Routes.SingaporeAirlinesFlightsHangzhou,
  TFU: Routes.SingaporeAirlinesFlightsChengdu,
  HYD: Routes.SingaporeAirlinesFlightsHyderabad,
  DRW: Routes.SingaporeAirlinesFlightsDarwin,
  COK: Routes.SingaporeAirlinesFlightsKochi,
  DEL: Routes.SingaporeAirlinesFlightsDelhi,
  PVG: Routes.SingaporeAirlinesFlightsShanghai,
  ICN: Routes.SingaporeAirlinesFlightsSeoul,
  CMB: Routes.SingaporeAirlinesFlightsColombo,
  DAC: Routes.SingaporeAirlinesFlightsDhaka,
  CNS: Routes.SingaporeAirlinesFlightsCairns,
  PER: Routes.SingaporeAirlinesFlightsPerth,
  PUS: Routes.SingaporeAirlinesFlightsBusan,
  KTM: Routes.SingaporeAirlinesFlightsKathmandu,
  KIX: Routes.SingaporeAirlinesFlightsOsaka,
  NGO: Routes.SingaporeAirlinesFlightsNagoya,
  MLE: Routes.SingaporeAirlinesFlightsMale,
  SYD: Routes.SingaporeAirlinesFlightsSydney,
  BNE: Routes.SingaporeAirlinesFlightsBrisbane,
  MEL: Routes.SingaporeAirlinesFlightsMelbourne,
  ADL: Routes.SingaporeAirlinesFlightsAdelaide,
  TYO: Routes.SingaporeAirlinesFlightsTokyo,
  FUK: Routes.SingaporeAirlinesFlightsFukuoka,
  IST: Routes.SingaporeAirlinesFlightsIstanbul,
  JNB: Routes.SingaporeAirlinesFlightsJohannesburg,
  DXB: Routes.SingaporeAirlinesFlightsDubai,
  CTS: Routes.SingaporeAirlinesFlightsSapporo,
  FRA: Routes.SingaporeAirlinesFlightsFrankfurt,
  BRU: Routes.SingaporeAirlinesFlightsBrussels,
  BCN: Routes.SingaporeAirlinesFlightsBarcelona,
  SFO: Routes.SingaporeAirlinesFlightsSanFrancisco,
  LAX: Routes.SingaporeAirlinesFlightsLosAngeles,
  MXP: Routes.SingaporeAirlinesFlightsMilan,
  LON: Routes.SingaporeAirlinesFlightsLondon,
  CDG: Routes.SingaporeAirlinesFlightsParis,
  MUC: Routes.SingaporeAirlinesFlightsMunich,
  ZRH: Routes.SingaporeAirlinesFlightsZurich,
  MAN: Routes.SingaporeAirlinesFlightsManchester,
  SEA: Routes.SingaporeAirlinesFlightsSeattle,
  FCO: Routes.SingaporeAirlinesFlightsRome,
  AKL: Routes.SingaporeAirlinesFlightsAuckland,
  CPH: Routes.SingaporeAirlinesFlightsCopenhagen,
  AMS: Routes.SingaporeAirlinesFlightsAmsterdam,
  CHC: Routes.SingaporeAirlinesFlightsChristchurch,
  CPT: Routes.SingaporeAirlinesFlightsCapeTown,
  NYC: Routes.SingaporeAirlinesFlightsNewYork,
  IAH: Routes.SingaporeAirlinesFlightsHouston,
  RUH: Routes.SingaporeAirlinesFlightsRiyadh,
};
