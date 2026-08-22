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

const title = "Movies with English Subtitles (Golden Village)";
const description =
  "Get notified when there are new movies with English subtitles showing at Golden Village (GV) cinemas in Singapore.";
const url = Routes.MoviesGv;

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

export default function GoldenVillageMovies() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Receive email notifications when there are new movies with English
          subtitles showing at Golden Village.
        </Subheading>
      </div>
      <MoviesTable service={MovieService.GV} />
      <Paragraph>
        <Anchor href="https://www.gv.com.sg/" isExternal>
          Golden Village (GV)
        </Anchor>{" "}
        is one of Singapore&apos;s leading cinema operators, offering a wide
        range of movies across various multiplexes in Singapore. Supported
        languages for English subtitle alerts include English, Chinese, Korean,
        and Japanese.
      </Paragraph>
      <Paragraph>
        For non-native speakers or moviegoers who prefer reading subtitles,
        finding movies screened with English subtitles is essential for an
        enjoyable cinema experience.
      </Paragraph>
      <AdUnit />
      <Paragraph>
        <span className="font-medium">SG Alerts</span> monitors Golden
        Village&apos;s movie listings and sends email alerts whenever a new
        movie with English subtitles is now showing, ensuring you never miss out
        on new releases.
      </Paragraph>
      <Paragraph>
        To get started, click the button below to subscribe to Golden Village
        movie alerts.
      </Paragraph>
      <div className="sticky bottom-6 z-50 mt-8 text-center">
        <SubscribeLinkButton
          route={Routes.EntertainmentCategory}
          linkText="Subscribe Now"
          topicTitle={TopicTitle.MoviesGv}
        />
      </div>
    </Container>
  );
}
