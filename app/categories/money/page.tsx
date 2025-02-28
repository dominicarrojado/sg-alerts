import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import TelegramChannels from "@/components/telegram-channels";
import { Routes } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import { MONEY_TELEGRAM_CHANNELS } from "@/lib/content";

const title = "Money in Singapore";
const description =
  "Subscribe to get notified to topics related to money in Singapore such as fixed deposit rates and TOTO snowballs.";
const url = Routes.MoneyCategory;

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

export default function Money() {
  return (
    <>
      <Container>
        <div className="mb-6 space-y-2">
          <Heading>{title}</Heading>
          <Subheading>{description}</Subheading>
        </div>
        <TelegramChannels
          channels={MONEY_TELEGRAM_CHANNELS}
          backButtonRoute={Routes.Home}
        />
      </Container>
    </>
  );
}
