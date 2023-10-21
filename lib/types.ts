import { ReactNode } from "react";
import { SubscriptionTopic } from "./enums";

export type SubscriptionTopics = Array<SubscriptionTopic>;

export type NotificationSetting = {
  id: SubscriptionTopic;
  title: string;
  description: ReactNode;
};
export type NotificationSettings = Array<NotificationSetting>;
