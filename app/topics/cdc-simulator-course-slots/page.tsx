import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import { Anchor } from "@/components/ui/anchor";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import TelegramLinkButton from "@/components/telegram-link-button";
import AdUnit from "@/components/ad-unit";
import PageScroller from "@/components/page-scroller";
import { Routes, TelegramChannel, TopicTitle } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import { CdcSimulatorSlotsTable } from "./cdc-simulator-slots-table";

const title = "ComfortDelGro Driving Centre Simulator Course Slots";
const description =
  "Subscribe to SG Alerts to get notified when there are new simulator course session slot(s) at the ComfortDelGro Driving Centre (CDC) website.";
const url = Routes.CdcSimulatorCourseSlots;

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

export default function CdcSimulatorCourseSlots() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Subscribe to get notified when there are new simulator course session
          slot(s) at ComfortDelGro Driving Centre website.
        </Subheading>
      </div>
      <CdcSimulatorSlotsTable />
      <Paragraph>
        <Anchor href="https://www.cdc.com.sg/" isExternal>
          ComfortDelGro Driving Centre (CDC)
        </Anchor>{" "}
        is one of the largest driving school centres in Singapore. It offers a
        wide range of driving courses and practical lessons for different types
        of vehicles including{" "}
        <Anchor href="https://www.cdc.com.sg/course/class-2b" isExternal>
          Class 2B Motorcycle
        </Anchor>{" "}
        and{" "}
        <Anchor href="https://www.cdc.com.sg/course/class-33a" isExternal>
          Class 3/3A Motorcar
        </Anchor>
        .
      </Paragraph>
      <Paragraph>
        The simulator course is a mandatory course for all learner drivers
        before before they are allowed to book their Practical Driving or Riding
        Tests. It is designed to help learners familiarise themselves on
        simulated roads under various conditions that simulate potential road
        hazards and practice their driving skills and their ability to recognize
        and respond to potential road hazards in a safe and controlled
        environment. The simulator course is conducted at the CDC premises and
        learners can book their simulator course sessions through the CDC
        website. If you are looking to book a simulator course session, you
        might want to consider an earlier date and time to complete the course
        as soon as possible.
      </Paragraph>
      <AdUnit />
      <Paragraph>
        <span className="font-medium">SG Alerts</span> is a free notification
        service that monitors the{" "}
        <abbr title="ComfortDelGro Driving Centre" className="no-underline">
          CDC
        </abbr>{" "}
        website for available simulator course session slots. It sends you a
        Telegram notification when there are new slots available so you can save
        time and effort. You will also be notified if there are earlier slots
        available.
      </Paragraph>
      <Paragraph>
        To get started, simply click the button below to join the Telegram
        channel and start receiving notifications.
      </Paragraph>
      <PageScroller className="mt-8 flex flex-col items-center gap-4">
        <TelegramLinkButton
          channel={TelegramChannel.CdcSimulatorBike}
          linkText="Subscribe for Simulator Course (Bike)"
          topicTitle={TopicTitle.CdcSimulatorCourseSlotsBike}
        />
        <TelegramLinkButton
          channel={TelegramChannel.CdcSimulatorCar}
          linkText="Subscribe for Simulator Course (Car)"
          topicTitle={TopicTitle.CdcSimulatorCourseSlotsCar}
        />
      </PageScroller>
    </Container>
  );
}
