import { Metadata } from "next";
import React from "react";
import { Anchor } from "@/components/ui/anchor";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import { ThemeParkFacilitiesTable } from "@/components/theme-park-facilities-table";
import AdUnit from "@/components/ad-unit";
import { Routes, ThemeParkService } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";

const title = "Shanghai Disneyland Attraction Updates";
const description =
  "Get notified on Disney Premier Access availability during the day and when Shanghai Disneyland attractions resume operations.";
const url = Routes.ShanghaiDisneylandAttractionUpdates;

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

export default function ShanghaiDisneylandAttractionUpdates() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>{description}</Subheading>
      </div>
      <ThemeParkFacilitiesTable
        service={ThemeParkService.ShanghaiDisneylandAttractions}
      />
      <Paragraph>
        <Anchor href="https://www.shanghaidisneyresort.com/en/" isExternal>
          Shanghai Disneyland
        </Anchor>{" "}
        is a popular theme park in China that Singapore residents frequently
        visit. It is not only popular for its attractions but also for its
        seasonal events and merchandise. It is truly a magical place for both
        children and adults alike.
      </Paragraph>
      <Paragraph>
        Due to the park&apos;s popularity, attractions may experience high
        demand, leading to longer wait times or temporary closures. Stay
        informed about attraction updates to make the most of your visit to
        Shanghai Disneyland.
      </Paragraph>
      <AdUnit />
    </Container>
  );
}
