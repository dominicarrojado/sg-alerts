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
import { useGetTrainSlotsInfo } from "@/lib/api-hooks";
import { FetchStatus } from "@/lib/enums";
import { formatDate, formatTime } from "@/lib/date";

export function TrainTicketsTable() {
  const [fetchState, trainSlotsInfo, getTrainSlotsInfo] =
    useGetTrainSlotsInfo();
  const { items: trainSlots, updatedAt } = trainSlotsInfo;

  useEffect(() => {
    getTrainSlotsInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  return fetchState === FetchStatus.Success ? (
    <Table className="my-6">
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
  ) : (
    <Table className="my-6">
      <TableCaption>
        <Skeleton className="h-5 w-1/2" />
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="sm:w-[220px]">
            <Skeleton className="h-5 w-full" />
          </TableHead>
          <TableHead className="hidden sm:table-cell sm:w-[100px]">
            <Skeleton className="h-5 w-full" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-5 w-full" />
          </TableHead>
          <TableHead className="sm:w-[190px]">
            <Skeleton className="h-5 w-full" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-5 w-full" />
            </TableCell>
            <TableHead className="hidden sm:table-cell">
              <Skeleton className="h-5 w-full" />
            </TableHead>
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
