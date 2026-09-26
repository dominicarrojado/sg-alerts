import { Metadata } from "next";
import React from "react";
import { Anchor } from "@/components/ui/anchor";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import TelegramLinkButton from "@/components/telegram-link-button";
import AdUnit from "@/components/ad-unit";
import { AnnouncementsTable } from "@/components/announcements-table";
import {
  AnnouncementService,
  Routes,
  TelegramChannel,
  TopicTitle,
} from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";

const title = "BBDC Announcements";
const description =
  "Get notified on the latest news, scheduled maintenance, and announcements from Bukit Batok Driving Centre.";
const url = Routes.BbdcAnnouncements;

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

export default function BbdcAnnouncements() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Receive Telegram notifications when there are new announcements from
          Bukit Batok Driving Centre.
        </Subheading>
      </div>
      <AnnouncementsTable service={AnnouncementService.BBDC} />
      <Paragraph>
        <Anchor href="https://bbdc.sg/" isExternal>
          Bukit Batok Driving Centre (BBDC)
        </Anchor>
        , located in Bukit Batok West, regularly shares notices regarding online
        enrolment availability, riding simulator safety attire rules, holiday
        schedules, and counter service arrangements.
      </Paragraph>
      <Paragraph>
        Keeping track of these announcements helps learner drivers and riders
        prepare for visits and avoid disruptions during scheduled online service
        downtimes.
      </Paragraph>
      <AdUnit />
      <Paragraph>
        <span className="font-medium">SG Alerts</span> monitors the BBDC news
        portal and sends instant alerts to Telegram whenever new official
        announcements are posted.
      </Paragraph>
      <Paragraph>
        To get started, click the button below to join the Telegram channel and
        stay updated on all BBDC announcements.
      </Paragraph>
      <div className="sticky bottom-6 z-50 mt-8 text-center">
        <TelegramLinkButton
          channel={TelegramChannel.BbdcAnnouncements}
          linkText="Subscribe Now"
          topicTitle={TopicTitle.BbdcAnnouncements}
        />
      </div>
    </Container>
  );
}
