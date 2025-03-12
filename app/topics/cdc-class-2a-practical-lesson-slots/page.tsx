import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import { Anchor } from "@/components/ui/anchor";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import TelegramLinkButton from "@/components/telegram-link-button";
import PageScroller from "@/components/page-scroller";
import AdUnit from "@/components/ad-unit";
import { Routes, TelegramChannel, TopicTitle } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import { CdcLessonSlotsTable } from "./cdc-lesson-slots-table";

const title =
  "ComfortDelGro Driving Centre Class 2A Motorcycle Practical Lesson Slots";
const description =
  "Subscribe to SG Alerts to get notified when there are new practical lesson slot(s) for Class 2A Motorcycle at the ComfortDelGro Driving Centre (CDC) website.";
const url = Routes.CdcClass2APracticalLessonSlots;

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

export default function CdcClass2APracticalLessonSlots() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Subscribe to get notified when there are new practical lesson slot(s)
          at ComfortDelGro Driving Centre website.
        </Subheading>
      </div>
      <CdcLessonSlotsTable />
      <Paragraph>
        <Anchor href="https://www.cdc.com.sg/" isExternal>
          ComfortDelGro Driving Centre (CDC)
        </Anchor>{" "}
        is one of the largest driving school centres in Singapore. It offers a
        wide range of driving courses and practical lessons for different types
        of vehicles including{" "}
        <Anchor href="https://www.cdc.com.sg/course/class-2a/" isExternal>
          Class 2A Motorcycle
        </Anchor>
        .
      </Paragraph>
      <Paragraph>
        The practical lessons are conducted by experienced driving instructors
        who will teach you how to ride a motorcycle safely on the road. You will
        also learn about traffic rules and regulations, as well as defensive
        riding techniques. If you are planning to take up driving lessons at{" "}
        <abbr title="ComfortDelGro Driving Centre" className="no-underline">
          CDC
        </abbr>
        , it is important that you book your practical lesson slots early so
        that you can get the slots you want. However, due to the high demand for
        practical lesson slots, it is extremely difficult to get the slots you
        want. This is especially true if you are only available during certain
        timeslots.
      </Paragraph>
      <AdUnit />
      <Paragraph>
        Slots cancellation is also common at{" "}
        <abbr title="ComfortDelGro Driving Centre" className="no-underline">
          CDC
        </abbr>
        . This is because many students are unable to attend their practical
        lessons due to school, work or other commitments. As a result, there are
        instances where slots become available at the last minute. If you are
        lucky, you may be able to get these slots. However, you will need to
        constantly check the{" "}
        <abbr title="ComfortDelGro Driving Centre" className="no-underline">
          CDC
        </abbr>{" "}
        website for available slots.
      </Paragraph>
      <Paragraph>
        <span className="font-medium">SG Alerts</span> is a free notification
        service that monitors the{" "}
        <abbr title="ComfortDelGro Driving Centre" className="no-underline">
          CDC
        </abbr>{" "}
        website for available practical lesson slots for Class 2A Motorcycle. It
        sends you a Telegram notification when there are new slots available so
        you can save time and effort. It is not a guarantee that you will get
        the slots you want, but it will definitely increase your chances of
        getting them.
      </Paragraph>
      <Paragraph>
        To get started, simply click the button below to join the Telegram
        channel and start receiving notifications.
      </Paragraph>
      <div className="sticky bottom-6 z-50 mt-8 text-center">
        <TelegramLinkButton
          channel={TelegramChannel.CdcLessonsClass2A}
          linkText="Subscribe Now"
          topicTitle={TopicTitle.CdcPracticalLessonSlotsClass2A}
        />
      </div>
    </Container>
  );
}
