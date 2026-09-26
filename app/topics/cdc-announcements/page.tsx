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

const title = "CDC Announcements";
const description =
  "Get notified on the latest news, scheduled maintenance, and announcements from ComfortDelGro Driving Centre in Singapore.";
const url = Routes.CdcAnnouncements;

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

export default function CdcAnnouncements() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Receive Telegram notifications when there are new announcements from
          ComfortDelGro Driving Centre.
        </Subheading>
      </div>
      <AnnouncementsTable service={AnnouncementService.CDC} />
      <Paragraph>
        <Anchor href="https://www.cdc.com.sg/" isExternal>
          ComfortDelGro Driving Centre (CDC)
        </Anchor>{" "}
        operates its main driving centre in Ubi alongside pickup outposts across
        Singapore. The centre regularly issues important notices regarding
        portal maintenance, Traffic Police theory test system upgrades,
        e-learning platforms, and holiday operating hours.
      </Paragraph>
      <Paragraph>
        Keeping track of these updates helps learner drivers plan their lesson
        and test bookings without unexpected interruptions caused by scheduled
        system maintenance or sudden service closures.
      </Paragraph>
      <AdUnit />
      <Paragraph>
        <span className="font-medium">SG Alerts</span> monitors the CDC news
        feed and broadcasts alerts to Telegram as soon as new official
        announcements are posted.
      </Paragraph>
      <Paragraph>
        To get started, click the button below to join the Telegram channel and
        stay updated on all CDC announcements.
      </Paragraph>
      <div className="sticky bottom-6 z-50 mt-8 text-center">
        <TelegramLinkButton
          channel={TelegramChannel.CdcAnnouncements}
          linkText="Subscribe Now"
          topicTitle={TopicTitle.CdcAnnouncements}
        />
      </div>
    </Container>
  );
}
