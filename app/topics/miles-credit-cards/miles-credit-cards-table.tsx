"use client";

import { useEffect } from "react";
import Link from "next/link";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Anchor } from "@/components/ui/anchor";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useGetMilesCreditCardsInfo } from "@/lib/api-hooks";
import { formatMoney } from "@/lib/number";
import { cn } from "@/lib/utils";
import { FetchStatus } from "@/lib/enums";

type Props = {
  cardLinks?: Partial<Record<string, string>>;
};

export function MilesCreditCardsTable({ cardLinks }: Props) {
  const [fetchState, milesCreditCardsInfo, getMilesCreditCardsInfo] =
    useGetMilesCreditCardsInfo();
  const { items: creditCards, updatedAt } = milesCreditCardsInfo;

  useEffect(() => {
    getMilesCreditCardsInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  const cardInfoClassName =
    "flex min-h-[8.25rem] flex-col justify-center min-[360px]:min-h-[4.75rem]";

  const tableColumns = (
    <colgroup>
      <col className="w-1/2 sm:w-[40%]" />
      <col className="w-1/2 sm:w-1/4" />
      <col className="hidden sm:table-column sm:w-1/5" />
      <col className="hidden sm:table-column sm:w-[15%]" />
    </colgroup>
  );
  const tableHeader = (
    <TableHeader>
      <TableRow>
        <TableHead>Credit Card</TableHead>
        <TableHead>
          Bonus Miles
          <div className="font-normal text-muted-foreground sm:hidden">
            / Earn Rate & Fee
          </div>
        </TableHead>
        <TableHead className="hidden sm:table-cell">Earn Rate (mpd)</TableHead>
        <TableHead className="hidden text-right sm:table-cell">
          Annual Fee
        </TableHead>
      </TableRow>
    </TableHeader>
  );

  if (fetchState !== FetchStatus.Success) {
    return (
      <Table className="my-6 table-fixed">
        {tableColumns}
        <TableCaption>
          <div className="flex flex-col items-center gap-3">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </TableCaption>
        {tableHeader}
        <TableBody>
          {Array.from({ length: 8 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className={cardInfoClassName}>
                  <div className="min-h-[5rem] space-y-1 min-[360px]:min-h-[2.5rem]">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="space-y-1 min-[360px]:hidden">
                      <Skeleton className="h-4 w-3/5" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                  <div className="mt-1 min-h-[3rem] min-[360px]:min-h-[2rem]">
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="min-h-[5.25rem] sm:min-h-0">
                  <div className="flex h-5 items-center">
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <div className="mt-2 space-y-2 sm:hidden">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Skeleton className="ml-auto h-4 w-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (creditCards.length === 0) {
    return (
      <Alert className="my-6" data-clarity-unmask="true">
        <CheckCircle className="mt-1 h-4 w-4" />
        <AlertTitle className="leading-normal">
          {updatedAt
            ? `Last updated on ${updatedAt}. No miles credit cards currently available.`
            : "No miles credit cards currently available."}
        </AlertTitle>
      </Alert>
    );
  }

  return (
    <Table className="my-6 table-fixed" data-clarity-unmask="true">
      {tableColumns}
      <TableCaption>
        Last updated on {updatedAt}. <br />
        <small>
          Earn rates in miles per dollar (mpd) and sign-up bonus miles
          promotions are subject to bank terms and conditions.
          <br />
          Minimum income shown is for Singapore citizens/PRs. See individual
          card pages for foreigner requirements and additional eligibility
          conditions.
        </small>
      </TableCaption>
      {tableHeader}
      <TableBody>
        {creditCards.map((card) => {
          const {
            id,
            name,
            milesBonus,
            previousMilesBonus,
            milesPerDollar,
            annualFee,
            minimumAnnualIncome,
            link,
          } = card;

          const hasPreviousBonus = typeof previousMilesBonus === "number";
          const diff = hasPreviousBonus ? milesBonus - previousMilesBonus : 0;
          const isNegative = diff < 0;
          const internalLink = cardLinks?.[id];

          return (
            <TableRow key={id}>
              <TableCell>
                <div className={cardInfoClassName}>
                  {internalLink ? (
                    <Link
                      href={internalLink}
                      className="block font-medium underline underline-offset-4"
                    >
                      {name}
                    </Link>
                  ) : (
                    <Anchor
                      href={link}
                      isExternal
                      className="block font-medium underline underline-offset-4"
                    >
                      {name}
                    </Anchor>
                  )}
                  {typeof minimumAnnualIncome?.locals === "number" && (
                    <div className="mt-1 text-xs text-muted-foreground">
                      Min. income (SG/PR):{" "}
                      {formatMoney(minimumAnnualIncome.locals)}
                      /year
                    </div>
                  )}
                </div>
              </TableCell>

              <TableCell>
                <div className="min-h-[5.25rem] sm:min-h-0">
                  <div className="font-medium">
                    {milesBonus > 0
                      ? `${milesBonus.toLocaleString()} miles`
                      : "-"}
                    {hasPreviousBonus && diff !== 0 && (
                      <span
                        className={cn(
                          "ml-1 font-normal",
                          isNegative ? "text-primary-text" : "text-green-500",
                        )}
                      >
                        ({isNegative ? "▾" : "▴"}
                        {Math.abs(diff).toLocaleString()})
                      </span>
                    )}
                  </div>

                  <div className="mt-2 space-y-2 sm:hidden">
                    <div className="text-xs">
                      <span className="text-muted-foreground">Earn: </span>
                      {milesPerDollar.local} local / {milesPerDollar.overseas}{" "}
                      overseas mpd
                    </div>
                    <div className="text-xs">
                      <span className="text-muted-foreground">Fee: </span>
                      {formatMoney(annualFee)}
                    </div>
                  </div>
                </div>
              </TableCell>

              <TableCell className="hidden sm:table-cell">
                <div className="font-medium">
                  {milesPerDollar.local} local / {milesPerDollar.overseas}{" "}
                  overseas
                </div>
              </TableCell>

              <TableCell className="hidden text-right sm:table-cell">
                <div className="font-medium">{formatMoney(annualFee)}</div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
