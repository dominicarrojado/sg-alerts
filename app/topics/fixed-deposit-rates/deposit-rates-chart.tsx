"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDepositRatesChartData } from "@/lib/api-hooks";
import { DEPOSIT_RATES_CHART_RANGE_LABELS } from "@/lib/constants";
import { formatDepositRatesChartTickDate } from "@/lib/date";
import { FetchStatus } from "@/lib/enums";
import { getDepositRatesChartBankColor } from "@/lib/fixed-deposit-rates";
import type { DepositRatesChartRange } from "@/lib/types";
import { DepositRatesChartTooltip } from "./deposit-rates-chart-tooltip";

export function DepositRatesChart() {
  const [range, setRange] = useState<DepositRatesChartRange>("6m");
  const [selectedBanks, setSelectedBanks] = useState<Array<string> | null>(
    null,
  );
  const [isBanksMenuOpen, setIsBanksMenuOpen] = useState(false);
  const [fetchStatus, chartData, getDepositRatesChartData] =
    useGetDepositRatesChartData();
  const chartConfig = chartData?.chartConfig;

  useEffect(() => {
    getDepositRatesChartData(range);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  const isLoading =
    fetchStatus === FetchStatus.Idle || fetchStatus === FetchStatus.Loading;

  const bankKeys = useMemo(
    () => (chartConfig ? Object.keys(chartConfig) : []),
    [chartConfig],
  );
  const sortedBankKeys = useMemo(
    () =>
      [...bankKeys].sort((leftBank, rightBank) => {
        const leftLabel = chartConfig?.[leftBank].label ?? leftBank;
        const rightLabel = chartConfig?.[rightBank].label ?? rightBank;

        return String(leftLabel).localeCompare(String(rightLabel));
      }),
    [bankKeys, chartConfig],
  );

  useEffect(() => {
    if (!bankKeys.length) {
      return;
    }

    setSelectedBanks((currentSelection) => {
      if (currentSelection === null) {
        return bankKeys;
      }

      return currentSelection.filter((bank) => bankKeys.includes(bank));
    });
  }, [bankKeys]);

  const visibleBankKeys =
    selectedBanks === null
      ? bankKeys
      : bankKeys.filter((bank) => selectedBanks.includes(bank));
  const allBanksChecked =
    bankKeys.length > 0 && visibleBankKeys.length === bankKeys.length;

  const chartContainerConfig: ChartConfig = visibleBankKeys.reduce(
    (acc, bank) => ({
      ...acc,
      [bank]: { label: chartConfig![bank].label },
    }),
    {},
  );

  const bankColors: Record<string, string> = bankKeys.reduce(
    (acc, bank, index) => ({
      ...acc,
      [bank]: getDepositRatesChartBankColor(
        bank,
        String(chartConfig?.[bank].label ?? bank),
        index,
      ),
    }),
    {},
  );

  const allRates = chartData
    ? chartData.chartData.flatMap((point) =>
        visibleBankKeys
          .map((bank) => point[bank])
          .filter((rate): rate is number => typeof rate === "number"),
      )
    : [];
  const minRate = allRates.length ? Math.min(...allRates) : 0;
  const maxRate = allRates.length ? Math.max(...allRates) : 1;
  const yAxisMin = Math.max(0, Number((minRate - 0.1).toFixed(2)));
  const yAxisMax = Number((maxRate + 0.1).toFixed(2));

  const handleToggleAllBanks = () => {
    setSelectedBanks((currentSelection) => {
      const isCurrentlyAllSelected =
        !!currentSelection && currentSelection.length === bankKeys.length;

      return isCurrentlyAllSelected ? [] : bankKeys;
    });
  };

  const handleToggleBank = (bank: string) => {
    setSelectedBanks((currentSelection) => {
      const nextSelection = currentSelection ?? bankKeys;

      if (nextSelection.length === bankKeys.length) {
        return [bank];
      }

      if (nextSelection.includes(bank)) {
        return nextSelection.filter((selectedBank) => selectedBank !== bank);
      }

      return [...nextSelection, bank];
    });
  };

  const bankFilterLabel = allBanksChecked
    ? "All banks"
    : visibleBankKeys.length === 0
      ? "No banks selected"
      : `${visibleBankKeys.length} banks selected`;

  return (
    <Card className="my-6">
      <CardHeader className="pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <DropdownMenu
            open={isBanksMenuOpen}
            onOpenChange={setIsBanksMenuOpen}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[180px] justify-between"
              >
                <span className="truncate">{bankFilterLabel}</span>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[220px] p-0">
              <DropdownMenuLabel className="px-2 pb-2 pt-3">
                Displayed banks
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="relative">
                <div className="max-h-80 overflow-y-auto px-1 pb-1">
                  <DropdownMenuCheckboxItem
                    checked={allBanksChecked}
                    onCheckedChange={handleToggleAllBanks}
                  >
                    All banks
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  {sortedBankKeys.map((bank) => (
                    <DropdownMenuCheckboxItem
                      key={bank}
                      checked={visibleBankKeys.includes(bank)}
                      onCheckedChange={() => handleToggleBank(bank)}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 shrink-0 rounded-[2px]"
                          style={{ backgroundColor: bankColors[bank] }}
                        />
                        <span>
                          {chartData?.chartConfig[bank].label ?? bank}
                        </span>
                      </span>
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
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
      <CardContent className="pb-4 pl-2 pr-4">
        {isLoading ? (
          <Skeleton className="h-[350px] w-full" />
        ) : visibleBankKeys.length === 0 ? (
          <div className="flex h-[350px] items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
            Select at least one bank to display rate trends.
          </div>
        ) : fetchStatus === FetchStatus.Failure || !chartData ? null : (
          <ChartContainer
            config={chartContainerConfig}
            className="h-[350px] w-full"
          >
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
              {visibleBankKeys.map((bank) => (
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
