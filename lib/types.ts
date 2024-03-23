import { ReactNode } from "react";
import {
  CdcService,
  GoogleAnalyticsEvent,
  JapanVisaType,
  SsdcService,
  SubscriptionTopic,
} from "./enums";

export type SubscriptionTopics = Array<SubscriptionTopic>;
export type Subscription = {
  user: {
    email: string;
  };
  topics: SubscriptionTopics;
};

export type NotificationSetting = {
  id: SubscriptionTopic;
  title: string;
  description: ReactNode;
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

export interface Flight {
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
}

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
  title: ReactNode;
  lastAvailableDate: string;
};
export type JapanVisaSlotsInfoItems = Array<JapanVisaSlotsInfoItem>;

export type CdcSlotsDatesMap = Record<CdcService, string>;

export type CdcSlotsInfo = {
  service: CdcService;
  title: string;
  lastAvailableDate: string;
  calendarLink: string;
};
export type CdcSlotsInfoItems = Array<CdcSlotsInfo>;

export type SsdcSlotsDatesMap = Record<SsdcService, string>;

export type SsdcSlotsInfo = {
  service: SsdcService;
  title: string;
  lastAvailableDate: string;
  calendarLink: string;
};
export type SsdcSlotsInfoItems = Array<SsdcSlotsInfo>;
