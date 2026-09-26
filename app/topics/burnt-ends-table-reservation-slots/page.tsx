import { Metadata } from "next";
import React from "react";
import { Anchor } from "@/components/ui/anchor";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import SubscribeLinkButton from "@/components/subscribe-link-button";
import AdUnit from "@/components/ad-unit";
import { RestaurantSlotsTable } from "@/components/restaurant-slots-table";
import { Restaurant, Routes, TopicTitle } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";

const title = "Table Reservation Slots (Burnt Ends)";
const description =
  "Get notified when new table reservation slots become available for Burnt Ends in Singapore.";
const url = Routes.RestaurantsBurntEnds;

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

export default function BurntEndsTableReservationSlots() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Receive email notifications when there are new table reservation
          date(s) at Burnt Ends.
        </Subheading>
      </div>
      <RestaurantSlotsTable restaurant={Restaurant.BURNT_ENDS} />
      <Paragraph>
        <Anchor href="https://burntends.com.sg/" isExternal>
          Burnt Ends
        </Anchor>{" "}
        is a one-Michelin-starred modern Australian barbecue restaurant located
        in Dempsey Hill, Singapore. Founded by Chef-Owner Dave Pynt, the
        restaurant is renowned for its custom four-tonne, dual-cavity apple and
        almond wood-burning kilns and elevation of wood-fire cooking.
      </Paragraph>
      <Paragraph>
        Due to its international acclaim and intimate seating capacity across
        the main dining room and chef&apos;s counter, reservations are
        notoriously difficult to secure and often sell out within minutes of
        being released. Reservations typically open on the 1st of every month at
        10:00 AM for the following month.
      </Paragraph>
      <AdUnit />
      <Paragraph>
        <span className="font-medium">SG Alerts</span> monitors Burnt Ends&apos;
        latest reservation availability for main dining and counter seating
        during dinner hours and sends email notifications whenever newly opened
        or cancelled table slots become available.
      </Paragraph>
      <Paragraph>
        To get started, click the button below to head over to the subscription
        page and subscribe to Burnt Ends reservation alerts.
      </Paragraph>
      <div className="sticky bottom-6 z-50 mt-8 text-center">
        <SubscribeLinkButton
          route={Routes.DiningCategory}
          linkText="Subscribe Now"
          topicTitle={TopicTitle.RestaurantsBurntEnds}
        />
      </div>
    </Container>
  );
}
