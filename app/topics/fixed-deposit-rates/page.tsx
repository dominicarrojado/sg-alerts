import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import { Routes } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import { FixedDepositRatesTable } from "./fixed-deposit-rates-table";

const title = "Fixed Deposit Rates";
const description =
  "Subscribe to SG Alerts to get notified when the fixed deposit rates goes up across major banks in Singapore.";
const url = Routes.FixedDepositRates;

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

export default function FixedDepositRates() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Receive email notifications when the fixed deposit rates goes up
          across major banks in Singapore.
        </Subheading>
      </div>
      <FixedDepositRatesTable />
      <Paragraph>
        Fixed deposit rates are one of the most popular ways to earn interest on
        your money. However, the interest rates offered by banks in Singapore
        are constantly changing. It can be difficult to keep up with these
        changes and find the best rates.
      </Paragraph>
      <Paragraph>
        <span className="font-medium">SG Alerts</span> is a free notification
        service that monitors the fixed deposit rates offered by major banks in
        Singapore. It sends you an email notification when the rates go up so
        that you can take advantage of the higher rates.
      </Paragraph>
      <Paragraph>
        To get started, simply click the button below to head over to the
        subscription page. Once there, you can select{" "}
        <span className="font-medium">Fixed Deposit Rates</span> as one of the
        topics you want to subscribe to.
      </Paragraph>
      <div className="mt-8 text-center">
        <Button variant="secondary" asChild>
          <Link href={Routes.Home}>Subscribe Now</Link>
        </Button>
      </div>
    </Container>
  );
}
