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
import { useGetCdcLessonSlotsDatesMap } from "@/lib/api-hooks";
import { CdcLessonsService, FetchStatus } from "@/lib/enums";
import type { CdcClass2SlotsInfoItems } from "@/lib/types";

export function CdcLessonSlotsTable() {
  const [fetchState, cdcSlotsDatesMap, getCdcSlotsDatesMap] =
    useGetCdcLessonSlotsDatesMap();
  const cdcLessonSlotsInfoItems: CdcClass2SlotsInfoItems = [
    {
      service: CdcLessonsService.CLASS_2_L1,
      title: "Class 2 Motorcycle (Lesson 1)",
      lastAvailableDate: cdcSlotsDatesMap[CdcLessonsService.CLASS_2_L1],
    },
    {
      service: CdcLessonsService.CLASS_2_L2,
      title: "Class 2 Motorcycle (Lesson 2)",
      lastAvailableDate: cdcSlotsDatesMap[CdcLessonsService.CLASS_2_L2],
    },
    {
      service: CdcLessonsService.CLASS_2_L3,
      title: "Class 2 Motorcycle (Lesson 3)",
      lastAvailableDate: cdcSlotsDatesMap[CdcLessonsService.CLASS_2_L3],
    },
  ];

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
          <TableHead>Motorcycle Course & Lesson</TableHead>
          <TableHead className="w-1/2 text-right sm:w-[240px]">
            Date of Last Available Slots
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cdcLessonSlotsInfoItems.map((slotsInfoItem) => (
          <TableRow key={slotsInfoItem.service}>
            <TableCell className="font-medium">{slotsInfoItem.title}</TableCell>
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
