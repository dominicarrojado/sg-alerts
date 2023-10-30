import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import { Anchor } from "@/components/ui/anchor";
import { ExternalUrl, Routes } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import { CoeBiddingResultsTable } from "./coe-bidding-results-table";

const title = "Certificate of Entitlement (COE) Bidding Results";
const description =
  "Subscribe to SG Alerts to get notified when the COE premiums have decreased from the latest bidding results from OneMotoring by Land Transport Authority.";
const url = Routes.CoeBiddingResults;

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

export default function CoeBiddingResults() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Receive email notifications when the COE premiums have decreased from
          the latest bidding results from OneMotoring by Land Transport
          Authority (LTA).
        </Subheading>
      </div>
      <CoeBiddingResultsTable />
      <Paragraph>
        A <span className="font-medium">Certificate of Entitlement (COE)</span>{" "}
        gives you the right to own and use a vehicle in Singapore. All vehicles
        in Singapore require a COE. To register a vehicle, you must first place
        a bid for a COE in the corresponding vehicle category. A successful COE
        bid gives you the right to own a vehicle that can be used on the road
        for 10 years.
      </Paragraph>
      <Paragraph>
        The COE bidding system is a monthly auction where bidders outbid each
        other to obtain a COE during the bidding exercise by keying in the
        reserve price. The reserve price is the maximum bid amount that a bidder
        is prepared to pay for the COE. The bidding process is conducted by the
        LTA and the results are published on their{" "}
        <Anchor href={ExternalUrl.OneMotoring} isExternal>
          OneMotoring
        </Anchor>{" "}
        website.
      </Paragraph>
      <Paragraph>
        Bidding exercises usually start at 12pm on the first and third Monday of
        the month, and last for 3 working days. The exercises end in the same
        week, at 4pm on Wednesday, if there is no public holiday in between. If
        you are thinking of buying a vehicle, it is important to keep track of
        the COE premiums so that you can make an informed decision.
      </Paragraph>
      <Paragraph>
        <span className="font-medium">SG Alerts</span> is a free notification
        service that monitors the COE bidding results published by the LTA. It
        sends you an email notification when the COE premiums have decreased
        from the latest bidding results.
      </Paragraph>
      <Paragraph>
        To get started, simply click the button below to head over to the
        subscription page. Once there, you can select{" "}
        <span className="font-medium">{title}</span> as one of the topics you
        want to subscribe to.
      </Paragraph>
      <div className="mt-8 text-center">
        <Link href={Routes.Home}>
          <Button variant="secondary">Subscribe Now</Button>
        </Link>
      </div>
    </Container>
  );
}
