"use client";

import React from "react";
import { ExternalLinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Anchor } from "@/components/ui/anchor";
import { trackEvent } from "@/lib/google-analytics";
import { GoogleAnalyticsEvent, TelegramChannel } from "@/lib/enums";
import { TELEGRAM_SHORT_URL } from "@/lib/constants";

type Props = {
  channel: TelegramChannel;
  linkText: string;
  topicTitle: string;
};

export default function TelegramLinkButton({
  channel,
  linkText,
  topicTitle,
}: Props) {
  const linkUrl = `${TELEGRAM_SHORT_URL}/${channel}`;
  const onClick = () => {
    trackEvent({
      linkUrl,
      topicTitle,
      linkText,
      event: GoogleAnalyticsEvent.TOPIC_CLICK,
    });
  };

  return (
    <Button variant="secondary" asChild>
      <Anchor
        href={linkUrl}
        onClick={onClick}
        className="no-underline"
        isExternal
      >
        {linkText} <ExternalLinkIcon className="ml-2 h-4 w-4" />
      </Anchor>
    </Button>
  );
}
