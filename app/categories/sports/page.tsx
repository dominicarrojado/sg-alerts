import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import TelegramChannels from "@/components/telegram-channels";
import { Routes } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import { SPORTS_TELEGRAM_CHANNELS } from "@/lib/content";

const title = "Sports in Singapore";
const description =
  "Subscribe to get notified on topics related to sports in Singapore such as badminton court bookings.";
const url = Routes.SportsCategory;

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

export default function Sports() {
  return (
    <>
      <Container>
        <div className="mb-6 space-y-2">
          <Heading>{title}</Heading>
          <Subheading>{description}</Subheading>
        </div>
        <TelegramChannels
          channels={SPORTS_TELEGRAM_CHANNELS}
          backButtonRoute={Routes.Home}
        />
      </Container>
    </>
  );
}
