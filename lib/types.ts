import { ReactNode } from "react";
import {
  BbdcService,
  CdcService,
  GoogleAnalyticsEvent,
  JapanVisaType,
  Routes,
  SsdcService,
  SubscriptionTopic,
  TelegramChannel,
  TopicTitle,
} from "./enums";

export type SubscriptionTopics = Array<SubscriptionTopic>;
export type Subscription = {
  user: {
    email: string;
  };
  topics: SubscriptionTopics;
};

export type TelegramPublicChannel = {
  id: TelegramChannel;
  title: string;
  description: ReactNode;
  topicRoute?: Routes;
};
export type TelegramPublicChannels = Array<TelegramPublicChannel>;

export type NotificationSetting = {
  id: SubscriptionTopic;
  title: string;
  description: ReactNode;
  topicRoute?: Routes;
  hasTelegramChannel?: boolean;
};
export type NotificationSettings = Array<NotificationSetting>;

export type EventSubscribeFormSubmit = {
  event: GoogleAnalyticsEvent.SUBSCRIBE_FORM_SUBMIT;
  buttonText: string;
};

export type EventUnsubscribeFormSubmit = {
  event: GoogleAnalyticsEvent.UNSUBSCRIBE_FORM_SUBMIT;
  buttonText: string;
};

export type EventTopicClick = {
  event: GoogleAnalyticsEvent.TOPIC_CLICK;
  topicTitle: string;
  linkText?: string;
  linkUrl: string;
};

export type EventTopicPageClick = {
  event: GoogleAnalyticsEvent.TOPIC_PAGE_CLICK;
  topicTitle: string;
  linkText: string;
  linkUrl: string;
};

export type EventToastOpen = {
  event: GoogleAnalyticsEvent.TOAST_OPEN;
  toastTitle: string;
  buttonText: string;
};

export type EventToastClose = {
  event: GoogleAnalyticsEvent.TOAST_CLOSE;
  toastTitle: string;
  buttonText: string;
};

export type EventToastClick = {
  event: GoogleAnalyticsEvent.TOAST_CLICK;
  toastTitle: string;
  buttonText: string;
};

export type DepositRate = {
  tenure: number;
  rate: number;
  previousRate?: number;
  bank: string;
  minDeposit: number;
  endDate: string;
  link: string;
};

export type DepositRates = Array<DepositRate>;

export type DepositRatesInfo = {
  items: DepositRates;
  updatedAt: string;
};

export type Flight = {
  id: string;
  shareUrl: string;
  destinationCityCode: string;
  destinationCityName: string;
  currency: string;
  price: number;
  previousPrice?: number;
  departureDate: string;
  returnDate: string;
  deltaDays: number;
};

export type Flights = Array<Flight>;

export type FlightsInfo = {
  items: Flights;
  updatedAt: string;
};

export type CoeBidding = {
  category: string;
  title: string;
  quota: number;
  qp: number;
  previousQp?: number;
  pqp: number;
  previousPqp?: number;
};

export type CoeBiddings = Array<CoeBidding>;

export type CoeBiddingsInfo = {
  items: CoeBiddings;
  updatedAt: string;
};

export type TrainTimeSlot = {
  id: string;
  date: string;
  day: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  fare: number;
  slotsCount: number;
  bookingLink: string;
};

export type TrainTimeSlots = Array<TrainTimeSlot>;

export type TrainTimeSlotsInfo = {
  items: TrainTimeSlots;
  updatedAt: string;
  lastAvailableDate: string;
};

export type JapanVisaSlotsDatesMap = Record<JapanVisaType, string>;

export type JapanVisaSlotsInfoItem = {
  type: JapanVisaType;
  title: string;
  lastAvailableDate: string;
  topicLink: string;
  topicTitle:
    | TopicTitle.JapanVisaTourism
    | TopicTitle.JapanVisaBusiness
    | TopicTitle.JapanVisaOthers;
};
export type JapanVisaSlotsInfoItems = Array<JapanVisaSlotsInfoItem>;

export type CdcSlotsDatesMap = Record<CdcService, string>;

export type CdcSlotsInfo = {
  service: CdcService;
  title: string;
  lastAvailableDate: string;
  telegramChannel:
    | TelegramChannel.CdcEyesightTest
    | TelegramChannel.CdcCounterServices;
  topicTitle: TopicTitle.CdcEyesightTest | TopicTitle.CdcCounterServices;
};
export type CdcSlotsInfoItems = Array<CdcSlotsInfo>;

export type SsdcSlotsDatesMap = Record<SsdcService, string>;

export type SsdcSlotsInfo = {
  service: SsdcService;
  title: string;
  lastAvailableDate: string;
  topicLink: string;
  topicTitle:
    | TopicTitle.SsdcPracticalLessonBooking
    | TopicTitle.SsdcPrivateLearners
    | TopicTitle.SsdcEnrolmentWeekend
    | TopicTitle.SsdcOtherCoursesEnrolment
    | TopicTitle.SsdcForeignLicenceWeekend;
};
export type SsdcSlotsInfoItems = Array<SsdcSlotsInfo>;

export type BbdcSlotsDatesMap = Record<BbdcService, string>;

export type BbdcSlotsInfo = {
  service: BbdcService;
  title: string;
  lastAvailableDate: string;
  calendarLink: string;
};
export type BbdcSlotsInfoItems = Array<BbdcSlotsInfo>;

export type TravelDeal = {
  title: string;
  description: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  link: string;
  duration: string;
};
export type TravelDeals = Array<TravelDeal>;
export type TravelDealInfo = {
  items: TravelDeals;
  updatedAt: string;
  lastAvailableAt: string;
};

export type DonationTestimonial = {
  firstName: string;
  lastName: string;
  message: string;
  date: string;
};
export type DonationTestimonials = Array<DonationTestimonial>;

export type Facility = {
  id: string;
  name: string;
  operatingStatus: string;
  isOperating: boolean;
  previousOperatingStatus?: string;
  dpaStatus: string | null;
  previousDpaStatus?: string;
  fsStatus: string | null;
  previousFsStatus?: string;
  standByTime: string | false;
  standByTimeNum: number;
  lastUpdatedTime: string;
};
export type Facilities = Array<Facility>;
export type ThemeParkInfo = {
  items: Facilities;
  updatedAt: string;
};
