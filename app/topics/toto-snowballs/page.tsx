import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import { Anchor } from "@/components/ui/anchor";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import TelegramLinkButton from "@/components/telegram-link-button";
import AdUnit from "@/components/ad-unit";
import { Routes, TelegramChannel, TopicTitle } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import TotoSnowballInfo from "./toto-snowball-info";

const title = "TOTO Snowballs";
const description =
  "Subscribe to SG Alerts to get notified when the top prize for the next draw has snowballed from the latest TOTO results from Singapore Pools.";
const url = Routes.TotoSnowballs;

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

export default function TotoSnowballs() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Subscribe to get notified when the top prize for the next draw has
          snowballed from the latest TOTO results from Singapore Pools.
        </Subheading>
      </div>
      <TotoSnowballInfo />
      <Paragraph>
        <Anchor
          href="https://online.singaporepools.com/en/lottery/how-play-toto"
          isExternal
        >
          TOTO
        </Anchor>{" "}
        is a popular lottery game in Singapore where players select six numbers
        from 1 to 49. You can place your bet by purchasing TOTO tickets from
        authorized Singapore Pools outlets or via their mobile app. The draws
        are typically held twice a week, on Mondays and Thursdays and the
        starting jackpot is estimated at S$ 1,000,000. If no player matches all
        six numbers in a draw, the top prize &quot;snowballs&quot; or
        accumulates for the next draw, leading to potentially larger jackpots.
      </Paragraph>
      <Paragraph>
        If you prefer to join only when the top prize has snowballed to a
        certain amount, this is the perfect topic for you.{" "}
        <span className="font-medium">SG Alerts</span> is s a free service that
        notifies you via Telegram when the top prize for the next draw has
        snowballed from the{" "}
        <Anchor
          href="https://www.singaporepools.com.sg/en/product/Pages/toto_results.aspx"
          isExternal
        >
          latest TOTO results
        </Anchor>{" "}
        from Singapore Pools.
      </Paragraph>
      <Paragraph>
        To get started, simply click either of the buttons below to join the
        Telegram channel and start receiving notifications.
      </Paragraph>
      <div className="sticky bottom-6 z-50 mt-8 text-center">
        <TelegramLinkButton
          channel={TelegramChannel.TotoSnowballs}
          linkText="Subscribe Now"
          topicTitle={TopicTitle.TotoSnowballs}
        />
      </div>
      <Paragraph className="italic">
        Please note that <span className="font-medium">SG Alerts</span> is an
        independent service and is not affiliated with Singapore Pools. Always
        play responsibly and only bet with money you can afford.
      </Paragraph>
    </Container>
  );
}
