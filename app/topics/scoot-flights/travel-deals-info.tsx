"use client";

import React, { useEffect } from "react";
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
import { Anchor } from "@/components/ui/anchor";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTravelDealsInfo } from "@/lib/api-hooks";
import { FetchStatus } from "@/lib/enums";

export default function TravelDealsInfo() {
  const [fetchState, travelDealsInfo, getTravelDealsInfo] =
    useGetTravelDealsInfo();
  const { items: travelDeals, updatedAt, lastAvailableAt } = travelDealsInfo;

  useEffect(() => {
    getTravelDealsInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  return fetchState === FetchStatus.Success ? (
    <>
      {travelDeals.length === 0 ? (
        <Alert className="my-6">
          <CheckCircle className="h-4 w-4 mt-1" />
          <AlertTitle className="leading-normal">
            Last flight sale was spotted on {lastAvailableAt}.
          </AlertTitle>
        </Alert>
      ) : (
        <Table className="my-6">
          <TableCaption>Last updated on {updatedAt}.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="w-[100px]">Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {travelDeals.map(({ title, link }) => (
              <TableRow key={title}>
                <TableCell>{title}</TableCell>
                <TableCell>
                  <Anchor href={link} isExternal>
                    View Sale
                  </Anchor>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  ) : (
    <Alert className="flex items-start my-6 space-x-3">
      <Skeleton className="h-5 w-5 mt-1 rounded-full" />
      <div className="w-full space-y-2 py-1">
        <Skeleton className="h-5 w-full sm:w-11/12" />
        <Skeleton className="h-4 w-4/5 sm:hidden" />
      </div>
    </Alert>
  );
}
