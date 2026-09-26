import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import TelegramLinkButton from "@/components/telegram-link-button";
import AdUnit from "@/components/ad-unit";
import { Routes, TelegramChannel, TopicTitle } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import { MilesCreditCardsTable } from "./miles-credit-cards-table";

const title = "Miles Credit Cards";
const description =
  "Subscribe to SG Alerts to get notified when bonus miles promotions increase or new miles credit card deals launch across major banks in Singapore.";
const url = Routes.MilesCreditCards;

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

export default function MilesCreditCards() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Receive notifications when bonus miles promotions increase or new
          miles credit cards are added across major banks in Singapore.
        </Subheading>
      </div>
      <MilesCreditCardsTable />
      <Paragraph>
        Miles credit cards are one of the most rewarding ways to earn airline
        miles on everyday spending in Singapore. From entry-level general spend
        cards to premium travel cards, cardholders can earn miles per dollar
        (mpd) on local and foreign currency purchases, redeemable for flights on
        Singapore Airlines KrisFlyer and other frequent flyer programmes.
      </Paragraph>
      <Paragraph>
        Banks in Singapore regularly update their welcome bonus miles offers,
        frequently offering sign-up bonuses ranging from 10,000 to over 60,000
        miles upon meeting minimum spend or annual fee payment criteria.
        However, promotional terms and bonus miles change often, making it hard
        to know when the best time to apply is.
      </Paragraph>
      <AdUnit />
      <Paragraph>
        <span className="font-medium">SG Alerts</span> is a free notification
        service that tracks credit card sign-up bonuses and earn rates across
        major issuers including DBS, UOB, OCBC, Citibank, HSBC, Standard
        Chartered, and American Express. It sends you a Telegram notification
        whenever bonus miles increase so you never miss an elevated welcome
        offer.
      </Paragraph>
      <Paragraph>
        To get started, simply click the button below to join the Telegram
        channel and start receiving real-time bonus miles alerts.
      </Paragraph>
      <div className="sticky bottom-6 z-50 mt-8 text-center">
        <TelegramLinkButton
          channel={TelegramChannel.MilesCreditCards}
          linkText="Subscribe Now"
          className="shadow-md"
          topicTitle={TopicTitle.MilesCreditCards}
        />
      </div>
    </Container>
  );
}
