import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Anchor } from "@/components/ui/anchor";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import { FlightAirline, Routes, TelegramChannel } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import { FlightsTable } from "@/components/flights-table";
import { TELEGRAM_SHORT_URL } from "@/lib/constants";

const title = "Jetstar Flights";
const description =
  "Subscribe to SG Alerts to get notified when flight prices goes down for Jetstar flights departing from Singapore.";
const url = Routes.JetstarFlights;

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

export default function JetstarFlights() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>{description}</Subheading>
      </div>
      <FlightsTable airline={FlightAirline.JETSTAR} pricesLabel="Prices From" />
      <Paragraph>
        <span className="font-medium">Jetstar (3K)</span> is one of the most
        popular low-cost airlines in the world. It offers cheap flights to many
        destinations around the world sending more than 5,000 flights every week
        to over 85 destinations - across Australia, New Zealand, Asia and the
        Pacific region.
      </Paragraph>
      <Paragraph>
        <Anchor href="https://www.jetstar.com/sg/en/deals" isExternal>
          Fare deals offered by Jetstar
        </Anchor>{" "}
        are highly sought after by Singapore residents. However, the prices are
        constantly changing and it can be difficult to keep up when the prices
        go down. While there are many flight deal websites out there, nothing
        beats booking directly with the airline itself.
      </Paragraph>
      <Paragraph>
        <span className="font-medium">SG Alerts</span> is a free notification
        service that monitors the Jetstar flight promotions from Singapore. We
        will notify you when the prices go down so that you can take advantage
        of the lower prices.
      </Paragraph>
      <Paragraph>
        To get started, simply click the button below to subscribe to the
        Telegram channel and start receiving notifications.
      </Paragraph>
      <div className="mt-8 text-center">
        <Anchor
          href={`${TELEGRAM_SHORT_URL}/${TelegramChannel.JetstarFlights}`}
          isExternal
        >
          <Button variant="secondary">Subscribe Now</Button>
        </Anchor>
      </div>
    </Container>
  );
}
