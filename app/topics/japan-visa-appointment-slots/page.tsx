import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import { Anchor } from "@/components/ui/anchor";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import TelegramLinkButton from "@/components/telegram-link-button";
import SubscribeLinkButton from "@/components/subscribe-link-button";
import PageScroller from "@/components/page-scroller";
import AdUnit from "@/components/ad-unit";
import { Routes, TelegramChannel, TopicTitle } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import { JapanVisaSlotsTable } from "./japan-visa-slots-table";

const title = "Japan Visa Appointment Slots";
const description =
  "Subscribe to SG Alerts to get notified when there are new appointment date(s) for visa application at the Embassy of Japan in Singapore.";
const url = Routes.JapanVisa;

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

export default function JapanVisa() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Subscribe to get notified when there are new appointment date(s) for
          visa application at the Embassy of Japan in Singapore.
        </Subheading>
      </div>
      <JapanVisaSlotsTable />
      <Paragraph>
        Are you tired of constantly checking the Embassy of Japan in Singapore
        website for an available appointment date for your{" "}
        <Anchor
          href="https://www.sg.emb-japan.go.jp/itpr_en/visit.html"
          isExternal
        >
          visa application
        </Anchor>
        , only to find none available day after day? Are you frustrated with
        having to pay expensive agency fees just to secure a slot? If so,{" "}
        <span className="font-medium">SG Alerts</span> is here to help.
      </Paragraph>
      <Paragraph>
        This free notification service automatically monitors the Embassy of
        Japan in Singapore&apos;s website for any available booking slots for
        visa applications and sends out email or Telegram notifications to our
        subscribers the moment a slot becomes available. If there are earlier
        dates available, you would also be notified.
      </Paragraph>
      <AdUnit />
      <Paragraph>
        I created this service because I had the same problem when applying for
        my Japan tourist visa. The embassy had turned off the waitlist feature,
        making it nearly impossible to secure a slot without paying exorbitant
        agency fees to do it for you. I knew there had to be a better way, so I
        created a service that could automatically monitor the embassy&apos;s
        website and notify me when a slot became available. I&apos;m sure there
        are many others who are in the same situation, so I decided to make this
        service available for everyone.
      </Paragraph>
      <Paragraph>
        To get started, simply click either of the buttons below to subscribe to
        the Telegram channel (for tourism) or to head over to the email
        notifications subscription page (for other visa applications and
        services).
      </Paragraph>
      <PageScroller>
        <div className="mt-8 flex flex-col justify-center gap-4 text-center sm:flex-row">
          <div>
            <TelegramLinkButton
              channel={TelegramChannel.JapanVisaTourism}
              linkText="For Tourism"
              topicTitle={TopicTitle.JapanVisaTourism}
            />
          </div>
          <div>
            <SubscribeLinkButton
              route={Routes.JapanVisaCategory}
              linkText="For Business/COE/Spouse"
            />
          </div>
        </div>
        <div className="mt-4 text-center">
          <TelegramLinkButton
            channel={TelegramChannel.JapanVisaOthers}
            linkText="For Other Visa Applications/Services"
            topicTitle={TopicTitle.JapanVisaOthers}
          />
        </div>
      </PageScroller>
    </Container>
  );
}
