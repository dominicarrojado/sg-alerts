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

const title = "OCBC VOYAGE Card - Miles, Bonus & Fees";
const description =
  "Track OCBC VOYAGE Card bonus miles promotions, local & overseas earn rates, annual fee policies, and VOYAGE Miles redemption perks in Singapore.";
const url = Routes.MilesCreditCardsOcbcVoyage;

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

export default function OcbcVoyagePage() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>OCBC VOYAGE Card</Heading>
        <Subheading>
          Track sign-up bonus miles, earn rates per dollar, and annual fee terms
          in Singapore.
        </Subheading>
      </div>
      <MilesCreditCardDetails cardId={MilesCreditCardId.OCBC_VOYAGE} />
      <Paragraph>
        The{" "}
        <Anchor
          href={MILES_CREDIT_CARD_EXTERNAL_LINKS[MilesCreditCardId.OCBC_VOYAGE]}
          isExternal
        >
          OCBC VOYAGE Card
        </Anchor>{" "}
        is a premium metal travel card offering flexible air miles redemption
        with no expiry, unlimited airport lounge access, and round-the-clock
        VOYAGE Exchange concierge services.
      </Paragraph>
      <Paragraph>
        Cardholders earn VOYAGE Miles that can be redeemed directly for flights
        on any airline with no blackout dates, or converted across partner
        frequent flyer and hotel loyalty programmes. The card features unlimited
        complimentary access to DragonPass airport lounges worldwide for
        principal cardmembers, airport limousine transfer privileges with
        qualifying spend, and bonus miles awarded upon payment of the annual
        service fee. Because the principal annual fee is strictly non-waivable,
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
