import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Anchor } from "@/components/ui/anchor";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import TelegramLinkButton from "@/components/telegram-link-button";
import AdUnit from "@/components/ad-unit";
import { MilesCreditCardDetails } from "../miles-credit-card-details";
import {
  MilesCreditCardId,
  Routes,
  TelegramChannel,
  TopicTitle,
} from "@/lib/enums";
import { MILES_CREDIT_CARD_EXTERNAL_LINKS } from "@/lib/constants";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";

const title = "Standard Chartered Visa Infinite Card - Miles, Bonus & Fees";
const description =
  "Track Standard Chartered Visa Infinite Card bonus miles promotions, local & overseas earn rates, annual fee policies and KrisFlyer air miles rewards in Singapore.";
const url = Routes.MilesCreditCardsStandardCharteredVisaInfinite;

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

export default function StandardCharteredVisaInfinitePage() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>Standard Chartered Visa Infinite Card</Heading>
        <Subheading>
          Track sign-up bonus miles, earn rates per dollar and annual fee terms
          in Singapore.
        </Subheading>
      </div>
      <MilesCreditCardDetails cardId={MilesCreditCardId.SCB_VISA_INFINITE} />
      <Paragraph>
        The{" "}
        <Anchor
          href={
            MILES_CREDIT_CARD_EXTERNAL_LINKS[
              MilesCreditCardId.SCB_VISA_INFINITE
            ]
          }
          isExternal
        >
          Standard Chartered Visa Infinite Card
        </Anchor>{" "}
        is one of Singapore&apos;s established premium travel cards, designed
        for frequent flyers and travelers looking to maximise air miles
        accumulation on eligible retail and overseas purchases.
      </Paragraph>
      <Paragraph>
        Because premium cards typically carry structured annual fee policies,
        timing your application with an elevated welcome bonus campaign ensures
        you get optimal reward value right from the start.
      </Paragraph>
      <AdUnit />
      <Paragraph>
        <span className="font-medium">SG Alerts</span> tracks promotional bonus
        miles campaigns and earn rate updates across Singapore credit cards.
        Subscribe to get notified immediately via Telegram whenever welcome
        bonuses increase.
      </Paragraph>
      <div className="sticky bottom-6 z-50 mt-8 text-center">
        <TelegramLinkButton
          channel={TelegramChannel.MilesCreditCards}
          linkText="Subscribe Now"
          className="shadow-md"
          topicTitle={TopicTitle.MilesCreditCards}
        />
      </div>
      <div className="mt-4 text-center">
        <Button variant="secondary" asChild>
          <Link href={Routes.MilesCreditCards}>
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to All Miles Credit Cards
          </Link>
        </Button>
      </div>
    </Container>
  );
}
