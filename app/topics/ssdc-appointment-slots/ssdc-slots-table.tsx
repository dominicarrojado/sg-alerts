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
import { useGetSsdcSlotsDatesMap } from "@/lib/api-hooks";
import { SsdcService, FetchStatus } from "@/lib/enums";
import { SSDC_SERVICES_LENGTH } from "@/lib/constants";
import type { SsdcSlotsInfoItems } from "@/lib/types";

export function SsdcSlotsTable() {
  const [fetchState, ssdcSlotsDatesMap, getSsdcSlotsDatesMap] =
    useGetSsdcSlotsDatesMap();
  const ssdcSlotsInfoItems: SsdcSlotsInfoItems = [
    {
      service: SsdcService.ENROLMENT_WEEKEND,
      title: "Class 3 / 3A School Enrolment (weekend)",
      lastAvailableDate: ssdcSlotsDatesMap[SsdcService.ENROLMENT_WEEKEND],
    },
    {
      service: SsdcService.PRIVATE_LEARNERS,
      title: "Private Learners",
      lastAvailableDate: ssdcSlotsDatesMap[SsdcService.PRIVATE_LEARNERS],
    },
    {
      service: SsdcService.PRACTICAL_LESSON_BOOKING,
      title: "Class 3 / 3A Practical Lesson Booking",
      lastAvailableDate:
        ssdcSlotsDatesMap[SsdcService.PRACTICAL_LESSON_BOOKING],
    },
    {
      service: SsdcService.OTHER_COURSES_ENROLMENT,
      title: "Other Courses Enrolment (weekend)",
      lastAvailableDate: ssdcSlotsDatesMap[SsdcService.OTHER_COURSES_ENROLMENT],
    },
    {
      service: SsdcService.FOREIGN_LICENCE_WEEKEND,
      title: "Foreign Licence Package (weekend)",
      lastAvailableDate: ssdcSlotsDatesMap[SsdcService.FOREIGN_LICENCE_WEEKEND],
    },
  ];

  useEffect(() => {
    getSsdcSlotsDatesMap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  return fetchState === FetchStatus.Success ? (
    <Table className="my-6">
      <TableHeader>
        <TableRow>
          <TableHead>Type of Service</TableHead>
          <TableHead className="w-1/2 sm:w-[240px] text-right">
            Date of Last Available Slots
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ssdcSlotsInfoItems.map((slotsInfoItem) => (
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
        {Array.from({ length: SSDC_SERVICES_LENGTH }).map((_, index) => (
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
