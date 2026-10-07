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

const title = "KrisFlyer UOB Credit Card - Miles, Bonus & Fees";
const description =
  "Track KrisFlyer UOB Credit Card bonus miles promotions, Singapore Airlines earn rates, annual fee waivers and travel benefits in Singapore.";
const url = Routes.MilesCreditCardsKrisFlyerUob;

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

export default function KrisFlyerUobPage() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>KrisFlyer UOB Credit Card</Heading>
        <Subheading>
          Track sign-up bonus miles, earn rates per dollar and annual fee terms
          in Singapore.
        </Subheading>
      </div>
      <MilesCreditCardDetails cardId={MilesCreditCardId.KRISFLYER_UOB} />
      <Paragraph>
        The{" "}
        <Anchor
          href={
            MILES_CREDIT_CARD_EXTERNAL_LINKS[MilesCreditCardId.KRISFLYER_UOB]
          }
          isExternal
        >
          KrisFlyer UOB Credit Card
        </Anchor>{" "}
        is a popular co-branded travel credit card designed for Singapore
        Airlines and Scoot loyalists looking to maximise miles on flight
        bookings and everyday spending.
      </Paragraph>
      <Paragraph>
        Cardholders benefit from accelerated earn rates across Singapore
        Airlines, Scoot, KrisShop and Kris+ transactions, along with direct
        miles crediting to their KrisFlyer account without conversion fees. The
        card also features exclusive Scoot travel privileges and a pathway to
        KrisFlyer Elite Silver status, making it an ideal choice for frequent
        travelers within the Singapore Airlines network.
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
