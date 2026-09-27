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
  "American Express Singapore Airlines KrisFlyer Credit Card - Miles, Bonus & Fees";
const description =
  "Track American Express Singapore Airlines KrisFlyer Credit Card bonus miles promotions, earn rates, annual fee policies, and travel benefits in Singapore.";
const url = Routes.MilesCreditCardsAmericanExpressSingaporeAirlinesKrisFlyer;

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

export default function AmericanExpressSingaporeAirlinesKrisFlyerPage() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>
          American Express Singapore Airlines KrisFlyer Credit Card
        </Heading>
        <Subheading>
          Track sign-up bonus miles, earn rates per dollar, and annual fee terms
          in Singapore.
        </Subheading>
      </div>
      <MilesCreditCardDetails cardId={MilesCreditCardId.AMEX_KRISFLYER} />
      <Paragraph>
        The{" "}
        <Anchor
          href={
            MILES_CREDIT_CARD_EXTERNAL_LINKS[MilesCreditCardId.AMEX_KRISFLYER]
          }
          isExternal
        >
          American Express Singapore Airlines KrisFlyer Credit Card
        </Anchor>{" "}
        is an entry-level co-branded travel card designed for everyday spenders
        looking to accumulate KrisFlyer miles directly with no conversion fees.
      </Paragraph>
      <Paragraph>
        Cardholders benefit from direct monthly miles crediting into their
        KrisFlyer account, bonus earn rates on Singapore Airlines, Scoot,
        KrisShop, and Grab spend, a first-year annual fee waiver, and
        complimentary travel inconvenience and accident insurance coverage.
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
