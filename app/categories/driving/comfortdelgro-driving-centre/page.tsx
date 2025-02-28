import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import TelegramChannels from "@/components/telegram-channels";
import { Routes } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import { CDC_TELEGRAM_CHANNELS } from "@/lib/content";

const title = "ComfortDelGro Driving Centre";
const description =
  "Subscribe to get notified to topics related to ComfortDelGro Driving Centre such as practical lessons, appointment slots and more.";
const url = Routes.ComfortDelGroDrivingCentre;

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

export default function ComfortDelGroDrivingCentre() {
  return (
    <Container>
      <div className="mb-6 space-y-2">
        <Heading>{title}</Heading>
        <Subheading>{description}</Subheading>
      </div>
      <TelegramChannels
        channels={CDC_TELEGRAM_CHANNELS}
        backButtonRoute={Routes.DrivingCategory}
      />
    </Container>
  );
}
