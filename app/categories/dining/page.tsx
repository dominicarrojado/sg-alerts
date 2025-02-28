import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import SubscribeForm from "@/components/subscribe-form";
import { Routes } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import { DINING_NOTIFICATION_SETTINGS } from "@/lib/content";

const title = "Dining in Singapore";
const description =
  "Subscribe to get notified to topics related to dining in Singapore such as table reservation slots.";
const url = Routes.DiningCategory;

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

export default function Dining() {
  return (
    <>
      <Container>
        <div className="mb-6 space-y-2">
          <Heading>{title}</Heading>
          <Subheading>{description}</Subheading>
        </div>
        <SubscribeForm
          defaultTopics={DINING_NOTIFICATION_SETTINGS}
          backButtonRoute={Routes.Home}
        />
      </Container>
    </>
  );
}
