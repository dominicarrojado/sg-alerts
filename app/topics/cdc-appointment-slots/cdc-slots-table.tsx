"use client";

import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Anchor } from "@/components/ui/anchor";
import { useGetCdcSlotsDatesMap } from "@/lib/api-hooks";
import { getTelegramChannelUrl } from "@/lib/telegram";
import { trackEvent } from "@/lib/google-analytics";
import {
  CdcService,
  FetchStatus,
  GoogleAnalyticsEvent,
  TelegramChannel,
  TopicTitle,
} from "@/lib/enums";
import type { CdcSlotsInfoItems } from "@/lib/types";

export function CdcSlotsTable() {
  const [fetchState, cdcSlotsDatesMap, getCdcSlotsDatesMap] =
    useGetCdcSlotsDatesMap();
  const cdcSlotsInfoItems: CdcSlotsInfoItems = [
    {
      service: CdcService.EYESIGHT_TEST,
      title: "Eyesight Test",
      lastAvailableDate: cdcSlotsDatesMap[CdcService.EYESIGHT_TEST],
      telegramChannel: TelegramChannel.CdcEyesightTest,
      topicTitle: TopicTitle.CdcEyesightTest,
    },
    {
      service: CdcService.COUNTER_SERVICES,
      title: "Counter Services",
      lastAvailableDate: cdcSlotsDatesMap[CdcService.COUNTER_SERVICES],
      telegramChannel: TelegramChannel.CdcCounterServices,
      topicTitle: TopicTitle.CdcCounterServices,
    },
  ];
  const topicOnClick = (title: string, linkUrl: string, linkText?: string) => {
    trackEvent({
      linkText,
      linkUrl,
      event: GoogleAnalyticsEvent.TOPIC_CLICK,
      topicTitle: title,
    });
  };

  useEffect(() => {
    getCdcSlotsDatesMap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  return fetchState === FetchStatus.Success ? (
    <Table className="my-6" data-clarity-unmask="true">
      <TableHeader>
        <TableRow>
          <TableHead>Type of Service</TableHead>
          <TableHead className="w-1/2 text-right sm:w-[240px]">
            Date of Last Available Slots
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cdcSlotsInfoItems.map((slotsInfoItem) => {
          const { title, telegramChannel } = slotsInfoItem;

          return (
            <TableRow key={slotsInfoItem.service}>
              <TableCell className="font-medium">
                <Anchor
                  href={getTelegramChannelUrl(telegramChannel)}
                  onClick={() =>
                    topicOnClick(
                      slotsInfoItem.topicTitle,
                      telegramChannel,
                      title,
                    )
                  }
                  isExternal
                >
                  {title}
                </Anchor>
              </TableCell>
              <TableCell className="text-right">
                {slotsInfoItem.lastAvailableDate}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  ) : (
    <Table className="my-6">
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className="h-5 w-full" />
          </TableHead>
          <TableHead className="w-1/2 sm:w-[240px]">
            <Skeleton className="h-5 w-full" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: cdcSlotsInfoItems.length }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-5 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
