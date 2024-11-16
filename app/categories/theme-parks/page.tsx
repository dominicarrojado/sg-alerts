import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import TelegramChannels from "@/components/telegram-channels";
import { Routes } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import { THEME_PARK_TELEGRAM_CHANNELS } from "@/lib/content";

const title = "Theme Parks Attraction Updates";
const description =
  "Subscribe to get notified to topics related to popular theme parks visited by Singapore residents such as Tokyo Disneyland and Tokyo DisneySea.";
const url = Routes.ThemeParksCategory;

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

export default function ThemeParks() {
  return (
    <>
      <Container>
        <div className="space-y-2 mb-6">
          <Heading>{title}</Heading>
          <Subheading>{description}</Subheading>
        </div>
        <TelegramChannels
          channels={THEME_PARK_TELEGRAM_CHANNELS}
          withBackButton
        />
      </Container>
    </>
  );
}
