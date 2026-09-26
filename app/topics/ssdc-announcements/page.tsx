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

const title = "SSDC Announcements";
const description =
  "Get notified on the latest news, scheduled maintenance, and announcements from Singapore Safety Driving Centre.";
const url = Routes.SsdcAnnouncements;

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

export default function SsdcAnnouncements() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Receive Telegram notifications when there are new announcements from
          Singapore Safety Driving Centre.
        </Subheading>
      </div>
      <AnnouncementsTable service={AnnouncementService.SSDC} />
      <Paragraph>
        <Anchor href="https://ssdcl.com.sg/" isExternal>
          Singapore Safety Driving Centre (SSDC)
        </Anchor>
        , located in Woodlands, frequently publishes updates regarding
        e-appointment system availability, Traffic Police test fee adjustments,
        payment gateway maintenance, and practical lesson release schedules.
      </Paragraph>
      <Paragraph>
        Staying informed about these notices helps learner drivers plan their
        learning journey and avoid transaction issues or missed booking windows
        during server maintenance.
      </Paragraph>
      <AdUnit />
      <Paragraph>
        <span className="font-medium">SG Alerts</span> monitors SSDC&apos;s
        announcements and broadcasts instant alerts to Telegram as soon as new
        notices are released.
      </Paragraph>
      <Paragraph>
        To get started, click the button below to join the Telegram channel and
        stay updated on all SSDC announcements.
      </Paragraph>
      <div className="sticky bottom-6 z-50 mt-8 text-center">
        <TelegramLinkButton
          channel={TelegramChannel.SsdcAnnouncements}
          linkText="Subscribe Now"
          topicTitle={TopicTitle.SsdcAnnouncements}
        />
      </div>
    </Container>
  );
}
