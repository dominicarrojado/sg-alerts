import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Anchor } from "@/components/ui/anchor";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import { Routes } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import { TrainTicketsTable } from "./train-tickets-table";
import { TrainScheduleTable } from "./train-schedule-table";

const title = "KTM Train Tickets";
const description =
  "Subscribe to SG Alerts to get notified when there are KTM train tickets available from Singapore to Johor Bahru (JB) and vice versa from Easybooking.com website.";
const url = Routes.KtmTrainTickets;

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

export default function KtmTrainTickets() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Receive email notifications when there are{" "}
          <abbr title="Keretapi Tanah Melayu" className="no-underline">
            KTM
          </abbr>{" "}
          train tickets available from Singapore to Johor Bahru (
          <abbr title="Johor Bahru" className="no-underline">
            JB
          </abbr>
          ) and vice versa.
        </Subheading>
      </div>
      <TrainTicketsTable />
      <Paragraph>
        <span className="font-medium">
          <abbr title="Keretapi Tanah Melayu" className="no-underline">
            KTM
          </abbr>{" "}
          Train
        </span>{" "}
        is a popular mode of transport for people travelling between Singapore
        and Johor Bahru (
        <abbr title="Johor Bahru" className="no-underline">
          JB
        </abbr>
        ). Tickets are often sold out quickly, especially during peak periods.{" "}
        <abbr title="Johor Bahru" className="no-underline">
          JB
        </abbr>{" "}
        is a popular destination for Singaporeans to visit for shopping, dining
        and entertainment. You can either book your train tickets directly from{" "}
        <abbr title="Keretapi Tanah Melayu" className="no-underline">
          KTM
        </abbr>{" "}
        or you can book from{" "}
        <Anchor
          href="https://www.easybook.com/en-sg/train/booking/singapore-to-johor"
          isExternal
        >
          Easybook.com
        </Anchor>{" "}
        website.
      </Paragraph>
      <Paragraph>
        Due to the high demand for{" "}
        <abbr title="Keretapi Tanah Melayu" className="no-underline">
          KTM
        </abbr>{" "}
        train tickets, peak days and time slots are often sold out quickly. You
        will have to keep checking the booking websites to see if there are new
        tickets available or if someone has cancelled their tickets. This can be
        time-consuming and frustrating.
      </Paragraph>
      <Paragraph>
        <span className="font-medium">SG Alerts</span> can help you to stay
        updated with the latest{" "}
        <abbr title="Keretapi Tanah Melayu" className="no-underline">
          KTM
        </abbr>{" "}
        train tickets availability up to 3 months in advance. We will send you
        an email notification when there are new tickets available. This will
        save you time and effort from having to check the booking websites
        frequently.
      </Paragraph>
      <Paragraph>
        We have identified that Friday evenings, Saturday mornings are the most
        popular times for people to travel from Singapore to{" "}
        <abbr title="Johor Bahru" className="no-underline">
          JB
        </abbr>
        . On the other hand, Sunday evenings are the most popular times for
        people to travel from{" "}
        <abbr title="Johor Bahru" className="no-underline">
          JB
        </abbr>{" "}
        to Singapore. See the table below for which dates and times are being
        monitored for ticket availability.
      </Paragraph>
      <TrainScheduleTable />
      <Paragraph>
        To get started, simply click the button below to head over to the
        subscription page. Once there, you can select{" "}
        <span className="font-medium">
          Train Tickets (
          <abbr title="Keretapi Tanah Melayu" className="no-underline">
            KTM
          </abbr>
          )
        </span>{" "}
        as one of the topics you want to subscribe to.
      </Paragraph>
      <div className="mt-8 text-center">
        <Link href={Routes.Home}>
          <Button variant="secondary">Subscribe Now</Button>
        </Link>
      </div>
    </Container>
  );
}
