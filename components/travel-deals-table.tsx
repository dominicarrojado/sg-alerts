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
import { useGetTravelDealsInfo } from "@/lib/api-hooks";
import { FetchStatus, TravelDealsService } from "@/lib/enums";

interface TravelDealsTableProps {
  service: TravelDealsService;
}

export function TravelDealsTable({ service }: TravelDealsTableProps) {
  const [fetchState, travelDealsInfo, getTravelDealsInfo] =
    useGetTravelDealsInfo(service);
  const { items: travelDeals, updatedAt, lastAvailableAt } = travelDealsInfo;

  useEffect(() => {
    getTravelDealsInfo();

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
            <TableHead className="w-1/3 sm:w-[220px]">
              <Skeleton className="ml-auto h-5 w-24" />
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
                <Skeleton className="ml-auto h-4 w-28" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (travelDeals.length === 0) {
    return (
      <Alert className="my-6" data-clarity-unmask="true">
        <CheckCircle className="mt-1 h-4 w-4" />
        <AlertTitle className="leading-normal">
          {lastAvailableAt
            ? `Last travel deal was spotted on ${lastAvailableAt}.`
            : "No travel deals currently available."}
        </AlertTitle>
      </Alert>
    );
  }

  return (
    <Table className="my-6" data-clarity-unmask="true">
      <TableCaption>Last updated on {updatedAt}.</TableCaption>
      <TableHeader>
        <TableRow className="h-[48px]">
          <TableHead>Promotion</TableHead>
          <TableHead className="w-1/3 text-right sm:w-[220px]">
            Validity
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {travelDeals.map((deal, index) => {
          const hasDescription =
            deal.description && deal.description.trim() !== "-";

          return (
            <TableRow key={`${deal.title}-${index}`}>
              <TableCell className="font-medium">
                <Anchor href={deal.link} isExternal>
                  {deal.title}
                </Anchor>
                {hasDescription && (
                  <p className="mt-1 line-clamp-2 text-xs font-normal text-muted-foreground">
                    {deal.description}
                  </p>
                )}
                {deal.duration && (
                  <p className="mt-1 text-xs font-normal text-muted-foreground sm:hidden">
                    {deal.duration}
                  </p>
                )}
              </TableCell>
              <TableCell className="hidden text-right align-top text-xs text-muted-foreground sm:table-cell">
                {deal.duration}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
