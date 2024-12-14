import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import { Anchor } from "@/components/ui/anchor";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import TelegramLinkButton from "@/components/telegram-link-button";
import { Routes, TelegramChannel, TopicTitle } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import BbdcLessonSlotsInfo from "./bbdc-lesson-slots-info";

const title = "Bukit Batok Driving Centre Appointment Slots";
const description =
  "Subscribe to SG Alerts to get notified when there are new appointment date(s) are available at the Bukit Batok Driving Centre (BBDC) website.";
const url = Routes.BbdcAppointmentSlots;

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

export default function BBDCAppointmentSlots() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Subscribe to get notified when there are new appointment date(s)
          available at the Bukit Batok Driving Centre (BBDC) website.
        </Subheading>
      </div>
      <BbdcLessonSlotsInfo />
      <Paragraph>
        <Anchor href="https://info.bbdc.sg/" isExternal>
          Bukit Batok Driving Centre (BBDC)
        </Anchor>{" "}
        is one of the leading driving school centres in Singapore. They offer
        comprehensive and systematic driving and riding courses to individuals
        and qualified drivers including Class 3 and Class 3A Motorcar and Class
        2B Motorcycle.
      </Paragraph>
      <Paragraph>
        If you plan to enrol for a course at{" "}
        <abbr title="Bukit Batok Driving Centre" className="no-underline">
          BBDC
        </abbr>
        , you may need to{" "}
        <Anchor href="https://info.bbdc.sg/visitor-appointment/" isExternal>
          book an appointment
        </Anchor>{" "}
        for opening of new account and other counter services. The appointment
        slots for these services are sometimes fully booked and you will need to
        constantly check the{" "}
        <abbr title="Bukit Batok Driving Centre" className="no-underline">
          BBDC
        </abbr>{" "}
        website for available appointment slots.
      </Paragraph>
      <Paragraph>
        <span className="font-medium">SG Alerts</span> is a free service that
        helps you to get notified when there are new appointment slots available
        at{" "}
        <abbr title="Bukit Batok Driving Centre" className="no-underline">
          BBDC
        </abbr>
        . You will receive an email notification when new appointment slots are
        available. If there&apos;s an earlier date available, you will also be
        notified. You save time and effort by not having to check the{" "}
        <abbr title="Bukit Batok Driving Centre" className="no-underline">
          BBDC
        </abbr>{" "}
        website manually every day.
      </Paragraph>
      <Paragraph>
        To get started, simply click the button below to join the Telegram
        channel and start receiving notifications.
      </Paragraph>
      <div className="sticky bottom-6 z-50 mt-8 text-center">
        <TelegramLinkButton
          channel={TelegramChannel.BbdcAppointmentSlots}
          linkText="Subscribe Now"
          topicTitle={TopicTitle.BbdcAppointmentSlots}
        />
      </div>
    </Container>
  );
}
