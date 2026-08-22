"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleAnalyticsEvent, Routes } from "@/lib/enums";
import { SUBSCRIBE_FORM_ID } from "@/lib/constants";
import { trackEvent } from "@/lib/google-analytics";

type Props = {
  route: Routes;
  linkText: string;
  topicTitle: string;
};

export default function SubscribeLinkButton({
  route,
  linkText,
  topicTitle,
}: Props) {
  const linkUrl = `${route}#${SUBSCRIBE_FORM_ID}`;
  const onClick = () => {
    trackEvent({
      linkUrl,
      linkText,
      topicTitle,
      event: GoogleAnalyticsEvent.TOPIC_CLICK,
    });
  };

  return (
    <Button asChild>
      <Link href={linkUrl} onClick={onClick}>
        {linkText} <ArrowRightIcon className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  );
}
