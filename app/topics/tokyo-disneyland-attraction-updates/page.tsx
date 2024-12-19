import { Metadata } from "next";
import React from "react";
import { Anchor } from "@/components/ui/anchor";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import TelegramLinkButton from "@/components/telegram-link-button";
import { ThemeParkFacilitiesTable } from "@/components/theme-park-facilities-table";
import AdUnit from "@/components/ad-unit";
import {
  Routes,
  TelegramChannel,
  ThemeParkService,
  TopicTitle,
} from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";

const title = "Tokyo Disneyland Attraction Updates";
const description =
  "Get notified on Disney Premier Access, Standby Passes or 40th Anniversary Priority Passes availability during the day and when Tokyo Disneyland attractions resume operations.";
const url = Routes.TokyoDisneylandAttractionUpdates;

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

export default function TokyoDisneylandAttractionUpdates() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>{description}</Subheading>
      </div>
      <ThemeParkFacilitiesTable
        service={ThemeParkService.TokyoDisneylandAttractions}
        facilityUrlAffix="tdl"
      />
      <Paragraph>
        <Anchor href="https://www.tokyodisneyresort.jp/en/tdl" isExternal>
          Tokyo Disneyland
        </Anchor>{" "}
        is a popular theme park in Japan that Singapore residents frequently
        visit. It is not only popular for its attractions but also for its
        seasonal events and merchandise. It is truly a magical place for both
        children and adults.
      </Paragraph>
      <Paragraph>
        Due to its popularity, the park can get crowded, especially during peak
        seasons. As a result, the park has implemented various systems to manage
        the crowd and ensure that visitors have a pleasant experience. These
        systems include Standby Passes to limit the number of people within an
        attraction or area. There are also Disney Premier Access and 40th
        Anniversary Priority Passes which allow visitors to skip the queue and
        enjoy their favorite attractions without waiting for hours.
      </Paragraph>
      <Paragraph>
        However, due to the high demand, it can be challenging to secure these
        passes. They easily get sold out, and you may miss out on the
        opportunity to enjoy your favorite attractions. But did you know that
        sometimes people cancel their passes or new passes are released?
        Wouldn&apos;t it be great if you could get notified when this happens
        instead of constantly refreshing the mobile app?
      </Paragraph>
      <AdUnit />
      <Paragraph>
        <span className="font-medium">SG Alerts</span> is here to help! We
        created a dedicated Telegram channel that sends notifications on Disney
        Premier Access, Standby Passes or 40th Anniversary Priority Passes
        availability during the day. We also notify you when attractions resume
        operations after being temporarily suspended. Saving you time and effort
        so you can focus on enjoying your time at Tokyo Disneyland!
      </Paragraph>
      <Paragraph>
        To get started, simply click the button below to join the Telegram
        channel and start receiving notifications.
      </Paragraph>
      <div className="sticky bottom-6 z-50 mt-8 text-center">
        <TelegramLinkButton
          channel={TelegramChannel.TokyoDisneylandAttractions}
          linkText="Subscribe Now"
          topicTitle={TopicTitle.TokyoDisneylandAttractions}
        />
      </div>
    </Container>
  );
}
