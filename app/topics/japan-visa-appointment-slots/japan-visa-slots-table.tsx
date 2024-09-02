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
import { useGetJapanVisaSlotsDatesMap } from "@/lib/api-hooks";
import { FetchStatus, JapanVisaType } from "@/lib/enums";
import { JAPAN_VISA_TYPES_LENGTH } from "@/lib/constants";
import type { JapanVisaSlotsInfoItems } from "@/lib/types";

export function JapanVisaSlotsTable() {
  const [fetchState, japanVisaSlotsDatesMap, getJapanVisaSlotsDatesMap] =
    useGetJapanVisaSlotsDatesMap();
  const japanVisaSlotsInfoItems: JapanVisaSlotsInfoItems = [
    {
      type: JapanVisaType.TOURISM,
      title: "Tourism or Sightseeing",
      lastAvailableDate: japanVisaSlotsDatesMap[JapanVisaType.TOURISM],
    },
    {
      type: JapanVisaType.BUSINESS,
      title: (
        <>
          Short-term Business, Long-term stay with{" "}
          <abbr title="Certificate of Eligibility" className="no-underline">
            COE
          </abbr>
          , Spouse or Child of Japanese National
        </>
      ),
      lastAvailableDate: japanVisaSlotsDatesMap[JapanVisaType.BUSINESS],
    },
    {
      type: JapanVisaType.OTHERS,
      title: "All other visa applications and services",
      lastAvailableDate: japanVisaSlotsDatesMap[JapanVisaType.OTHERS],
    },
  ];

  useEffect(() => {
    getJapanVisaSlotsDatesMap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  return fetchState === FetchStatus.Success ? (
    <Table className="my-6">
      <TableHeader>
        <TableRow>
          <TableHead>Type of Application</TableHead>
          <TableHead className="w-1/2 sm:w-[240px] text-right">
            Date of Last Available Slots
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {japanVisaSlotsInfoItems.map((slotsInfoItem) => (
          <TableRow key={slotsInfoItem.type}>
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
        {Array.from({ length: JAPAN_VISA_TYPES_LENGTH }).map((_, index) => (
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
