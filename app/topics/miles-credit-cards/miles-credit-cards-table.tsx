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
import { Skeleton } from "@/components/ui/skeleton";
import { Anchor } from "@/components/ui/anchor";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useGetMilesCreditCardsInfo } from "@/lib/api-hooks";
import { formatMoney } from "@/lib/number";
import { cn } from "@/lib/utils";
import { FetchStatus } from "@/lib/enums";

export function MilesCreditCardsTable() {
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

  if (fetchState !== FetchStatus.Success) {
    return (
      <Table className="my-6">
        <TableCaption>
          <div className="flex flex-col items-center gap-3">
            <Skeleton className="h-3.5 w-1/2" />
            <Skeleton className="h-3 w-3/5" />
          </div>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="sm:w-[260px]">
              <Skeleton className="h-5 w-full" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5 w-full" />
            </TableHead>
            <TableHead className="hidden sm:table-cell">
              <Skeleton className="h-5 w-full" />
            </TableHead>
            <TableHead className="hidden text-right sm:table-cell">
              <Skeleton className="h-5 w-full" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 8 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-5 w-full" />
                <Skeleton className="mt-1 h-3 w-2/3" />
              </TableCell>
              <TableCell className="space-y-1">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-full sm:hidden" />
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Skeleton className="h-5 w-full" />
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Skeleton className="ml-auto h-5 w-24" />
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
    <Table className="my-6" data-clarity-unmask="true">
      <TableCaption>
        Last updated on {updatedAt}. <br />
        <small>
          Earn rates in miles per dollar (mpd) and sign-up bonus miles
          promotions are subject to bank terms and conditions.
        </small>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="sm:w-[260px]">Credit Card</TableHead>
          <TableHead>
            Bonus Miles
            <div className="font-normal text-muted-foreground sm:hidden">
              / Earn Rate & Fee
            </div>
          </TableHead>
          <TableHead className="hidden sm:table-cell">
            Earn Rate (mpd)
          </TableHead>
          <TableHead className="hidden text-right sm:table-cell">
            Annual Fee
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {creditCards.map((card) => {
          const {
            id,
            bank,
            name,
            tier,
            milesBonus,
            previousMilesBonus,
            milesBonusDescription,
            milesPerDollar,
            annualFee,
            annualFeeWaiver,
            promoEndDate,
            link,
          } = card;

          const hasPreviousBonus = typeof previousMilesBonus === "number";
          const diff = hasPreviousBonus ? milesBonus - previousMilesBonus : 0;
          const isNegative = diff < 0;

          return (
            <TableRow key={id}>
              <TableCell className="align-top">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Anchor
                    href={link}
                    isExternal
                    className="font-medium underline underline-offset-4"
                  >
                    {name}
                  </Anchor>
                  <Badge variant="outline" className="text-[10px]">
                    {tier}
                  </Badge>
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {bank}
                </div>
              </TableCell>

              <TableCell className="align-top">
                <div className="font-medium">
                  {milesBonus > 0
                    ? `${milesBonus.toLocaleString()} miles`
                    : "-"}
                  {hasPreviousBonus && diff !== 0 && (
                    <span
                      className={cn(
                        "ml-1 font-normal",
                        isNegative ? "text-primary" : "text-green-500",
                      )}
                    >
                      ({isNegative ? "▾" : "▴"}
                      {Math.abs(diff).toLocaleString()})
                    </span>
                  )}
                </div>
                {milesBonusDescription && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {milesBonusDescription}
                  </p>
                )}

                <div className="mt-2 space-y-1 sm:hidden">
                  <div className="text-xs">
                    <span className="text-muted-foreground">Earn: </span>
                    {milesPerDollar.local} local / {milesPerDollar.overseas}{" "}
                    overseas mpd
                  </div>
                  {milesPerDollar.bonusCategories && (
                    <div className="text-[11px] text-muted-foreground">
                      {milesPerDollar.bonusCategories}
                    </div>
                  )}
                  <div className="text-xs">
                    <span className="text-muted-foreground">Fee: </span>
                    {formatMoney(annualFee)}
                    {annualFeeWaiver && ` (${annualFeeWaiver})`}
                  </div>
                  {promoEndDate && (
                    <div className="text-[11px] text-muted-foreground">
                      Valid till: {promoEndDate}
                    </div>
                  )}
                </div>
              </TableCell>

              <TableCell className="hidden align-top sm:table-cell">
                <div className="font-medium">
                  {milesPerDollar.local} local / {milesPerDollar.overseas}{" "}
                  overseas
                </div>
                {milesPerDollar.bonusCategories && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    {milesPerDollar.bonusCategories}
                  </div>
                )}
              </TableCell>

              <TableCell className="hidden text-right align-top sm:table-cell">
                <div className="font-medium">{formatMoney(annualFee)}</div>
                {annualFeeWaiver && (
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {annualFeeWaiver}
                  </div>
                )}
                {promoEndDate && (
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    Valid till: {promoEndDate}
                  </div>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
