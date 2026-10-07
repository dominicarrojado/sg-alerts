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

const title = "Trip.com Travel Deals";
const description =
  "Get notified on the latest flight, hotel and travel deals and promotion codes from Trip.com.";
const url = Routes.TripComTravelDeals;

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

export default function TripComTravelDeals() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Receive Telegram notifications when there are new travel promotions
          and discount codes from Trip.com.
        </Subheading>
      </div>
      <TravelDealsTable service={TravelDealsService.TRIP_COM} />
      <Paragraph>
        <Anchor href="https://sg.trip.com/sale/deals" isExternal>
          Trip.com
        </Anchor>{" "}
        is an international online travel agency offering bookings for flights,
        hotels, trains and holiday attractions worldwide. The platform
        frequently releases limited-time coupons, bank partner discount codes
        (such as Citi, DBS, HSBC, OCBC and UOB) and seasonal campaigns for
        destinations across Asia and beyond.
      </Paragraph>
      <Paragraph>
        Because many travel coupons and flash sales have limited redemption
        quotas or short validity windows, getting notified early ensures you can
        secure discounts on your bookings before they run out.
      </Paragraph>
      <AdUnit />
      <Paragraph>
        <span className="font-medium">SG Alerts</span> tracks new promotional
        campaigns on Trip.com and delivers immediate alerts straight to
        Telegram.
      </Paragraph>
      <Paragraph>
        To get started, click the button below to join the Telegram channel and
        stay updated on all upcoming Trip.com deals.
      </Paragraph>
      <div className="sticky bottom-6 z-50 mt-8 text-center">
        <TelegramLinkButton
          channel={TelegramChannel.TripComTravelDeals}
          linkText="Subscribe Now"
          topicTitle={TopicTitle.TripComTravelDeals}
        />
      </div>
    </Container>
  );
}
