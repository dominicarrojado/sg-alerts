"use client";

import { useEffect, useMemo } from "react";
import { Anchor } from "@/components/ui/anchor";
import { useGetDepositRatesInfo } from "@/lib/api-hooks";
import { FetchStatus } from "@/lib/enums";

type Props = {
  bank: string;
  linkText: string;
};

export function DepositRateAnchor({ bank, linkText }: Props) {
  const [fetchStatus, depositRatesInfo, getDepositRatesInfo] =
    useGetDepositRatesInfo();

  useEffect(() => {
    getDepositRatesInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bankLink = useMemo(() => {
    const bankRates = depositRatesInfo.items
      .filter((depositRate) => depositRate.bank === bank)
      .sort((left, right) => {
        if (right.rate !== left.rate) {
          return right.rate - left.rate;
        }

        return left.minDeposit - right.minDeposit;
      });

    return bankRates[0]?.link;
  }, [depositRatesInfo.items, bank]);

  if (fetchStatus !== FetchStatus.Success || !bankLink) {
    return <span>{linkText}</span>;
  }

  return (
    <Anchor href={bankLink} isExternal>
      {linkText}
    </Anchor>
  );
}
