"use client";

import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useGetMilesCreditCardsInfo } from "@/lib/api-hooks";
import { formatMoney } from "@/lib/number";
import { cn } from "@/lib/utils";
import {
  FetchStatus,
  FinancialDisclaimerType,
  MilesCreditCardId,
} from "@/lib/enums";
import FinancialDisclaimer from "@/components/financial-disclaimer";

type Props = {
  cardId: MilesCreditCardId | string;
};

export function MilesCreditCardDetails({ cardId }: Props) {
  const [fetchState, milesCreditCardsInfo, getMilesCreditCardsInfo] =
    useGetMilesCreditCardsInfo();
  const { items: creditCards, updatedAt } = milesCreditCardsInfo;

  useEffect(() => {
    getMilesCreditCardsInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content: React.ReactNode = null;

  if (fetchState === FetchStatus.Failure) {
    content = null;
  } else if (fetchState !== FetchStatus.Success) {
    content = (
      <Card className="my-6">
        <CardHeader>
          <div className="space-y-2">
            <Skeleton className="h-7 w-64" />
            <Skeleton className="h-4 w-32" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-32 w-full rounded-lg" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Skeleton className="h-24 w-full rounded-md" />
            <Skeleton className="h-24 w-full rounded-md" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
          </div>
        </CardContent>
      </Card>
    );
  } else {
    const card = creditCards.find((item) => item.id === cardId);

    if (!card) {
      content = (
        <Alert className="my-6" data-clarity-unmask="true">
          <CheckCircle className="mt-1 h-4 w-4" />
          <AlertTitle className="leading-normal">
            {updatedAt
              ? `Last updated on ${updatedAt}. Card details are currently not available.`
              : "Card details are currently not available."}
          </AlertTitle>
        </Alert>
      );
    } else {
      const {
        name,
        bank,
        milesBonus,
        previousMilesBonus,
        milesBonusDescription,
        milesPerDollar,
        annualFee,
        annualFeeWaiver,
        promoEndDate,
      } = card;

      const hasPreviousBonus = typeof previousMilesBonus === "number";
      const diff = hasPreviousBonus ? milesBonus - previousMilesBonus : 0;
      const isNegative = diff < 0;

      content = (
        <div className="my-6 space-y-6" data-clarity-unmask="true">
          <Card>
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardDescription className="mt-1">{bank}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Sign-Up Bonus Callout */}
              <div className="rounded-lg border bg-muted/40 p-4">
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Sign-Up Bonus
                </div>
                <div className="mt-1 text-2xl font-bold">
                  {milesBonus > 0
                    ? `${milesBonus.toLocaleString()} miles`
                    : "No current bonus offer"}
                  {hasPreviousBonus && diff !== 0 && (
                    <span
                      className={cn(
                        "ml-2 text-sm font-normal",
                        isNegative ? "text-primary" : "text-green-500",
                      )}
                    >
                      ({isNegative ? "▾" : "▴"}
                      {Math.abs(diff).toLocaleString()} miles)
                    </span>
                  )}
                </div>
                {milesBonusDescription && (
                  <p className="mt-2 text-sm text-foreground/90">
                    {milesBonusDescription}
                  </p>
                )}
                {promoEndDate && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    Promotion valid till: {promoEndDate}
                  </div>
                )}
              </div>

              {/* Earn Rates Section */}
              <div>
                <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Earn Rates (Miles per Dollar)
                </h4>
                <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-md border p-3">
                    <div className="text-xs text-muted-foreground">
                      Local Spend
                    </div>
                    <div className="mt-1 text-lg font-semibold">
                      {milesPerDollar.local} mpd
                    </div>
                    <div className="text-xs text-muted-foreground">
                      miles per S$1 spent locally
                    </div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="text-xs text-muted-foreground">
                      Overseas / Foreign Currency
                    </div>
                    <div className="mt-1 text-lg font-semibold">
                      {milesPerDollar.overseas} mpd
                    </div>
                    <div className="text-xs text-muted-foreground">
                      miles per S$1 equivalent
                    </div>
                  </div>
                </div>
                {milesPerDollar.bonusCategories && (
                  <div className="mt-3 rounded-md border border-dashed p-3 text-sm">
                    <span className="font-medium text-foreground">
                      Bonus Categories:{" "}
                    </span>
                    <span className="text-muted-foreground">
                      {milesPerDollar.bonusCategories}
                    </span>
                  </div>
                )}
              </div>

              {/* Annual Fee & Waivers */}
              <div>
                <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Annual Fee & Policy
                </h4>
                <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-md border p-3">
                    <div className="text-xs text-muted-foreground">
                      Annual Fee
                    </div>
                    <div className="mt-1 text-lg font-semibold">
                      {formatMoney(annualFee)}
                    </div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="text-xs text-muted-foreground">
                      Fee Waiver Policy
                    </div>
                    <div className="mt-1 text-sm font-medium">
                      {annualFeeWaiver || "None"}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="text-center text-xs text-muted-foreground">
            Last updated on {updatedAt}. Earn rates and sign-up bonus promotions
            are subject to bank terms and conditions.
          </div>
        </div>
      );
    }
  }

  return (
    <>
      {content}
      <FinancialDisclaimer type={FinancialDisclaimerType.MilesCreditCards} />
    </>
  );
}
