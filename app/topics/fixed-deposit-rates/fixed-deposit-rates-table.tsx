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
import { Anchor } from "@/components/ui/anchor";
import { useGetDepositRatesInfo } from "@/lib/api-hooks";
import { formatMoney } from "@/lib/number";
import { cn } from "@/lib/utils";
import { FetchStatus } from "@/lib/enums";

export function FixedDepositRatesTable() {
  const [fetchState, depositRatesInfo, getDepositRatesInfo] =
    useGetDepositRatesInfo();
  const { items: depositRates, updatedAt } = depositRatesInfo;

  useEffect(() => {
    getDepositRatesInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  return fetchState === FetchStatus.Success ? (
    <Table className="my-6" data-clarity-unmask="true">
      <TableCaption>
        Last updated on {updatedAt}. <br />
        <small>
          <b className="font-medium">*</b>{" "}
          <abbr title="Singapore Savings Bond" className="no-underline">
            SSB
          </abbr>
          ,{" "}
          <abbr title="Treasury Bills" className="no-underline">
            T-bills
          </abbr>
          , GXS, MariBank and Syfe are not fixed deposit rates,{" "}
          <br className="hidden sm:block" />
          but they are included here for comparison purposes.
        </small>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="sm:w-[220px]">Bank</TableHead>
          <TableHead>
            <abbr title="Minimum" className="no-underline">
              Min.
            </abbr>{" "}
            Deposit
            <div className="sm:hidden">/ Tenure</div>
          </TableHead>
          <TableHead className="hidden sm:table-cell">Tenure</TableHead>
          <TableHead className="text-right">Interest Rate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {depositRates.map((depositRate) => {
          const { bank, rate, previousRate, tenure, minDeposit } = depositRate;
          const tenureText = tenure !== 0 ? `${depositRate.tenure}-month` : "-";
          const diff = previousRate
            ? Number((rate - previousRate).toFixed(2))
            : 0;
          const isNegative = diff < 0;

          return (
            <TableRow key={bank}>
              <TableCell>
                <Anchor href={depositRate.link} isExternal>
                  {bank}
                </Anchor>
              </TableCell>
              <TableCell>
                {minDeposit ? formatMoney(minDeposit) : "-"}
                <div className="sm:hidden">{tenure}</div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {tenureText}
              </TableCell>
              <TableCell className="text-right font-medium">
                {rate}%
                {previousRate && diff !== 0 && (
                  <span
                    className={cn(
                      "ml-1 font-normal",
                      isNegative ? "text-primary" : "text-green-500",
                    )}
                  >
                    ({isNegative ? "▾" : "▴"}
                    {Math.abs(diff)})
                  </span>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  ) : (
    <Table className="my-6">
      <TableCaption>
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="h-3.5 w-1/2" />
          <Skeleton className="h-3 w-3/5" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="sm:w-[220px]">
            <Skeleton className="h-5 w-full" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-5 w-full" />
          </TableHead>
          <TableHead className="hidden sm:table-cell">
            <Skeleton className="h-5 w-full" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-5 w-full" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 18 }).map((_, index) => (
          <TableRow key={index}>
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
            <TableCell>
              <Skeleton className="h-5 w-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
