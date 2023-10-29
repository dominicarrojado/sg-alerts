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
import { useGetCoeBiddingsInfo } from "@/lib/api-hooks";
import { formatMoney } from "@/lib/number";
import { cn } from "@/lib/utils";
import { FetchStatus } from "@/lib/enums";

export function CoeBiddingResultsTable() {
  const [fetchState, coeBiddingsInfo, getCoeBiddingsInfo] =
    useGetCoeBiddingsInfo();
  const { items: coeBiddings, updatedAt } = coeBiddingsInfo;

  useEffect(() => {
    getCoeBiddingsInfo();

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
          <TableHead>Category</TableHead>
          <TableHead>Quota</TableHead>
          <TableHead className="text-right">
            <abbr title="Quota Premium" className="no-underline">
              QP
            </abbr>
            <span className="sm:hidden">
              {" "}
              /{" "}
              <abbr title="Prevailing Quota Premium" className="no-underline">
                PQP
              </abbr>
            </span>
          </TableHead>
          <TableHead className="hidden text-right sm:table-cell">
            <abbr title="Prevailing Quota Premium" className="no-underline">
              PQP
            </abbr>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {coeBiddings.map((coeBidding) => {
          const { category, qp, previousQp, pqp, previousPqp } = coeBidding;
          const qpDiff = previousQp ? qp - previousQp : 0;
          const qpDiffIsNegative = qpDiff < 0;
          const pqpDiff = previousPqp ? pqp - previousPqp : 0;
          const pqpDiffIsNegative = pqpDiff < 0;
          const pqpComponent = (
            <>
              {formatMoney(pqp)}{" "}
              {pqpDiff !== 0 && (
                <span
                  className={cn(
                    "block font-normal",
                    pqpDiffIsNegative ? "text-green-500" : "text-primary"
                  )}
                >
                  ({pqpDiffIsNegative ? "▾" : "▴"}
                  {formatMoney(Math.abs(pqpDiff))})
                </span>
              )}
            </>
          );

          return (
            <TableRow key={category}>
              <TableCell className="font-medium">
                {category}: {coeBidding.title}
              </TableCell>
              <TableCell>{coeBidding.quota}</TableCell>
              <TableCell className="text-right font-medium">
                {formatMoney(qp)}{" "}
                {qpDiff !== 0 && (
                  <span
                    className={cn(
                      "block font-normal",
                      qpDiffIsNegative ? "text-green-500" : "text-primary"
                    )}
                  >
                    ({qpDiffIsNegative ? "▾" : "▴"}
                    {formatMoney(Math.abs(qpDiff))})
                  </span>
                )}
                <span className="block mt-2 sm:hidden">{pqpComponent}</span>
              </TableCell>
              <TableCell className="hidden text-right font-medium sm:table-cell">
                {pqpComponent}
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
          <TableHead>
            <Skeleton className="h-5 w-full" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-5 w-full" />
          </TableHead>
          <TableHead className="hidden sm:table-cell">
            <Skeleton className="h-5 w-full" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full sm:hidden" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-full" />
            </TableCell>
            <TableCell className="space-y-2">
              <Skeleton className="h-4 w-full sm:h-5" />
              <Skeleton className="h-4 w-full sm:hidden" />
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <Skeleton className="h-5 w-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
