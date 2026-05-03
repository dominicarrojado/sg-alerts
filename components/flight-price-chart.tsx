"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetFlightSnapshotsChartData } from "@/lib/api-hooks";
import { DEPOSIT_RATES_CHART_RANGE_LABELS } from "@/lib/constants";
import { formatDepositRatesChartTickDate } from "@/lib/date";
import { Currency, FetchStatus, FlightAirline } from "@/lib/enums";
import { formatMoney, formatMoneyPeso } from "@/lib/number";
import type { DepositRatesChartRange } from "@/lib/types";
import { FlightPriceChartTooltip } from "@/components/flight-price-chart-tooltip";

type Props = {
  airline: FlightAirline;
  destinationCityCode: string;
  chartTitle?: string;
};

export function FlightPriceChart({
  airline,
  destinationCityCode,
  chartTitle,
}: Props) {
  const [range, setRange] = useState<DepositRatesChartRange>("6m");
  const [fetchStatus, chartData, getFlightSnapshotsChartData] =
    useGetFlightSnapshotsChartData(airline, destinationCityCode);

  useEffect(() => {
    getFlightSnapshotsChartData(range);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  const isLoading =
    fetchStatus === FetchStatus.Idle || fetchStatus === FetchStatus.Loading;

  const chartContainerConfig: ChartConfig = useMemo(
    () => ({
      price: {
        label: chartData?.chartConfig.price?.label ?? "Price",
      },
    }),
    [chartData],
  );

  const allPrices = (chartData?.chartData ?? []).map((point) => point.price);
  const minPrice = allPrices.length ? Math.min(...allPrices) : 0;
  const maxPrice = allPrices.length ? Math.max(...allPrices) : 1;
  const yAxisMin = Math.max(0, minPrice - 10);
  const yAxisMax = maxPrice + 10;

  return (
    <Card className="my-6">
      <CardHeader className="space-y-2 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-semibold">
            {chartTitle ??
              `${chartData?.destinationCityName ?? destinationCityCode} Price Trend`}
          </h3>
          <Select
            value={range}
            onValueChange={(v) => setRange(v as DepositRatesChartRange)}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(
                Object.entries(DEPOSIT_RATES_CHART_RANGE_LABELS) as Array<
                  [DepositRatesChartRange, string]
                >
              ).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {isLoading ? (
          <Skeleton className="h-[350px] w-full" />
        ) : fetchStatus === FetchStatus.Failure || !chartData ? null : (
          <ChartContainer
            config={chartContainerConfig}
            className="h-[350px] w-full"
          >
            <LineChart
              data={chartData.chartData}
              margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11 }}
                tickFormatter={(value) =>
                  formatDepositRatesChartTickDate(String(value), range)
                }
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[yAxisMin, yAxisMax]}
                tickFormatter={(value) =>
                  chartData.currency === Currency.SGD
                    ? formatMoney(Number(value))
                    : formatMoneyPeso(Number(value))
                }
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                width={60}
              />
              <Tooltip
                content={
                  <FlightPriceChartTooltip
                    range={range}
                    currency={chartData.currency}
                  />
                }
                cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
              />
              <Line
                type="monotone"
                dataKey="price"
                name={chartData.chartConfig.price?.label ?? "Price"}
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                connectNulls
                isAnimationActive={false}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
