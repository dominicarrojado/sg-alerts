"use client";

import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBbdcSlotsDatesMap } from "@/lib/api-hooks";
import { BbdcService, FetchStatus } from "@/lib/enums";

export default function BbdcLessonSlotsInfo() {
  const [fetchState, bbdcSlotsDatesMap, getBbdcSlotsDatesMap] =
    useGetBbdcSlotsDatesMap();
  const lastAvailableSlotsDate =
    bbdcSlotsDatesMap[BbdcService.COUNTER_SERVICES];

  useEffect(() => {
    getBbdcSlotsDatesMap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  return fetchState === FetchStatus.Success && lastAvailableSlotsDate ? (
    <Alert className="my-6">
      <CheckCircle className="h-4 w-4 mt-1" />
      <AlertTitle className="leading-normal">
        Last available slots were spotted on {lastAvailableSlotsDate}.
      </AlertTitle>
    </Alert>
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
