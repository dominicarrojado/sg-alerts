"use client";

import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Anchor } from "@/components/ui/anchor";
import { useGetCdcLessonSlotsDatesInfo } from "@/lib/api-hooks";
import { getTelegramChannelUrl } from "@/lib/telegram";
import { trackEvent } from "@/lib/google-analytics";
import {
  CdcLessonsService,
  FetchStatus,
  GoogleAnalyticsEvent,
  TelegramChannel,
  TopicTitle,
} from "@/lib/enums";
import type { CdcLessonSlotsInfoItems } from "@/lib/types";

export function CdcLessonSlotsTable() {
  const [fetchState, cdcSlotsInfo, getCdcSlotsDatesInfo] =
    useGetCdcLessonSlotsDatesInfo();
  const { datesMap: cdcSlotsDatesMap, updatedAt } = cdcSlotsInfo;
  const cdcLessonSlotsInfoItems: CdcLessonSlotsInfoItems = [
    {
      service: CdcLessonsService.AUTO_CAR,
      title: "Class 3A Motorcar",
      lastAvailableDate: cdcSlotsDatesMap[CdcLessonsService.AUTO_CAR],
      telegramChannel: TelegramChannel.CdcLessonsAutoCar,
      topicTitle: TopicTitle.CdcPracticalLessonSlotsAuto,
    },
    {
      service: CdcLessonsService.MANUAL_CAR,
      title: "Class 3 Motorcar",
      lastAvailableDate: cdcSlotsDatesMap[CdcLessonsService.MANUAL_CAR],
      telegramChannel: TelegramChannel.CdcLessonsManualCar,
      topicTitle: TopicTitle.CdcPracticalLessonSlotsManual,
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
    getCdcSlotsDatesInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  return fetchState === FetchStatus.Success ? (
    <Table className="my-6" data-clarity-unmask="true">
      <TableCaption>Last updated on {updatedAt}.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Motorcar Licensing Course</TableHead>
          <TableHead className="w-1/2 text-right sm:w-[240px]">
            Date of Last Available Slots
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cdcLessonSlotsInfoItems.map((slotsInfoItem) => {
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
        {Array.from({ length: cdcLessonSlotsInfoItems.length }).map(
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
