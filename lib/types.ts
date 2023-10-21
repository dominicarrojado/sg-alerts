import { ReactNode } from "react";
import { SubscriptionTopic } from "./enums";

export type SubscriptionTopics = Array<SubscriptionTopic>;
export type Subscription = {
  _id: string;
  user: {
    _id: string;
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
