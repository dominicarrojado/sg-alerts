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
import { CdcSlotsTable } from "./cdc-slots-table";

const title = "ComfortDelGro Driving Centre Appointment Slots";
const description =
  "Subscribe to SG Alerts to get notified when there are new appointment date(s) are available at the ComfortDelGro Driving Centre (CDC) website.";
const url = Routes.CdcAppointmentSlots;

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

export default function CdcAppointmentSlots() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Subscribe to get notified when there are new appointment date(s)
          available at the ComfortDelGro Driving Centre (CDC) website.
        </Subheading>
      </div>
      <CdcSlotsTable />
      <Paragraph>
        <Anchor href="https://www.cdc.com.sg/" isExternal>
          ComfortDelGro Driving Centre (CDC)
        </Anchor>{" "}
        is one of the largest driving school centres in Singapore. It offers a
        wide range of driving courses and practical lessons for different types
        of vehicles including Class 3 and Class 3A Motorcar and Class 2B
        Motorcycle.
      </Paragraph>
      <Paragraph>
        When you enrol in a driving course at{" "}
        <abbr title="ComfortDelGro Driving Centre" className="no-underline">
          CDC
        </abbr>
        , you may need to book appointments for various services such as
        eyesight tests and counter services. Eyesight tests are required for all
        driving courses before you can book your theory tests and practical
        lessons. The appointment slots for these services are sometimes fully
        booked and you will need to constantly check the{" "}
        <abbr title="ComfortDelGro Driving Centre" className="no-underline">
          CDC
        </abbr>{" "}
        website for new appointment slots.
      </Paragraph>
      <Paragraph>
        <span className="font-medium">SG Alerts</span> is a free service that
        helps you to get notified when there are new appointment slots available
        at{" "}
        <abbr title="ComfortDelGro Driving Centre" className="no-underline">
          CDC
        </abbr>
        . You will receive an email notification when new appointment slots are
        available. If there&apos;s an earlier date available, you will also be
        notified. You save time and effort by not having to check the{" "}
        <abbr title="ComfortDelGro Driving Centre" className="no-underline">
          CDC
        </abbr>{" "}
        website manually every day.
      </Paragraph>
      <Paragraph>
        To get started, simply click either of the buttons below to subscribe to
        the Telegram channel and start receiving notifications.
      </Paragraph>
      <div className="mt-8 text-center flex flex-col gap-4">
        <Anchor
          href={`${TELEGRAM_SHORT_URL}/${TelegramChannel.CdcEyesightTest}`}
          isExternal
        >
          <Button variant="secondary">
            <span>
              <abbr
                title="ComfortDelGro Driving Centre"
                className="no-underline"
              >
                CDC
              </abbr>{" "}
              Appointment Slots (Eyesight Test)
            </span>
          </Button>
        </Anchor>
        <Anchor
          href={`${TELEGRAM_SHORT_URL}/${TelegramChannel.CdcCounterServices}`}
          isExternal
        >
          <Button variant="secondary" className="!inline-block">
            <span>
              <abbr
                title="ComfortDelGro Driving Centre"
                className="no-underline"
              >
                CDC
              </abbr>{" "}
              Appointment Slots (Counter Services)
            </span>
          </Button>
        </Anchor>
      </div>
    </Container>
  );
}
