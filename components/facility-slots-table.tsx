"use client";

import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Anchor } from "@/components/ui/anchor";
import { useGetFacilitySlotsInfo } from "@/lib/api-hooks";
import { FacilityService, FetchStatus } from "@/lib/enums";
import { formatDate, formatTime } from "@/lib/date";

interface FacilitySlotsTableProps {
  service: FacilityService;
}

export function FacilitySlotsTable({ service }: FacilitySlotsTableProps) {
  const [fetchState, facilitySlotsInfo, getFacilitySlotsInfo] =
    useGetFacilitySlotsInfo(service);
  const {
    items: facilitySlots,
    updatedAt,
    lastAvailableDate,
  } = facilitySlotsInfo;

  useEffect(() => {
    getFacilitySlotsInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  if (fetchState !== FetchStatus.Success) {
    return (
      <Alert className="my-6 flex items-start space-x-3">
        <Skeleton className="mt-1 h-5 w-5 rounded-full" />
        <div className="w-full space-y-2 py-1">
          <Skeleton className="h-5 w-full sm:w-11/12" />
          <Skeleton className="h-4 w-4/5 sm:hidden" />
        </div>
      </Alert>
    );
  }

  if (facilitySlots.length === 0) {
    return (
      <Alert className="my-6" data-clarity-unmask="true">
        <CheckCircle className="mt-1 h-4 w-4" />
        <AlertTitle className="leading-normal">
          Last available slots were spotted on {lastAvailableDate}.
        </AlertTitle>
      </Alert>
    );
  }

  return (
    <Table className="my-6" data-clarity-unmask="true">
      <TableCaption>Last updated on {updatedAt}.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="sm:w-[220px]">
            Date
            <div className="sm:hidden">/ Time</div>
          </TableHead>
          <TableHead className="hidden sm:table-cell sm:w-[160px]">
            Time
          </TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {facilitySlots.map((slot) => (
          <TableRow key={slot.id}>
            <TableCell>
              {formatDate(slot.date)}
              <div className="sm:hidden">@ {formatTime(slot.time)}</div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {formatTime(slot.time)}
            </TableCell>
            <TableCell className="text-right">
              <Anchor href={slot.bookingLink} isExternal>
                Book Now
              </Anchor>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
