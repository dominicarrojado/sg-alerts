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
import { CdcTestSlotsTable } from "./cdc-test-slots-table";

const title = "ComfortDelGro Driving Centre Practical Test Slots";
const description =
  "Subscribe to SG Alerts to get notified when there are new traffic police practical driving test slot(s) at the ComfortDelGro Driving Centre (CDC) website.";
const url = Routes.CdcPracticalTestSlots;

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

export default function CdcPracticalTestSlots() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Subscribe to get notified when there are new traffic police practical
          driving test slot(s) at ComfortDelGro Driving Centre website.
        </Subheading>
      </div>
      <CdcTestSlotsTable />
      <Paragraph>
        <Anchor href="https://www.cdc.com.sg/" isExternal>
          ComfortDelGro Driving Centre (CDC)
        </Anchor>{" "}
        is one of the largest driving school centres in Singapore. It offers a
        wide range of driving courses and practical lessons for different types
        of vehicles including{" "}
        <Anchor
          href="https://www.cdc.com.sg/course/theory-test-btt-ftt/"
          isExternal
        >
          Private/Self-Study Package
        </Anchor>
        ,{" "}
        <Anchor href="https://www.cdc.com.sg/course/class-33a" isExternal>
          Class 3A Motorcar
        </Anchor>{" "}
        and{" "}
        <Anchor href="https://www.cdc.com.sg/course/class-33a" isExternal>
          Class 3 Motorcar
        </Anchor>
        .
      </Paragraph>
      <Paragraph>
        After passing the Basic Theory Test (BTT), Final Theory Test (FTT) and
        completing the required number of practical lessons, simulator courses,
        and recommendations by their Private Driving Instructor (PDI) or school
        instructor, learner motorists can proceed to book their practical
        driving test. You can book your test date and time through the{" "}
        <abbr title="ComfortDelGro Driving Centre" className="no-underline">
          CDC
        </abbr>{" "}
        website or mobile app. It is difficult to secure a test slot due to high
        demand and you will need to check the website frequently for available
        slots.
      </Paragraph>
      <AdUnit />
      <Paragraph>
        <span className="font-medium">SG Alerts</span> is a free notification
        service that monitors the{" "}
        <abbr title="ComfortDelGro Driving Centre" className="no-underline">
          CDC
        </abbr>{" "}
        website for available traffic police practical driving test slots. It
        sends you a Telegram notification when there are new slots available so
        you can save time and effort. You will also be notified if there are
        earlier slots available. It is not a guarantee that you will get the
        slots you want, but it will definitely increase your chances of getting
        them.
      </Paragraph>
      <Paragraph>
        To get started, simply click the button below to join the Telegram
        channel and start receiving notifications.
      </Paragraph>
      <PageScroller>
        <div className="mt-8 flex flex-col justify-center gap-4 text-center sm:flex-row">
          <div>
            <TelegramLinkButton
              channel={TelegramChannel.CdcTestsPrivate}
              linkText="Private Account"
              topicTitle={TopicTitle.CdcPracticalTestSlotsPrivate}
            />
          </div>
          <div>
            <TelegramLinkButton
              channel={TelegramChannel.CdcTestsAutoCar}
              linkText="Class 3A Motorcar"
              topicTitle={TopicTitle.CdcPracticalTestSlotsAuto}
            />
          </div>
        </div>
        <div className="mt-4 text-center">
          <TelegramLinkButton
            channel={TelegramChannel.CdcTestsManualCar}
            linkText="Class 3 Motorcar"
            topicTitle={TopicTitle.CdcPracticalTestSlotsManual}
          />
        </div>
      </PageScroller>
    </Container>
  );
}
