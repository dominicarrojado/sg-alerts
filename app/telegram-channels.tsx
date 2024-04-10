"use client";

import { ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Anchor } from "@/components/ui/anchor";
import { Badge } from "@/components/ui/badge";
import { TELEGRAM_PUBLIC_CHANNELS } from "@/lib/content";
import { TELEGRAM_SHORT_URL } from "@/lib/constants";

export default function TelegramChannels() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          Telegram Channels <Badge>NEW</Badge>
        </CardTitle>
        <CardDescription>
          Subscribe to the channels below if you want to receive notifications
          via Telegram. <br />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {TELEGRAM_PUBLIC_CHANNELS.map(({ id, title, description }) => (
            <div
              key={id}
              className="flex flex-row items-center justify-between rounded-lg border p-4 w-full"
            >
              <div className="space-y-0.5 pr-2">
                <Anchor
                  href={`${TELEGRAM_SHORT_URL}/${id}`}
                  className="no-underline text-base"
                  isExternal
                >
                  {title}
                </Anchor>
                <p className="text-sm font-light text-muted-foreground">
                  {description}
                </p>
              </div>
              <Anchor
                href={`${TELEGRAM_SHORT_URL}/${id}`}
                className="no-underline px-2 shrink-0"
                isExternal
              >
                <ExternalLink />
              </Anchor>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
