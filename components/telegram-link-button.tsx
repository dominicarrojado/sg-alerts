"use client";

import React from "react";
import { ExternalLinkIcon } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Anchor } from "@/components/ui/anchor";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/google-analytics";
import { GoogleAnalyticsEvent, TelegramChannel } from "@/lib/enums";
import { TELEGRAM_SHORT_URL } from "@/lib/constants";

type Props = Partial<ButtonProps> & {
  channel: TelegramChannel;
  linkText: string;
  topicTitle: string;
};

export default function TelegramLinkButton({
  channel,
  linkText,
  topicTitle,
  className,
  ...props
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
    <Button {...props} asChild>
      <Anchor
        href={linkUrl}
        onClick={onClick}
        className={cn(
          "text-center no-underline shadow-md hover:shadow-none",
          className,
        )}
        isExternal
      >
        <span className="align-middle">{linkText}</span>
        <ExternalLinkIcon className="ml-2 inline-block h-4 w-4 align-middle" />
      </Anchor>
    </Button>
  );
}
