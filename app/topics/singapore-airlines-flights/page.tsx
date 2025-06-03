import { Metadata } from "next";
import React from "react";
import { Anchor } from "@/components/ui/anchor";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import { FlightsTable } from "@/components/flights-table";
import TelegramLinkButton from "@/components/telegram-link-button";
import AdUnit from "@/components/ad-unit";
import {
  FlightAirline,
  Routes,
  TelegramChannel,
  TopicTitle,
} from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";

const title = "Singapore Airlines Flights";
const description =
  "Subscribe to SG Alerts to get notified when flight prices goes down for Singapore Airlines flights departing from Singapore.";
const url = Routes.SingaporeAirlinesFlights;

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

export default function SingaporeAirlinesFlights() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>{description}</Subheading>
      </div>
      <FlightsTable
        airline={FlightAirline.SINGAPORE_AIRLINES}
        withTravelBy={false}
      />
      <Paragraph>
        <span className="font-medium">Singapore Airlines (SQ)</span> is the flag
        carrier airline of Singapore. It is one of the most popular airlines in
        the world and has a reputation for providing excellent service to its
        customers. The airline has been ranked as one of the best airlines in
        the world for many years.
      </Paragraph>
      <Paragraph>
        <Anchor
          href="https://www.singaporeair.com/en_UK/sg/special-offers/flight-from-Singapore/"
          isExternal
        >
          Fare deals offered by Singapore Airlines
        </Anchor>{" "}
        are highly sought after by Singapore residents. However, the prices are
        constantly changing and it can be difficult to keep up when the prices
        go down. While there are many flight deal websites out there, nothing
        beats booking directly with the airline itself.
      </Paragraph>
      <AdUnit />
      <Paragraph>
        <span className="font-medium">SG Alerts</span> is a free notification
        service that monitors the Singapore Airlines flight fare deals from
        Singapore to all destinations around the world that it flies to. It
        sends you a Telegram notification when the prices go down so that you
        can take advantage of the lower prices.
      </Paragraph>
      <Paragraph>
        To get started, simply click the button below to join the Telegram
        channel and start receiving notifications.
      </Paragraph>
      <div className="sticky bottom-6 z-50 mt-8 text-center">
        <TelegramLinkButton
          channel={TelegramChannel.SingaporeAirlinesFlights}
          linkText="Subscribe Now"
          topicTitle={TopicTitle.SingaporeAirlinesFlights}
        />
      </div>
    </Container>
  );
}
