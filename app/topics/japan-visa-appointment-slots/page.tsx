import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { Container } from "@/components/ui/container";
import { Anchor } from "@/components/ui/anchor";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import { ExternalUrl, Routes } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import JapanVisaSlotsInfo from "./japan-visa-slots-info";

const title = "Japan Visa Appointment Slots";
const description =
  "Subscribe to SG Alerts to get notified when there are new appointment date(s) for tourist visa application at the Embassy of Japan in Singapore.";
const url = Routes.JapanVisa;

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

export default function JapanVisa() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Subscribe to get notified when there are new appointment date(s) for
          tourist visa application at the Embassy of Japan in Singapore.
        </Subheading>
      </div>
      <JapanVisaSlotsInfo />
      <Paragraph>
        Are you tired of constantly checking the Embassy of Japan in Singapore
        website for an available appointment date for{" "}
        <Anchor href={ExternalUrl.JapanVisa} isExternal>
          tourist visa application
        </Anchor>
        , only to find none available day after day? Are you frustrated with
        having to pay expensive agency fees just to secure a slot? If so,{" "}
        <span className="font-medium">SG Alerts</span> is here to help.
      </Paragraph>
      <Paragraph>
        This free notification service automatically monitors the Embassy of
        Japan in Singapore&apos;s website for any available booking slots for
        tourism visa applications, and sends out email notifications to our
        subscribers the moment a slot becomes available.
      </Paragraph>
      <Paragraph>
        I created this service because I had the same problem when applying for
        my Japan tourist visa. The embassy had turned off the waitlist feature,
        making it nearly impossible to secure a slot without paying exorbitant
        agency fees to do it for you. I knew there had to be a better way, so I
        created a service that could automatically monitor the embassy&apos;s
        website and notify me when a slot became available. I&apos;m sure there
        are many others who are in the same situation, so I decided to make this
        service available for everyone.
      </Paragraph>
      <Paragraph>
        To get started, simply click the button below to head over to the
        subscription page. Once there, you can select{" "}
        <span className="font-medium">
          Japan Visa Appointment Slots (Tourism)
        </span>{" "}
        as one of the topics you want to subscribe to.
      </Paragraph>
      <div className="mt-8 text-center">
        <Link href={Routes.Home}>
          <Button variant="secondary">Subscribe Now</Button>
        </Link>
      </div>
    </Container>
  );
}
