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
import { DepositRateAnchor } from "@/components/deposit-rate-anchor";
import { DepositRatesChart } from "@/components/deposit-rates-chart";
import AdUnit from "@/components/ad-unit";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import {
  DepositRateBank,
  Routes,
  TelegramChannel,
  TopicTitle,
} from "@/lib/enums";

const title = "RHB Fixed Deposit Rates";
const description =
  "Analyse RHB fixed deposit rate trends in Singapore for the past 6 months, 1 year and 2 years.";
const url = Routes.FixedDepositRatesRhb;

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

export default function RhbFixedDepositRates() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>{description}</Subheading>
      </div>
      <DepositRatesChart bank={DepositRateBank.RHB} />
      <Paragraph>
        The chart above shows recent RHB fixed deposit rate trend movement.
        You can use this to decide when to{" "}
        <DepositRateAnchor bank={DepositRateBank.RHB} linkText="lock in" />{" "}
        your RHB fixed deposit for better returns.
      </Paragraph>
      <AdUnit />
      <Paragraph>
        <span className="font-medium">SG Alerts</span> is a free notification
        service that monitors fixed deposit rates from major banks in Singapore,
        including RHB, and sends Telegram notifications when rates go up.
      </Paragraph>
      <Paragraph>
        To get started, click the button below to join the Telegram channel and
        receive updates.
      </Paragraph>
      <div className="sticky bottom-6 z-50 mt-8 text-center">
        <TelegramLinkButton
          channel={TelegramChannel.FixedDepositRates}
          linkText="Subscribe Now"
          className="shadow-md"
          topicTitle={TopicTitle.FixedDepositRates}
        />
      </div>
      <div className="mt-4 text-center">
        <Button variant="secondary" asChild>
          <Link href={Routes.FixedDepositRates}>
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Go Back
          </Link>
        </Button>
      </div>
    </Container>
  );
}
