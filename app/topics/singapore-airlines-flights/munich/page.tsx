import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import { FlightPriceChart } from "@/components/flight-price-chart";
import { FlightShareUrlAnchor } from "@/components/flight-share-url-anchor";
import TelegramLinkButton from "@/components/telegram-link-button";
import AdUnit from "@/components/ad-unit";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import {
  FlightAirline,
  Routes,
  TelegramChannel,
  TopicTitle,
} from "@/lib/enums";

const title = "Singapore Airlines Flights to Munich";
const description =
  "Analyse Singapore Airlines fare trends from Singapore to Munich for the past 6 months, 1 year and 2 years.";
const url = Routes.SingaporeAirlinesFlightsMunich;

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

export default function SingaporeAirlinesFlightsMunich() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>{description}</Subheading>
      </div>
      <FlightPriceChart
        airline={FlightAirline.SINGAPORE_AIRLINES}
        destinationCityCode="MUC"
        chartTitle="Munich Price Trend"
      />
      <Paragraph>
        The above chart shows the fare trends for Singapore Airlines flights
        from Singapore to Munich (MUC) for the past 6 months, 1 year and 2
        years. You can use this information to decide when to{" "}
        <FlightShareUrlAnchor
          airline={FlightAirline.SINGAPORE_AIRLINES}
          destinationCityCode="MUC"
          linkText="book your flight"
        />{" "}
        for the best price.
      </Paragraph>
      <AdUnit />
      <Paragraph>
        <span className="font-medium">SG Alerts</span> is a free notification
        service that monitors the Singapore Airlines flight fare deals from
        Singapore to Munich. It sends you a Telegram notification when the
        prices go down so that you can take advantage of the lower prices.
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
