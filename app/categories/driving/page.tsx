import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import PageSeparator from "@/components/page-separator";
import TelegramChannels from "@/components/telegram-channels";
import { Routes } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import SubscribeForm from "@/components/subscribe-form";
import {
  DRIVING_NOTIFICATION_SETTINGS,
  DRIVING_TELEGRAM_CHANNELS,
} from "@/lib/content";

const title = "Driving in Singapore";
const description =
  "Subscribe to get notified to topics related to driving in Singapore such as appointment slots, practical lessons and more.";
const url = Routes.DrivingCategory;

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

export default function Driving() {
  return (
    <>
      <Container>
        <div className="space-y-2 mb-6">
          <Heading>{title}</Heading>
          <Subheading>{description}</Subheading>
        </div>
        <TelegramChannels channels={DRIVING_TELEGRAM_CHANNELS} />
        <PageSeparator>OR</PageSeparator>
        <SubscribeForm
          defaultTopics={DRIVING_NOTIFICATION_SETTINGS}
          withBackButton
        />
      </Container>
    </>
  );
}
