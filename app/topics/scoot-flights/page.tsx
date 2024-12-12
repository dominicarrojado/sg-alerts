import { Metadata } from "next";
import React from "react";
import { Anchor } from "@/components/ui/anchor";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import TelegramLinkButton from "@/components/telegram-link-button";
import { Routes, TelegramChannel, TopicTitle } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import TravelDealsInfo from "./travel-deals-info";

const title = "Scoot Flights";
const description =
  "Subscribe to SG Alerts to get notified when flight prices goes down for Scoot flights departing from Singapore.";
const url = Routes.ScootFlights;

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

export default function ScootFlights() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>{description}</Subheading>
      </div>
      <TravelDealsInfo />
      <Paragraph>
        <span className="font-medium">Scoot</span> is a Singapore-based low-cost
        airline owned by Singapore Airlines. It is known for offering affordable
        flights to various destinations around the world. Scoot operates a fleet
        of Airbus A320, Boeing 787 Dreamliners, and the new Embraer E190-E2
        aircraft. It was was named the world&apos;s best long-haul low-cost
        airline in 2024 at Skytrax&apos;s World Airline Awards.
      </Paragraph>
      <Paragraph>
        <Anchor href="https://www.flyscoot.com/en" isExternal>
          Fare deals offered by Scoot
        </Anchor>{" "}
        are highly sought after by Singapore residents. However, it can be
        difficult to keep track of sale prices and discounts. While there are
        many flight deal websites out there, nothing beats booking directly with
        the airline itself.
      </Paragraph>
      <Paragraph>
        <span className="font-medium">SG Alerts</span> is a free notification
        service that monitors Scoot flight sales departing from Singapore. It
        sends you a Telegram notification when the prices go down so that you
        can take advantage of the discounts.
      </Paragraph>
      <Paragraph>
        To get started, simply click the button below to subscribe to the
        Telegram channel and start receiving notifications.
      </Paragraph>
      <div className="mt-8 text-center">
        <TelegramLinkButton
          channel={TelegramChannel.ScootFlights}
          linkText="Subscribe Now"
          topicTitle={TopicTitle.ScootFlights}
        />
      </div>
    </Container>
  );
}
