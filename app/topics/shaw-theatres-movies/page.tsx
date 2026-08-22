import { Metadata } from "next";
import React from "react";
import { Anchor } from "@/components/ui/anchor";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import SubscribeLinkButton from "@/components/subscribe-link-button";
import AdUnit from "@/components/ad-unit";
import { MoviesTable } from "@/components/movies-table";
import { MovieService, Routes, TopicTitle } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";

const title = "Movies with English Subtitles (Shaw Theatres)";
const description =
  "Get notified when there are new movies with English subtitles showing at Shaw Theatres in Singapore.";
const url = Routes.MoviesShaw;

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

export default function ShawTheatresMovies() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Receive email notifications when there are new movies with English
          subtitles showing at Shaw Theatres.
        </Subheading>
      </div>
      <MoviesTable service={MovieService.SHAW} />
      <Paragraph>
        <Anchor href="https://shaw.sg/" isExternal>
          Shaw Theatres
        </Anchor>{" "}
        is a major cinema chain in Singapore, screening Hollywood blockbusters
        and Asian films across multiple locations islandwide. Supported
        languages for English subtitle alerts include English, Chinese, Korean,
        and Japanese.
      </Paragraph>
      <Paragraph>
        Many moviegoers prefer watching movies with English subtitles — whether
        for English blockbusters or foreign films—to ensure full dialogue
        comprehension and a better cinema experience.
      </Paragraph>
      <AdUnit />
      <Paragraph>
        <span className="font-medium">SG Alerts</span> monitors Shaw
        Theatres&apos; latest movie schedules and sends email notifications
        whenever new movies with English subtitles are now showing.
      </Paragraph>
      <Paragraph>
        To get started, click the button below to subscribe to Shaw Theatres
        movie alerts.
      </Paragraph>
      <div className="sticky bottom-6 z-50 mt-8 text-center">
        <SubscribeLinkButton
          route={Routes.EntertainmentCategory}
          linkText="Subscribe Now"
          topicTitle={TopicTitle.MoviesShaw}
        />
      </div>
    </Container>
  );
}
