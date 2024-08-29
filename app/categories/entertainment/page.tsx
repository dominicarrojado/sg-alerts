import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import { Routes } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import SubscribeForm from "@/components/subscribe-form";
import { ENTERTAINMENT_NOTIFICATION_SETTINGS } from "@/lib/content";

const title = "Entertainment in Singapore";
const description =
  "Subscribe to get notified to topics related to entertainment in Singapore such as new movie releases.";
const url = Routes.EntertainmentCategory;

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

export default function Entertainment() {
  return (
    <>
      <Container>
        <div className="space-y-2 mb-6">
          <Heading>{title}</Heading>
          <Subheading>{description}</Subheading>
        </div>
        <SubscribeForm
          defaultTopics={ENTERTAINMENT_NOTIFICATION_SETTINGS}
          withBackButton
        />
      </Container>
    </>
  );
}
