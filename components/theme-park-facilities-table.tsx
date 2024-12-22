"use client";

import { useEffect } from "react";
import Balancer from "react-wrap-balancer";
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
import { cn } from "@/lib/utils";
import { useGetThemeParkInfo } from "@/lib/api-hooks";
import { FetchStatus, ThemeParkService } from "@/lib/enums";
import { NOW_AVAILABLE_TEXT } from "@/lib/constants";
import { Anchor } from "./ui/anchor";

type Props = {
  service: ThemeParkService;
  facilityUrlAffix: string;
};

export function ThemeParkFacilitiesTable({ service, facilityUrlAffix }: Props) {
  const [fetchState, themeParkInfo, getThemeParkInfo] =
    useGetThemeParkInfo(service);
  const { items: facilities, updatedAt } = themeParkInfo;

  useEffect(() => {
    getThemeParkInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  return fetchState === FetchStatus.Success ? (
    <Table className="my-6" data-clarity-unmask="true">
      <TableCaption>Last updated on {updatedAt}.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[220px]">Attraction</TableHead>
          <TableHead className="hidden sm:table-cell">
            Status / Passes
          </TableHead>
          <TableHead className="w-[100px] text-right">Wait time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {facilities.map((facility) => {
          const {
            id,
            isOperating,
            fsStatus,
            dpaStatus,
            standByTime,
            standByTimeNum,
          } = facility;
          const dpaStatusLowerCased = dpaStatus?.toLowerCase() || "";
          const fsStatusLowerCased = fsStatus?.toLowerCase() || "";
          const isPriorityPassNowAvailable =
            fsStatusLowerCased.includes(NOW_AVAILABLE_TEXT);
          const isPremierAccessNowAvailable =
            dpaStatusLowerCased.includes(NOW_AVAILABLE_TEXT);

          const statusAndPasses = (
            <>
              <span
                className={cn(
                  !isOperating && "text-muted-foreground",
                  isOperating && "hidden sm:block",
                )}
              >
                <Balancer
                  className={cn(!isOperating && "text-muted-foreground")}
                >
                  {facility.operatingStatus}
                </Balancer>
              </span>
              {isOperating && fsStatus && (
                <Balancer
                  className={cn(
                    "block",
                    isPriorityPassNowAvailable
                      ? "text-green-500"
                      : "text-primary",
                  )}
                >
                  {fsStatus}
                </Balancer>
              )}
              {isOperating && dpaStatus && (
                <Balancer
                  className={cn(
                    "block",
                    isPremierAccessNowAvailable
                      ? "text-green-500"
                      : "text-primary",
                  )}
                >
                  {dpaStatus}
                </Balancer>
              )}
            </>
          );

          return (
            <TableRow key={id}>
              <TableCell className="align-top">
                <Anchor
                  href={`https://www.tokyodisneyresort.jp/en/${facilityUrlAffix}/attraction/detail/${id}/`}
                  isExternal
                >
                  <Balancer className="font-medium">{facility.name}</Balancer>
                </Anchor>
                <div className="mt-1 sm:hidden">{statusAndPasses}</div>
              </TableCell>
              <TableCell className="hidden align-top sm:table-cell">
                {statusAndPasses}
              </TableCell>
              <TableCell className="text-right align-top font-medium">
                {standByTimeNum ? `${standByTime} min.` : "-"}
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
          <TableHead className="w-[220px]">
            <Skeleton className="h-5 w-full" />
          </TableHead>
          <TableHead className="hidden sm:table-cell">
            <Skeleton className="h-5 w-full" />
          </TableHead>
          <TableHead className="w-[100px]">
            <Skeleton className="inline-block h-5 w-1/2 sm:w-full" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-5 w-full" />
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <Skeleton className="h-5 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="inline-block h-5 w-1/2 sm:w-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
