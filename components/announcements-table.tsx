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
import { useGetAnnouncementsInfo } from "@/lib/api-hooks";
import { AnnouncementService, FetchStatus } from "@/lib/enums";

interface AnnouncementsTableProps {
  service: AnnouncementService;
}

export function AnnouncementsTable({ service }: AnnouncementsTableProps) {
  const [fetchState, announcementsInfo, getAnnouncementsInfo] =
    useGetAnnouncementsInfo(service);
  const { items: announcements, updatedAt } = announcementsInfo;

  useEffect(() => {
    getAnnouncementsInfo();

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
              <Skeleton className="h-5 w-1/2" />
            </TableHead>
            <TableHead className="w-1/3 sm:w-[160px]">
              <Skeleton className="ml-auto h-5 w-20" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, index) => (
            <TableRow key={index} className="h-[52px]">
              <TableCell>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="mt-1.5 h-4 w-5/6" />
              </TableCell>
              <TableCell className="text-right align-top">
                <Skeleton className="ml-auto h-4 w-20" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (announcements.length === 0) {
    return (
      <Alert className="my-6" data-clarity-unmask="true">
        <CheckCircle className="mt-1 h-4 w-4" />
        <AlertTitle className="leading-normal">
          {updatedAt
            ? `No announcements currently available. Last checked on ${updatedAt}.`
            : "No announcements currently available."}
        </AlertTitle>
      </Alert>
    );
  }

  return (
    <Table className="my-6" data-clarity-unmask="true">
      <TableCaption>Last updated on {updatedAt}.</TableCaption>
      <TableHeader>
        <TableRow className="h-[48px]">
          <TableHead>Announcement</TableHead>
          <TableHead className="w-1/3 text-right sm:w-[160px]">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {announcements.map((item, index) => (
          <TableRow key={`${item.title}-${index}`}>
            <TableCell className="font-medium">
              <Anchor href={item.link} isExternal>
                {item.title}
              </Anchor>
              {item.description && (
                <p className="mt-1 line-clamp-2 text-xs font-normal text-muted-foreground">
                  {item.description}
                </p>
              )}
            </TableCell>
            <TableCell className="whitespace-nowrap text-right align-top text-sm text-muted-foreground">
              {item.date}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
