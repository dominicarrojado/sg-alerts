"use client";

import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTotoSnowballInfo } from "@/lib/api-hooks";
import { FetchStatus } from "@/lib/enums";

export default function TotoSnowballInfo() {
  const [fetchState, totoSnowballInfo, getTotoSnowballInfo] =
    useGetTotoSnowballInfo();

  useEffect(() => {
    getTotoSnowballInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  return fetchState === FetchStatus.Success ? (
    <Alert className="my-6" data-clarity-unmask="true">
      <CheckCircle className="mt-1 h-4 w-4" />
      <AlertTitle className="leading-normal">
        Last TOTO snowball was on {totoSnowballInfo.drawDate} with the first
        prize amount of S$ {totoSnowballInfo.prize.toLocaleString()}.
      </AlertTitle>
    </Alert>
  ) : (
    <Alert className="my-6 flex items-start space-x-3">
      <Skeleton className="mt-1 h-5 w-5 rounded-full" />
      <div className="w-full space-y-2 py-1">
        <Skeleton className="h-5 w-full sm:w-11/12" />
        <Skeleton className="h-4 w-4/5 sm:hidden" />
        <Skeleton className="h-3 w-1/2 sm:w-1/4" />
      </div>
    </Alert>
  );
}
