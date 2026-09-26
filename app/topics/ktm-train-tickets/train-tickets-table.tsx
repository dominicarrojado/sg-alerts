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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTrainSlotsInfo } from "@/lib/api-hooks";
import { FetchStatus } from "@/lib/enums";
import { formatDate, formatTime } from "@/lib/date";

export function TrainTicketsTable() {
  const [fetchState, trainSlotsInfo, getTrainSlotsInfo] =
    useGetTrainSlotsInfo();
  const { items: trainSlots, updatedAt, lastAvailableDate } = trainSlotsInfo;

  useEffect(() => {
    getTrainSlotsInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  if (fetchState !== FetchStatus.Success) {
    return (
      <Alert className="my-6">
        <Skeleton className="absolute left-4 top-4 mt-1 h-4 w-4 rounded-full" />
        <AlertTitle className="pl-7 leading-normal">
          <Skeleton className="h-5 w-full sm:h-6 sm:w-1/2" />
          <Skeleton className="mt-1 h-6 w-4/5 sm:hidden" />
        </AlertTitle>
        <AlertDescription className="pl-7 text-muted-foreground">
          <Skeleton className="h-4 w-full sm:h-5 sm:w-1/3" />
          <Skeleton className="mt-1 h-5 w-2/5 sm:hidden" />
        </AlertDescription>
      </Alert>
    );
  }

  if (trainSlots.length === 0) {
    return (
      <Alert className="my-6" data-clarity-unmask="true">
        <CheckCircle className="mt-1 h-4 w-4" />
        <AlertTitle className="leading-normal">
          {lastAvailableDate
            ? `Last available slots were spotted on ${lastAvailableDate}.`
            : "No train tickets currently available."}
        </AlertTitle>
        {updatedAt && (
          <AlertDescription className="text-muted-foreground">
            Last updated on {updatedAt}.
          </AlertDescription>
        )}
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
          <TableHead className="hidden sm:table-cell sm:w-[100px]">
            Time
          </TableHead>
          <TableHead>Seat(s)</TableHead>
          <TableHead className="text-right sm:w-[190px]">To</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trainSlots.map((trainSlot) => {
          const time = formatTime(trainSlot.departureTime);

          return (
            <TableRow key={trainSlot.id}>
              <TableCell>
                {formatDate(trainSlot.date)} ({trainSlot.day})
                <div className="sm:hidden">@ {time}</div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">{time}</TableCell>
              <TableCell>{trainSlot.slotsCount}</TableCell>
              <TableCell className="text-right">
                {trainSlot.to.replace("Ciq ", "")}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
