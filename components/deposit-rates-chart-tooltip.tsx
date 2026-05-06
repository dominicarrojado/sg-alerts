"use client";

import type { ChartRange, ChartTooltipPayloadItem } from "@/lib/types";
import { formatChartTickDate } from "@/lib/date";

type Props = {
  active?: boolean;
  payload?: Array<ChartTooltipPayloadItem>;
  label?: string;
  range: ChartRange;
  hideColorIndicator?: boolean;
};

export function DepositRatesChartTooltip({
  active,
  payload,
  label,
  range,
  hideColorIndicator,
}: Props) {
  if (!active || !payload?.length) {
    return null;
  }

  const sorted = [...payload]
    .filter((entry) => entry.value != null)
    .sort((a, b) => Number(b.value ?? 0) - Number(a.value ?? 0));

  return (
    <div className="grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
      <div className="font-medium">
        {typeof label === "string" ? formatChartTickDate(label, range) : ""}
      </div>
      <div className="grid gap-1.5">
        {sorted.map((entry, index) => {
          const currentRate = Number(entry.value ?? 0).toFixed(2);
          const previousRate =
            index > 0 ? Number(sorted[index - 1].value ?? 0).toFixed(2) : null;
          const shouldShowRate = currentRate !== previousRate;

          return (
            <div
              key={entry.dataKey}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-1.5">
                {!hideColorIndicator && (
                  <div
                    className="h-2 w-2 shrink-0 rounded-[2px]"
                    style={{ backgroundColor: entry.color }}
                  />
                )}
                <span className="text-muted-foreground">{entry.name}</span>
              </div>
              {shouldShowRate ? (
                <span className="font-mono font-medium tabular-nums text-foreground">
                  {currentRate}%
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
