"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDepositRatesChartData } from "@/lib/api-hooks";
import {
  DEPOSIT_RATES_CHART_COLORS,
  DEPOSIT_RATES_CHART_RANGE_LABELS,
} from "@/lib/constants";
import { formatDepositRatesChartTickDate } from "@/lib/date";
import { FetchStatus } from "@/lib/enums";
import type { DepositRatesChartRange } from "@/lib/types";
import { DepositRatesChartTooltip } from "./deposit-rates-chart-tooltip";

export function DepositRatesChart() {
  const [range, setRange] = useState<DepositRatesChartRange>("1m");
  const [fetchStatus, chartData, getDepositRatesChartData] =
    useGetDepositRatesChartData();

  useEffect(() => {
    getDepositRatesChartData(range);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  const isLoading =
    fetchStatus === FetchStatus.Idle || fetchStatus === FetchStatus.Loading;

  const bankKeys = chartData ? Object.keys(chartData.chartConfig) : [];

  const chartConfig: ChartConfig = bankKeys.reduce(
    (acc, bank) => ({
      ...acc,
      [bank]: { label: chartData!.chartConfig[bank].label },
    }),
    {},
  );

  const bankColors: Record<string, string> = bankKeys.reduce(
    (acc, bank, index) => ({
      ...acc,
      [bank]:
        DEPOSIT_RATES_CHART_COLORS[
          index % DEPOSIT_RATES_CHART_COLORS.length
        ],
    }),
    {},
  );

  const allRates = chartData
    ? chartData.chartData.flatMap((point) =>
        bankKeys
          .map((bank) => point[bank])
          .filter((rate): rate is number => typeof rate === "number"),
      )
    : [];
  const minRate = allRates.length ? Math.min(...allRates) : 0;
  const maxRate = allRates.length ? Math.max(...allRates) : 1;
  const yAxisMin = Math.max(0, Number((minRate - 0.1).toFixed(2)));
  const yAxisMax = Number((maxRate + 0.1).toFixed(2));

  return (
    <Card className="my-6">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-4">
        <div>
          <CardTitle className="text-base">Fixed Deposit Rates Trend</CardTitle>
          <CardDescription>
            Showing the rates per bank in Singapore
          </CardDescription>
        </div>
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
      </CardHeader>
      <CardContent className="pb-4 pl-2 pr-4">
        {isLoading ? (
          <Skeleton className="h-[350px] w-full" />
        ) : fetchStatus === FetchStatus.Failure || !chartData ? null : (
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <LineChart
              data={chartData.chartData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
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
                tickFormatter={(value) => `${value}%`}
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                width={45}
              />
              <Tooltip
                content={<DepositRatesChartTooltip range={range} />}
                cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
              />
              {bankKeys.map((bank) => (
                <Line
                  key={bank}
                  type="monotone"
                  dataKey={bank}
                  name={chartData.chartConfig[bank].label}
                  stroke={bankColors[bank]}
                  strokeWidth={2}
                  dot={false}
                  connectNulls
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
