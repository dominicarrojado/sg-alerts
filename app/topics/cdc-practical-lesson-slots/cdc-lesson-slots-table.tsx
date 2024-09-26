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
import { useGetCdcLessonSlotsDatesMap } from "@/lib/api-hooks";
import {
  CdcLessonsService,
  CdcService,
  FetchStatus,
  TelegramChannel,
} from "@/lib/enums";
import {
  CDC_LESSON_SERVICES_LENGTH,
  TELEGRAM_SHORT_URL,
} from "@/lib/constants";
import type { CdcLessonSlotsInfoItems } from "@/lib/types";

export default function CdcLessonSlotsTable() {
  const [fetchState, cdcLessonSlotsDatesMap, getCdcLessonSlotsDatesMap] =
    useGetCdcLessonSlotsDatesMap();
  const cdcLessonSlotsInfoItems: CdcLessonSlotsInfoItems = [
    {
      service: CdcService.EYESIGHT_TEST,
      title: "Class 3A Motorcar (Standard)",
      lastAvailableDate: cdcLessonSlotsDatesMap[CdcLessonsService.AUTO_CAR],
      telegramLink: `${TELEGRAM_SHORT_URL}/${TelegramChannel.CdcLessonsAutoCar}`,
    },
    {
      service: CdcService.COUNTER_SERVICES,
      title: "Class 2B Motorcycle",
      lastAvailableDate:
        cdcLessonSlotsDatesMap[CdcLessonsService.MOTORCYCLE_2B],
      telegramLink: `${TELEGRAM_SHORT_URL}/${TelegramChannel.CdcLessonsMotorcycle2B}`,
    },
  ];

  useEffect(() => {
    getCdcLessonSlotsDatesMap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  return fetchState === FetchStatus.Success ? (
    <Table className="my-6">
      <TableHeader>
        <TableRow>
          <TableHead>Courses</TableHead>
          <TableHead className="w-1/2 text-right">
            Date of Last Available Slots
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cdcLessonSlotsInfoItems.map((slotsInfoItem) => (
          <TableRow key={slotsInfoItem.service}>
            <TableCell className="font-medium">
              <Anchor href={slotsInfoItem.telegramLink} isExternal>
                {slotsInfoItem.title}
              </Anchor>
            </TableCell>
            <TableCell className="text-right">
              {slotsInfoItem.lastAvailableDate}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <Table className="my-6">
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className="h-5 w-full" />
          </TableHead>
          <TableHead className="w-1/2">
            <Skeleton className="h-5 w-full" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: CDC_LESSON_SERVICES_LENGTH }).map((_, index) => (
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
