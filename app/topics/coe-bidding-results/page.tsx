import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import { Anchor } from "@/components/ui/anchor";
import SubscribeLinkButton from "@/components/subscribe-link-button";
import { Routes } from "@/lib/enums";
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
          Receive email notifications when the{" "}
          <abbr title="Certificate of Entitlement" className="no-underline">
            COE
          </abbr>{" "}
          premiums have decreased from the latest bidding results from
          OneMotoring by Land Transport Authority (LTA).
        </Subheading>
      </div>
      <CoeBiddingResultsTable />
      <Paragraph>
        A <span className="font-medium">Certificate of Entitlement (COE)</span>{" "}
        gives you the right to own and use a vehicle in Singapore. All vehicles
        in Singapore require a{" "}
        <abbr title="Certificate of Entitlement" className="no-underline">
          COE
        </abbr>
        . To register a vehicle, you must first place a bid for a{" "}
        <abbr title="Certificate of Entitlement" className="no-underline">
          COE
        </abbr>{" "}
        in the corresponding vehicle category. A successful{" "}
        <abbr title="Certificate of Entitlement" className="no-underline">
          COE
        </abbr>{" "}
        bid gives you the right to own a vehicle that can be used on the road
        for 10 years.
      </Paragraph>
      <Paragraph>
        The{" "}
        <Anchor
          href="https://onemotoring.lta.gov.sg/content/onemotoring/home/buying/coe-open-bidding.html"
          isExternal
        >
          <abbr title="Certificate of Entitlement" className="no-underline">
            COE
          </abbr>{" "}
          bidding
        </Anchor>{" "}
        system is a monthly auction where bidders outbid each other to obtain a{" "}
        <abbr title="Certificate of Entitlement" className="no-underline">
          COE
        </abbr>{" "}
        during the bidding exercise by keying in the reserve price. The reserve
        price is the maximum bid amount that a bidder is prepared to pay for the{" "}
        <abbr title="Certificate of Entitlement" className="no-underline">
          COE
        </abbr>
        . The bidding process is conducted by the{" "}
        <abbr title="Land Transport Authority" className="no-underline">
          LTA
        </abbr>{" "}
        and the results are published on their OneMotoring website.
      </Paragraph>
      <Paragraph>
        Bidding exercises usually start at 12pm on the first and third Monday of
        the month, and last for 3 working days. The exercises end in the same
        week, at 4pm on Wednesday, if there is no public holiday in between. If
        you are thinking of buying a vehicle, it is important to keep track of
        the{" "}
        <abbr title="Certificate of Entitlement" className="no-underline">
          COE
        </abbr>{" "}
        premiums so that you can make an informed decision.
      </Paragraph>
      <Paragraph>
        <span className="font-medium">SG Alerts</span> is a free notification
        service that monitors the{" "}
        <abbr title="Certificate of Entitlement" className="no-underline">
          COE
        </abbr>{" "}
        bidding results published by the{" "}
        <abbr title="Land Transport Authority" className="no-underline">
          LTA
        </abbr>
        . It sends you an email notification when the{" "}
        <abbr title="Certificate of Entitlement" className="no-underline">
          COE
        </abbr>{" "}
        premiums have decreased from the latest bidding results.
      </Paragraph>
      <Paragraph>
        To get started, simply click the button below to head over to the
        subscription page. Once there, you can select{" "}
        <span className="font-medium">{title}</span> as one of the topics you
        want to subscribe to.
      </Paragraph>
      <div className="sticky bottom-6 z-50 mt-8 text-center">
        <SubscribeLinkButton
          route={Routes.DrivingCategory}
          linkText="Subscribe Now"
        />
      </div>
    </Container>
  );
}
