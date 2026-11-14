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

const title = "Klook Travel Deals";
const description =
  "Get notified on the latest Singapore activity and experience deals from Klook.";
const url = Routes.KlookTravelDeals;

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

export default function KlookTravelDeals() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Receive Telegram notifications when there are new Singapore activity
          and experience promotions from Klook.
        </Subheading>
      </div>
      <TravelDealsTable service={TravelDealsService.KLOOK} />
      <Paragraph>
        <Anchor href="https://www.klook.com/en-SG/" isExternal>
          Klook
        </Anchor>{" "}
        is a travel and experiences platform offering attraction tickets, tours
        and activities. These alerts focus on Singapore products with discounts,
        combo offers, group-buy promotions or freebies.
      </Paragraph>
      <Paragraph>
        Subscribing to travel deal alerts helps you discover new offers for your
        next outing. Check each product on Klook for current prices,
        availability and promotion conditions before booking.
      </Paragraph>
      <AdUnit />
      <Paragraph>
        <span className="font-medium">SG Alerts</span> monitors Klook Singapore
        products and delivers notifications to Telegram when new deals or
        qualifying promotions are detected.
      </Paragraph>
      <Paragraph>
        To get started, click the button below to join the Telegram channel and
        stay updated on Klook Singapore deals.
      </Paragraph>
      <div className="sticky bottom-6 z-50 mt-8 text-center">
        <TelegramLinkButton
          channel={TelegramChannel.KlookTravelDeals}
          linkText="Subscribe Now"
          topicTitle={TopicTitle.KlookTravelDeals}
        />
      </div>
    </Container>
  );
}
