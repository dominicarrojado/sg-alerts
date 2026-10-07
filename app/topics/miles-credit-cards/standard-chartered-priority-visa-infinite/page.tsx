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

const title =
  "Standard Chartered Priority Banking Visa Infinite Credit Card - Miles, Bonus & Fees";
const description =
  "Track Standard Chartered Priority Banking Visa Infinite Credit Card bonus miles promotions, relationship earn rates, annual fee policies and travel benefits in Singapore.";
const url = Routes.MilesCreditCardsStandardCharteredPriorityVisaInfinite;

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

export default function StandardCharteredPriorityVisaInfinitePage() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>
          Standard Chartered Priority Banking Visa Infinite Credit Card
        </Heading>
        <Subheading>
          Track sign-up bonus miles, earn rates per dollar and annual fee terms
          in Singapore.
        </Subheading>
      </div>
      <MilesCreditCardDetails
        cardId={MilesCreditCardId.SCB_PRIORITY_VISA_INFINITE}
      />
      <Paragraph>
        The{" "}
        <Anchor
          href={
            MILES_CREDIT_CARD_EXTERNAL_LINKS[
              MilesCreditCardId.SCB_PRIORITY_VISA_INFINITE
            ]
          }
          isExternal
        >
          Standard Chartered Priority Banking Visa Infinite Credit Card
        </Anchor>{" "}
        is an exclusive premium travel card curated for Priority Banking
        clients, designed to accelerate air miles accumulation through both
        daily card spending and total banking relationship balances.
      </Paragraph>
      <Paragraph>
        Cardholders earn non-expiring 360° Rewards Points redeemable for airline
        miles across frequent flyer programmes like Singapore Airlines
        KrisFlyer. The card features relationship bonus rewards across savings,
        investments and mortgage balances, complimentary Priority Pass airport
        lounge visits, travel medical insurance coverage, a dedicated 24-hour
        Priority Banking service line and first-year annual fee waiver options.
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
