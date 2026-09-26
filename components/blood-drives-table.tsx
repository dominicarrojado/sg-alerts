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
import { Badge } from "@/components/ui/badge";
import { useGetEventsInfo } from "@/lib/api-hooks";
import { EventService, FetchStatus } from "@/lib/enums";

interface BloodDrivesTableProps {
  service: EventService;
}

export function BloodDrivesTable({ service }: BloodDrivesTableProps) {
  const [fetchState, eventsInfo, getEventsInfo] = useGetEventsInfo(service);
  const { items: events, updatedAt } = eventsInfo;

  useEffect(() => {
    getEventsInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service]);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  if (fetchState !== FetchStatus.Success) {
    return (
      <Table className="my-6">
        <TableCaption>
          <div className="flex flex-col items-center gap-3">
            <Skeleton className="h-5 w-1/2" />
          </div>
        </TableCaption>
        <TableHeader>
          <TableRow className="h-[48px]">
            <TableHead>
              <Skeleton className="h-5 w-full" />
            </TableHead>
            <TableHead className="hidden sm:table-cell sm:w-[220px]">
              <Skeleton className="h-5 w-full" />
            </TableHead>
            <TableHead className="hidden sm:table-cell">
              <Skeleton className="h-5 w-full" />
            </TableHead>
            <TableHead className="text-right">
              <Skeleton className="ml-auto h-5 w-20" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, index) => (
            <TableRow key={index} className="h-[52px]">
              <TableCell>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="mt-1 h-4 w-1/2 sm:hidden" />
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="mt-1 h-4 w-20" />
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Skeleton className="h-5 w-full" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="ml-auto h-5 w-16" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (events.length === 0) {
    return (
      <Alert className="my-6" data-clarity-unmask="true">
        <CheckCircle className="mt-1 h-4 w-4" />
        <AlertTitle className="leading-normal">
          {updatedAt
            ? `No upcoming community blood drives currently scheduled. Last checked on ${updatedAt}.`
            : "No upcoming community blood drives currently scheduled."}
        </AlertTitle>
      </Alert>
    );
  }

  return (
    <Table className="my-6" data-clarity-unmask="true">
      <TableCaption>Last updated on {updatedAt}.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[160px]">
            Location
            <div className="font-normal text-muted-foreground sm:hidden">
              Date &amp; Time / Address
            </div>
          </TableHead>
          <TableHead className="hidden sm:table-cell sm:w-[220px]">
            Date &amp; Time
          </TableHead>
          <TableHead className="hidden sm:table-cell">Address</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event, index) => (
          <TableRow key={`${event.title}-${event.date}-${index}`}>
            <TableCell className="font-medium">
              <div className="flex flex-wrap items-center gap-2">
                <span>{event.title}</span>
                {event.area && (
                  <Badge variant="outline" className="font-normal">
                    {event.area}
                  </Badge>
                )}
              </div>
              <div className="font-normal text-muted-foreground sm:hidden">
                {event.date} · {event.startTime} - {event.endTime}
              </div>
              <div className="font-normal text-muted-foreground sm:hidden">
                {event.address}
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <div className="font-medium">{event.date}</div>
              <div className="text-xs text-muted-foreground">
                {event.startTime} - {event.endTime}
              </div>
            </TableCell>
            <TableCell className="hidden text-muted-foreground sm:table-cell">
              {event.address}
            </TableCell>
            <TableCell className="text-right">
              <Anchor href={event.link} isExternal>
                Details
              </Anchor>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
