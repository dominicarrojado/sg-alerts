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
import { useGetCdcTestSlotsDatesMap } from "@/lib/api-hooks";
import { getTelegramChannelUrl } from "@/lib/telegram";
import { trackEvent } from "@/lib/google-analytics";
import {
  CdcTestsService,
  FetchStatus,
  GoogleAnalyticsEvent,
  TelegramChannel,
  TopicTitle,
} from "@/lib/enums";
import { CDC_LESSONS_SERVICES_LENGTH } from "@/lib/constants";
import type { CdcTestSlotsInfoItems } from "@/lib/types";

export function CdcTestSlotsTable() {
  const [fetchState, cdcSlotsDatesMap, getCdcSlotsDatesMap] =
    useGetCdcTestSlotsDatesMap();
  const cdcTestsSlotsInfoItems: CdcTestSlotsInfoItems = [
    {
      service: CdcTestsService.PRIVATE_TP_TEST,
      title: "Private Account",
      lastAvailableDate: cdcSlotsDatesMap[CdcTestsService.PRIVATE_TP_TEST],
      telegramChannel: TelegramChannel.CdcTestsPrivate,
      topicTitle: TopicTitle.CdcPracticalTestSlotsPrivate,
    },
    {
      service: CdcTestsService.AUTO_CAR_TEST,
      title: "Class 3A Motorcar",
      lastAvailableDate: cdcSlotsDatesMap[CdcTestsService.AUTO_CAR_TEST],
      telegramChannel: TelegramChannel.CdcTestsAutoCar,
      topicTitle: TopicTitle.CdcPracticalTestSlotsAuto,
    },
    {
      service: CdcTestsService.MANUAL_CAR_TEST,
      title: "Class 3 Motorcar",
      lastAvailableDate: cdcSlotsDatesMap[CdcTestsService.MANUAL_CAR_TEST],
      telegramChannel: TelegramChannel.CdcTestsManualCar,
      topicTitle: TopicTitle.CdcPracticalTestSlotsManual,
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
          <TableHead>Motorcar Licensing Course</TableHead>
          <TableHead className="w-1/2 text-right sm:w-[240px]">
            Date of Last Available Slots
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cdcTestsSlotsInfoItems.map((slotsInfoItem) => {
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
        {Array.from({ length: CDC_LESSONS_SERVICES_LENGTH }).map((_, index) => (
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
