"use client";

import Link from "next/link";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Anchor } from "@/components/ui/anchor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTelegramChannelUrl } from "@/lib/telegram";
import { trackEvent } from "@/lib/google-analytics";
import { GoogleAnalyticsEvent, Routes } from "@/lib/enums";
import type { TelegramPublicChannels } from "@/lib/types";

type Props = {
  channels: TelegramPublicChannels;
  withBackButton?: boolean;
};

export default function TelegramChannels({ channels, withBackButton }: Props) {
  const viewDetailsText = "View Details";
  const topicOnClick = (title: string, linkUrl: string, linkText?: string) => {
    trackEvent({
      linkText,
      linkUrl,
      event: GoogleAnalyticsEvent.TOPIC_CLICK,
      topicTitle: title,
    });
  };
  const topicPageOnClick = (title: string, linkUrl: string) => {
    trackEvent({
      linkUrl,
      event: GoogleAnalyticsEvent.TOPIC_PAGE_CLICK,
      topicTitle: title,
      linkText: viewDetailsText,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Telegram Channels <Badge>NEW</Badge>
        </CardTitle>
        <CardDescription>
          Subscribe to the channels below if you want to receive notifications
          via Telegram. <br />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {channels.map(({ id, title, description, topicRoute }) => {
            const channelUrl = getTelegramChannelUrl(id);

            return (
              <div key={id} className="rounded-lg border p-4">
                <div className="flex w-full flex-row items-center justify-between font-normal no-underline">
                  <div className="space-y-0.5 pr-2">
                    <Anchor
                      href={channelUrl}
                      className="text-base no-underline"
                      onClick={() => topicOnClick(title, channelUrl, title)}
                      isExternal
                    >
                      {title}
                    </Anchor>
                    <div className="text-sm font-light text-muted-foreground">
                      {description}
                    </div>
                  </div>
                  <Anchor
                    href={channelUrl}
                    className="shrink-0 px-2 no-underline"
                    onClick={() => topicOnClick(title, channelUrl)}
                    isExternal
                  >
                    <ExternalLinkIcon />
                  </Anchor>
                </div>
                {topicRoute && (
                  <Button
                    variant="link"
                    className="mt-2 h-auto p-0 font-normal"
                    onClick={() => topicPageOnClick(title, topicRoute)}
                    asChild
                  >
                    <Link href={topicRoute}>
                      {viewDetailsText}
                      <ChevronRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
      {withBackButton && (
        <CardFooter className="flex-col space-y-4">
          <Button variant="secondary" className="w-full" asChild>
            <Link href={Routes.Home}>
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
