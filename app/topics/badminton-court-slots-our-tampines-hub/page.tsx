import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import { Anchor } from "@/components/ui/anchor";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import TelegramLinkButton from "@/components/telegram-link-button";
import AdUnit from "@/components/ad-unit";
import {
  FacilityService,
  Routes,
  TelegramChannel,
  TopicTitle,
} from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import { FacilitySlotsTable } from "@/components/facility-slots-table";

const title = "Badminton Court Slots (Our Tampines Hub)";
const description =
  "Get notified when peak hour badminton court slots at Our Tampines Hub - Community Auditorium become available for instant booking.";
const url = Routes.BadmintonCourtSlotsOurTampinesHub;

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

export default function BadmintonCourtSlotsOurTampinesHub() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>{description}</Subheading>
      </div>
      <FacilitySlotsTable
        service={FacilityService.ACTIVE_SG_BADMINTON_COURT_OTH}
      />
      <Paragraph>
        <span className="font-medium">
          Our Tampines Hub - Community Auditorium
        </span>{" "}
        is a popular badminton venue managed by ActiveSG in the east of
        Singapore. Peak hour slots are in high demand and are allocated through
        a ballot system. Peak hours are{" "}
        <strong className="font-medium">
          Mondays to Fridays, 6 pm to 10 pm
        </strong>{" "}
        and{" "}
        <strong className="font-medium">
          Saturdays, Sundays and Public Holidays, 7 am to 10 pm
        </strong>
        .
      </Paragraph>
      <Paragraph>
        Balloting for peak hour slots opens{" "}
        <strong className="font-medium">14 days in advance</strong> from 12
        midnight and closes at 11:59 pm on the same day. Results are sent the
        next day, with slots randomly assigned to give everyone an equal chance.
        However, not all balloted slots are taken — any unassigned ballot slots
        are released for{" "}
        <strong className="font-medium">instant booking</strong> on a
        first-come, first-served basis{" "}
        <strong className="font-medium">12 days in advance</strong> from 12 noon
        via the{" "}
        <Anchor
          href="https://activesg.gov.sg/facility-bookings/activities/YLONatwvqJfikKOmB5N9U/venues/nqBpgnMrPN8u5LLfvyN2T/timeslots?activityId=YLONatwvqJfikKOmB5N9U&venueId=nqBpgnMrPN8u5LLfvyN2T"
          isExternal
        >
          ActiveSG website
        </Anchor>
        .
      </Paragraph>
      <AdUnit />
      <Paragraph>
        <span className="font-medium">SG Alerts</span> monitors the ActiveSG
        facility booking system and sends a Telegram notification as soon as an
        unassigned peak hour slot at Our Tampines Hub - Community Auditorium
        becomes available for instant booking. This saves you time and effort
        from having to manually check the ActiveSG website to find out if any
        peak hour slots have become available for instant booking.
      </Paragraph>
      <Paragraph>
        To get started, simply click the button below to join the Telegram
        channel and start receiving notifications.
      </Paragraph>
      <div className="sticky bottom-6 z-50 mt-8 text-center">
        <TelegramLinkButton
          topicTitle={TopicTitle.BadmintonCourtSlotsOurTampinesHub}
          channel={TelegramChannel.BadmintonCourtSlotsOurTampinesHub}
          linkText="Subscribe Now"
        />
      </div>
    </Container>
  );
}
