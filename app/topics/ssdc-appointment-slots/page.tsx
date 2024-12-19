import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import { Anchor } from "@/components/ui/anchor";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import TelegramLinkButton from "@/components/telegram-link-button";
import SubscribeLinkButton from "@/components/subscribe-link-button";
import PageScroller from "@/components/page-scroller";
import AdUnit from "@/components/ad-unit";
import { Routes, TelegramChannel, TopicTitle } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import { SsdcSlotsTable } from "./ssdc-slots-table";

const title = "Singapore Safety Driving Centre Appointment Slots";
const description =
  "Subscribe to SG Alerts to get notified when there are new appointment date(s) are available at the Singapore Safety Driving Centre (SSDC) website.";
const url = Routes.SsdcAppointmentSlots;

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

export default function SsdcAppointmentSlots() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Subscribe to get notified when there are new appointment date(s)
          available at the Singapore Safety Driving Centre (SSDC) website.
        </Subheading>
      </div>
      <SsdcSlotsTable />
      <Paragraph>
        <Anchor href="https://ssdcl.com.sg/" isExternal>
          Singapore Safety Driving Centre (SSDC)
        </Anchor>{" "}
        is one of the driving school centres in Singapore. It offers a wide
        range of driving courses and practical lessons for different types of
        vehicles including Class 3 / 3A Motorcar, Class 2 / 2A / 2B Motorcycle
        and Class 4 / 5 Heavy Vehicle.
      </Paragraph>
      <Paragraph>
        If you&apos;re planning to enrol at{" "}
        <abbr title="Singapore Safety Driving Centre" className="no-underline">
          SSDC
        </abbr>
        , you may need to{" "}
        <Anchor href="https://ssdcl.com.sg/e-appointment/" isExternal>
          book an appointment
        </Anchor>{" "}
        depending on the course you are interested or the service you are
        looking for. The appointment slots for these services are sometimes
        fully booked and you will need to constantly check the{" "}
        <abbr title="Singapore Safety Driving Centre" className="no-underline">
          SSDC
        </abbr>{" "}
        website for available slots.
      </Paragraph>
      <AdUnit />
      <Paragraph>
        <span className="font-medium">SG Alerts</span> is a free service that
        helps you to get notified when there are new appointment slots available
        at{" "}
        <abbr title="Singapore Safety Driving Centre" className="no-underline">
          SSDC
        </abbr>
        . You will receive a notification when new appointment slots are
        available. If there&apos;s an earlier date available, you will also be
        notified. You save time and effort by not having to check the{" "}
        <abbr title="Singapore Safety Driving Centre" className="no-underline">
          SSDC
        </abbr>{" "}
        website manually every day.
      </Paragraph>
      <Paragraph>
        To get started, simply click either of the buttons below to subscribe to
        the Telegram channel (for practical lesson booking or private learners)
        or to head over to the email notifications subscription page (for other
        appointments).
      </Paragraph>
      <PageScroller>
        <div className="mt-8 flex flex-col justify-center gap-4 text-center sm:flex-row">
          <div>
            <TelegramLinkButton
              channel={TelegramChannel.SsdcPracticalLessonBooking}
              linkText="For Practical Lesson Booking"
              topicTitle={TopicTitle.SsdcPracticalLessonBooking}
            />
          </div>
          <div>
            <TelegramLinkButton
              channel={TelegramChannel.SsdcPrivateLearners}
              linkText="For Private Learners"
              topicTitle={TopicTitle.SsdcPrivateLearners}
            />
          </div>
        </div>
        <div className="mt-4 text-center">
          <SubscribeLinkButton
            route={Routes.DrivingCategory}
            linkText="For Other Appointment Slots"
          />
        </div>
      </PageScroller>
    </Container>
  );
}
