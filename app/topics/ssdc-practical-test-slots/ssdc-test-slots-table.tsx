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
import { useGetSsdcTestSlotsDatesMap } from "@/lib/api-hooks";
import { getTelegramChannelUrl } from "@/lib/telegram";
import { trackEvent } from "@/lib/google-analytics";
import {
  FetchStatus,
  GoogleAnalyticsEvent,
  TelegramChannel,
  TopicTitle,
  SsdcTestsService,
} from "@/lib/enums";
import type { SsdcTestSlotsInfoItems } from "@/lib/types";

export function SsdcTestSlotsTable() {
  const [fetchState, ssdcSlotsDatesMap, getSsdcSlotsDatesMap] =
    useGetSsdcTestSlotsDatesMap();
  const ssdcTestsSlotsInfoItems: SsdcTestSlotsInfoItems = [
    {
      service: SsdcTestsService.PRIVATE_MANUAL_CAR,
      title: "Private Learners",
      lastAvailableDate: ssdcSlotsDatesMap[SsdcTestsService.PRIVATE_MANUAL_CAR],
      telegramChannel: TelegramChannel.SsdcTestsPrivate,
      topicTitle: TopicTitle.SsdcPracticalTestSlotsPrivate,
    },
    {
      service: SsdcTestsService.AUTO_CAR,
      title: "Class 3A Motorcar",
      lastAvailableDate: ssdcSlotsDatesMap[SsdcTestsService.AUTO_CAR],
      telegramChannel: TelegramChannel.SsdcTestsAutoCar,
      topicTitle: TopicTitle.SsdcPracticalTestSlotsAuto,
    },
    {
      service: SsdcTestsService.MANUAL_CAR,
      title: "Class 3 Motorcar",
      lastAvailableDate: ssdcSlotsDatesMap[SsdcTestsService.MANUAL_CAR],
      telegramChannel: TelegramChannel.SsdcTestsManualCar,
      topicTitle: TopicTitle.SsdcPracticalTestSlotsManual,
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
    getSsdcSlotsDatesMap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  return fetchState === FetchStatus.Success ? (
    <Table className="my-6" data-clarity-unmask="true">
      <TableHeader>
        <TableRow>
          <TableHead>Motorcar Licensing Course</TableHead>
          <TableHead className="w-1/2 text-right sm:w-[240px]">
            Date of Last Available Slots
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ssdcTestsSlotsInfoItems.map((slotsInfoItem) => {
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
        {Array.from({ length: ssdcTestsSlotsInfoItems.length }).map(
          (_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-5 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-full" />
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
}
