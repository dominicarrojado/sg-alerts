import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import { Anchor } from "@/components/ui/anchor";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import { OWNER_EMAIL, OWNER_NAME, OWNER_WEBSITE } from "@/lib/constants";
import { Routes } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "../shared-metadata";

const title = "How It Works";
const description = "Learn how SG Alerts works and the best way to use it.";
const url = Routes.About;

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

export default function HowToUse() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>{description}</Subheading>
      </div>
      <Paragraph>
        <span className="font-medium">SG Alerts</span> is a free notification
        service that monitors the websites and sends you an email notification
        or a Telegram message when there are new updates. It is designed to help
        you save time and effort by automating the process of checking for
        updates.
      </Paragraph>
      <Paragraph>
        <span className="font-medium">SG Alerts</span> is not affiliated with
        any of the websites it monitors. It is a personal project created by{" "}
        <Anchor href={OWNER_WEBSITE} target="_blank">
          {OWNER_NAME}
        </Anchor>{" "}
        to help others save time and effort.
      </Paragraph>
      <Paragraph>
        Since most alerts are sent via email, the best way to use{" "}
        <span className="font-medium">SG Alerts</span> is to make sure that you
        have access to your email at all times. This means that you should have
        your email app installed on your phone and have notifications enabled.
        You should also make sure that the email address you use to subscribe is
        one that you check regularly.
      </Paragraph>
      <Paragraph>
        Email inbox clutter is a real problem, so I recommend that you keep your
        inbox clean and tidy. Unsubscribe from any newsletters that you no
        longer read so that you can easily spot the email notifications from{" "}
        <span className="font-medium">SG Alerts</span>.
      </Paragraph>
      <Paragraph>
        Have a suggestions for new topics or alerts? <br />
        Have a website that you constantly check for updates? <br />
        Have an appointment system that&apos;s always fully booked? <br />
        Send an <Anchor href={`mailto:${OWNER_EMAIL}`}>email</Anchor> so I can
        consider it for SG Alerts.
      </Paragraph>
    </Container>
  );
}
