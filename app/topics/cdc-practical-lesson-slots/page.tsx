import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { Container } from "@/components/ui/container";
import { Anchor } from "@/components/ui/anchor";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import { Routes, TelegramChannel } from "@/lib/enums";
import { TELEGRAM_SHORT_URL } from "@/lib/constants";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import CdcLessonSlotsTable from "./cdc-lesson-slots-table";

const title = "ComfortDelGro Driving Centre Practical Lesson Slots";
const description =
  "Subscribe to SG Alerts to get notified when there are new practical lesson slot(s) at the ComfortDelGro Driving Centre (CDC) website.";
const url = Routes.CdcPracticalLessonSlots;

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

export default function CdcPracticalLessonSlots() {
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
        <Anchor href="https://www.cdc.com.sg/course/class-33a/" isExternal>
          Class 3A Motorcar
        </Anchor>{" "}
        and{" "}
        <Anchor href="https://www.cdc.com.sg/course/class-2b/" isExternal>
          Class 2B Motorcycle
        </Anchor>
        .
      </Paragraph>
      <Paragraph>
        The practical lessons are conducted by experienced driving instructors
        who will teach you how to drive safely on the road. You will also learn
        about traffic rules and regulations, as well as defensive driving
        techniques. After completing the course, you will be able to apply for
        your driving license and start driving on your own.
      </Paragraph>
      <Paragraph>
        If you are planning to take up driving lessons at{" "}
        <abbr title="ComfortDelGro Driving Centre" className="no-underline">
          CDC
        </abbr>
        , it is important that you book your practical lesson slots early so
        that you can get the slots you want. However, due to the high demand for
        practical lesson slots and no session opening date for Class 3A and 2B
        lessons, it is extremely difficult to get the slots you want. This is
        especially true if you are only available during certain time slots.
      </Paragraph>
      <Paragraph>
        Slots cancellation is also common at{" "}
        <abbr title="ComfortDelGro Driving Centre" className="no-underline">
          CDC
        </abbr>
        . This is because many students are unable to attend their practical
        lessons due to work or other commitments. As a result, there are
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
        website for available practical lesson slots for Class 3A Motorcar (for
        Standard only, not applicable for One Team or Elite Team). It sends you
        a Telegram notification when there are new slots available so you can
        save time and effort. It is not a guarantee that you will get the slots
        you want, but it will definitely increase your chances of getting them.
      </Paragraph>
      <Paragraph>
        To get started, simply click either of the buttons below to subscribe to
        the Telegram channel and start receiving notifications.
      </Paragraph>
      <div className="mt-8 text-center flex flex-col justify-center gap-4 sm:flex-row">
        <div>
          <Anchor
            href={`${TELEGRAM_SHORT_URL}/${TelegramChannel.CdcLessonsAutoCar}`}
            isExternal
          >
            <Button variant="secondary">Class 3A Motorcar</Button>
          </Anchor>
        </div>
        <div>
          <Anchor
            href={`${TELEGRAM_SHORT_URL}/${TelegramChannel.CdcLessonsMotorcycle2B}`}
            isExternal
          >
            <Button variant="secondary">Class 2B Motorcycle</Button>
          </Anchor>
        </div>
      </div>
    </Container>
  );
}
