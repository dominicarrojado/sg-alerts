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

const title = "DBS Altitude Visa Signature Card - Miles, Bonus & Fees";
const description =
  "Track DBS Altitude Visa Signature Card bonus miles promotions, local & overseas earn rates, annual fee waivers and KrisFlyer air miles rewards in Singapore.";
const url = Routes.MilesCreditCardsDbsAltitude;

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

export default function DbsAltitudePage() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>DBS Altitude Visa Signature Card</Heading>
        <Subheading>
          Track sign-up bonus miles, earn rates per dollar and annual fee terms
          in Singapore.
        </Subheading>
      </div>
      <MilesCreditCardDetails cardId={MilesCreditCardId.DBS_ALTITUDE} />
      <Paragraph>
        The{" "}
        <Anchor
          href={
            MILES_CREDIT_CARD_EXTERNAL_LINKS[MilesCreditCardId.DBS_ALTITUDE]
          }
          isExternal
        >
          DBS Altitude Visa Signature Card
        </Anchor>{" "}
        is one of Singapore&apos;s most popular entry-level travel credit cards,
        designed for everyday spenders looking to earn air miles with points
        that never expire.
      </Paragraph>
      <Paragraph>
        Cardholders benefit from accelerated earn rates on online flight and
        hotel bookings, alongside flexible DBS Points redemption across frequent
        flyer programmes including Singapore Airlines KrisFlyer, Cathay Pacific
        Asia Miles and Qantas. The card also offers accessible annual fee waiver
        options, making it a reliable choice for long-term miles accumulation.
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
