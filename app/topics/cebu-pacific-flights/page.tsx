import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import { Currency, FlightAirline, Routes } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import { FlightsTable } from "@/components/flights-table";

const title = "Cebu Pacific Flights";
const description =
  "Subscribe to SG Alerts to get notified when flight prices goes down for Cebu Pacific flights departing from Philippines.";
const url = Routes.CebuPacificFlights;

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

export default function CebuPacificFlights() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>{description}</Subheading>
      </div>
      <FlightsTable
        airline={FlightAirline.CEBU_PACIFIC}
        destinationLabel="Route"
        displayCityCode={false}
        pricesLabel="Base Fare"
        currency={Currency.PHP}
        usePercentDiff={false}
      />
      <Paragraph>
        <span className="font-medium">Cebu Pacific (5J)</span> is the one of the
        leading airlines in the Philippines, flying to over 60 domestic and
        international destinations across 14 countries, including Australia,
        China, Japan, Singapore and the United Arab Emirates.
      </Paragraph>
      <Paragraph>
        Fare deals offered by Cebu Pacific are highly sought after by Filipinos.
        One of the most popular promotions is the Piso Sale, where you can book
        flights with base fares as low as 1 peso.
      </Paragraph>
      <Paragraph>
        <span className="font-medium">SG Alerts</span> is a free notification
        service that sends you an email when the prices go down for Cebu Pacific
        flights departing from Philippines. Be the first to know when the Piso
        Sale is on so that you can take advantage of the lower prices.
      </Paragraph>
      <Paragraph>
        To get started, simply click the button below to head over to the
        subscription page. Once there, you can select{" "}
        <span className="font-medium">Flight Prices (Cebu Pacific)</span> as one
        of the topics you want to subscribe to.
      </Paragraph>
      <div className="mt-8 text-center">
        <Link href={Routes.Home}>
          <Button variant="secondary">Subscribe Now</Button>
        </Link>
      </div>
    </Container>
  );
}
