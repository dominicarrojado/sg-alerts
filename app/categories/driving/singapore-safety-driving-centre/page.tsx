import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import TelegramChannels from "@/components/telegram-channels";
import PageSeparator from "@/components/page-separator";
import SubscribeForm from "@/components/subscribe-form";
import { Routes } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import {
  SSDC_NOTIFICATION_SETTINGS,
  SSDC_TELEGRAM_CHANNELS,
} from "@/lib/content";

const title = "Singapore Safety Driving Centre";
const description =
  "Subscribe to get notified to topics related to Singapore Safety Driving Centre such as practical tests and announcements.";
const url = Routes.SingaporeSafetyDrivingCentre;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    ...META_OPEN_GRAPH,
    title,
    description,
    url,
  },
  twitter: {
    ...META_TWITTER,
    title,
    description,
  },
};

export default function SingaporeSafetyDrivingCentre() {
  return (
    <Container>
      <div className="mb-6 space-y-2">
        <Heading>{title}</Heading>
        <Subheading>{description}</Subheading>
      </div>
      <TelegramChannels
        channels={SSDC_TELEGRAM_CHANNELS}
        backButtonRoute={Routes.DrivingCategory}
      />
    </Container>
  );
}
