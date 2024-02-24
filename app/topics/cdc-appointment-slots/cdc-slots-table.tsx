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
import { CdcService, FetchStatus } from "@/lib/enums";
import { CDC_SERVICES_LENGTH } from "@/lib/constants";
import type { CdcSlotsInfoItems } from "@/lib/types";

export function CdcSlotsTable() {
  const [fetchState, cdcSlotsDatesMap, getCdcSlotsDatesMap] =
    useGetCdcSlotsDatesMap();
  const cdcslotsInfoItems: CdcSlotsInfoItems = [
    {
      service: CdcService.EYESIGHT_TEST,
      title: "Eyesight Test",
      lastAvailableDate: cdcSlotsDatesMap[CdcService.EYESIGHT_TEST],
      calendarLink: "https://www.cdc.com.sg/eyesight-test",
    },
    {
      service: CdcService.COUNTER_SERVICES,
      title: "Counter Services",
      lastAvailableDate: cdcSlotsDatesMap[CdcService.COUNTER_SERVICES],
      calendarLink: "https://www.cdc.com.sg/eappointment",
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
        {cdcslotsInfoItems.map((slotsInfoItem) => (
          <TableRow key={slotsInfoItem.service}>
            <TableCell className="font-medium">
              <Anchor href={slotsInfoItem.calendarLink} isExternal>
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
          <TableHead className="w-1/2 sm:w-[240px]">
            <Skeleton className="h-5 w-full" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: CDC_SERVICES_LENGTH }).map((_, index) => (
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
