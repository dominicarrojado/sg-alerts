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

const title = "UOB PRVI Miles Card - Miles, Bonus & Fees";
const description =
  "Track UOB PRVI Miles Card bonus miles promotions, local & overseas earn rates, annual fee waivers, and travel benefits in Singapore.";
const url = Routes.MilesCreditCardsUobPrviMiles;

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

export default function UobPrviMilesPage() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>UOB PRVI Miles Card</Heading>
        <Subheading>
          Track sign-up bonus miles, earn rates per dollar, and annual fee terms
          in Singapore.
        </Subheading>
      </div>
      <MilesCreditCardDetails cardId={MilesCreditCardId.UOB_PRVI_MILES} />
      <Paragraph>
        The{" "}
        <Anchor
          href={
            MILES_CREDIT_CARD_EXTERNAL_LINKS[MilesCreditCardId.UOB_PRVI_MILES]
          }
          isExternal
        >
          UOB PRVI Miles Card
        </Anchor>{" "}
        is an entry-level travel credit card designed for fast air miles
        accumulation across general everyday spending, regional travel, and
        overseas purchases.
      </Paragraph>
      <Paragraph>
        Cardholders earn UNI$ that can be converted into air miles across major
        frequent flyer programmes including Singapore Airlines KrisFlyer and
        Cathay Pacific Asia Miles. The card features elevated earn rates on
        overseas and regional purchases, four complimentary Priority Pass
        airport lounge visits per calendar year for principal cardmembers (with
        additional or guest visits chargeable), travel inconvenience and
        accident insurance coverage, and first-year annual fee waiver options.
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
