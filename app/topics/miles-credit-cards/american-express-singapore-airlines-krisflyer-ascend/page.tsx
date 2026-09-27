import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { ArrowLeftIcon } from "lucide-react";
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
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";

const title =
  "American Express Singapore Airlines KrisFlyer Ascend Credit Card - Miles, Bonus & Fees";
const description =
  "Track American Express Singapore Airlines KrisFlyer Ascend Credit Card bonus miles promotions, earn rates, annual fee policies, and travel benefits in Singapore.";
const url =
  Routes.MilesCreditCardsAmericanExpressSingaporeAirlinesKrisFlyerAscend;

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

export default function AmericanExpressSingaporeAirlinesKrisFlyerAscendPage() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>
          American Express Singapore Airlines KrisFlyer Ascend Credit Card
        </Heading>
        <Subheading>
          Track sign-up bonus miles, earn rates per dollar, and annual fee terms
          in Singapore.
        </Subheading>
      </div>
      <MilesCreditCardDetails
        cardId={MilesCreditCardId.AMEX_KRISFLYER_ASCEND}
      />
      <Paragraph>
        The American Express Singapore Airlines KrisFlyer Ascend Credit Card is
        an established co-branded travel card designed for Singapore Airlines
        flyers looking to accumulate KrisFlyer miles directly without transfer
        fees.
      </Paragraph>
      <Paragraph>
        Cardholders enjoy premium travel conveniences including annual
        complimentary hotel night privileges and airport lounge access vouchers.
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
