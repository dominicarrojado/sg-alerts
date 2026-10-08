import Link from "next/link";
import React from "react";
import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Anchor } from "@/components/ui/anchor";
import { FinancialDisclaimerType, Routes } from "@/lib/enums";
import { cn } from "@/lib/utils";

type Props = {
  type: FinancialDisclaimerType;
  className?: string;
};

export default function FinancialDisclaimer({ type, className }: Props) {
  const isDepositRates = type === FinancialDisclaimerType.DepositRates;

  return (
    <Alert role="note" className={cn("my-6", className)}>
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>
        {isDepositRates
          ? "Important Rate Notice & Disclaimer"
          : "Important Promotional Notice & Disclaimer"}
      </AlertTitle>
      <AlertDescription className="text-muted-foreground">
        {isDepositRates ? (
          <>
            Interest rates, tenures and minimum deposits are scraped on a
            best-effort basis and may be outdated. This is not financial advice.
            Always verify current rates directly with the bank before depositing
            funds.{" "}
            <Link href={Routes.Disclaimer} passHref legacyBehavior>
              <Anchor>Read full disclaimer</Anchor>
            </Link>
            .
          </>
        ) : (
          <>
            Bonus miles, earn rates and fees are scraped on a best-effort basis
            and subject to bank terms and caps. This is not financial advice.
            Always check official bank terms before applying.{" "}
            <Link href={Routes.Disclaimer} passHref legacyBehavior>
              <Anchor>Read full disclaimer</Anchor>
            </Link>
            .
          </>
        )}
      </AlertDescription>
    </Alert>
  );
}
