import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import SubscribeForm from "@/components/subscribe-form";
import { Routes } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import { EVENTS_NOTIFICATION_SETTINGS } from "@/lib/content";

const title = "Events in Singapore";
const description =
  "Subscribe to get notified to topics related to events in Singapore such as community blood donation drives.";
const url = Routes.EventsCategory;

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

export default function Events() {
  return (
    <>
      <Container>
        <div className="mb-6 space-y-2">
          <Heading>{title}</Heading>
          <Subheading>{description}</Subheading>
        </div>
        <SubscribeForm
          defaultTopics={EVENTS_NOTIFICATION_SETTINGS}
          backButtonRoute={Routes.Home}
        />
      </Container>
    </>
  );
}
