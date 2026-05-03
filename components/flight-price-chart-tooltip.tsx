"use client";

import { formatDepositRatesChartTickDate } from "@/lib/date";
import { Currency } from "@/lib/enums";
import { formatMoney, formatMoneyPeso } from "@/lib/number";
import type {
  DepositRatesChartRange,
  DepositRatesChartTooltipPayloadItem,
} from "@/lib/types";

type Props = {
  active?: boolean;
  payload?: Array<DepositRatesChartTooltipPayloadItem>;
  label?: string;
  range: DepositRatesChartRange;
  currency: string;
};

export function FlightPriceChartTooltip({
  active,
  payload,
  label,
  range,
  currency,
}: Props) {
  if (!active || !payload?.length) {
    return null;
  }

  const value = payload[0]?.value;
  const price = typeof value === "number" ? value : Number(value ?? 0);

  return (
    <div className="grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
      <div className="font-medium">
        {typeof label === "string"
          ? formatDepositRatesChartTickDate(label, range)
          : ""}
      </div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-muted-foreground">Price</span>
        <span className="font-mono font-medium tabular-nums text-foreground">
          {currency === Currency.SGD
            ? formatMoney(price)
            : formatMoneyPeso(price)}
        </span>
      </div>
    </div>
  );
}
