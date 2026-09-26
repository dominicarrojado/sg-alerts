import { Metadata } from "next";
import React from "react";
import { Anchor } from "@/components/ui/anchor";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import TelegramLinkButton from "@/components/telegram-link-button";
import AdUnit from "@/components/ad-unit";
import { TravelDealsTable } from "@/components/travel-deals-table";
import {
  Routes,
  TelegramChannel,
  TopicTitle,
  TravelDealsService,
} from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";

const title = "Traveloka Travel Deals";
const description =
  "Get notified on the latest flight, hotel, and travel promotions from Traveloka.";
const url = Routes.TravelokaTravelDeals;

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

export default function TravelokaTravelDeals() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Receive Telegram notifications when there are new travel promotions
          and discount codes from Traveloka.
        </Subheading>
      </div>
      <TravelDealsTable service={TravelDealsService.TRAVELOKA} />
      <Paragraph>
        <Anchor href="https://www.traveloka.com/en-sg/promotion" isExternal>
          Traveloka
        </Anchor>{" "}
        is a leading Southeast Asian travel platform specializing in flight
        tickets, hotel accommodations, holiday packages, and attractions across
        the region. The platform frequently features regional weekend getaway
        discounts, partner airline seat sales, and accommodation vouchers.
      </Paragraph>
      <Paragraph>
        Subscribing to travel deal alerts ensures you are among the first to
        learn about flash sales and holiday promotions before limited coupon
        codes expire.
      </Paragraph>
      <AdUnit />
      <Paragraph>
        <span className="font-medium">SG Alerts</span> monitors Traveloka
        promotions and delivers real-time notifications to Telegram whenever new
        deals go live.
      </Paragraph>
      <Paragraph>
        To get started, click the button below to join the Telegram channel and
        stay updated on all upcoming Traveloka promotions.
      </Paragraph>
      <div className="sticky bottom-6 z-50 mt-8 text-center">
        <TelegramLinkButton
          channel={TelegramChannel.TravelokaTravelDeals}
          linkText="Subscribe Now"
          topicTitle={TopicTitle.TravelokaTravelDeals}
        />
      </div>
    </Container>
  );
}
