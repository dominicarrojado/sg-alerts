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
            Interest rates, tenures, and minimum deposit requirements are
            gathered via automated web scraping on a best-effort basis and may
            not reflect real-time updates or bank terms. Information is for
            reference only and does not constitute financial or investment
            advice. Always verify current rates, terms, and eligibility directly
            with the respective bank before committing funds.{" "}
            <Link href={Routes.Disclaimer} passHref legacyBehavior>
              <Anchor>Read full disclaimer</Anchor>
            </Link>
            .
          </>
        ) : (
          <>
            Sign-up bonus miles, earn rates (mpd), and annual fee policies are
            gathered via automated web scraping on a best-effort basis and are
            subject to change without notice. Bonus promotions frequently carry
            strict bank eligibility criteria (such as new-to-bank status,
            minimum spend, or annual fee payment) and promotional caps.
            Information is for reference only and does not constitute financial
            advice. Always verify terms on the official bank or card issuer
            website before applying.{" "}
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
