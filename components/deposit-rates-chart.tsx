"use client";

import { useEffect, useMemo, useState } from "react";
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
import { DepositRatesChartTooltip } from "@/components/deposit-rates-chart-tooltip";

type Props = {
  bank?: string;
  title?: string;
};

export function DepositRatesChart({ bank, title }: Props) {
  const [range, setRange] = useState<DepositRatesChartRange>("6m");
  const [selectedBanks, setSelectedBanks] = useState<Array<string> | null>(
    null,
  );
  const [isBanksMenuOpen, setIsBanksMenuOpen] = useState(false);
  const [fetchStatus, chartData, getDepositRatesChartData] =
    useGetDepositRatesChartData();
  const chartConfig = chartData?.chartConfig;

  useEffect(() => {
    getDepositRatesChartData(range, bank);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, bank]);

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

      return currentSelection.filter((selectedBank) =>
        bankKeys.includes(selectedBank),
      );
    });
  }, [bankKeys]);

  const visibleBankKeys =
    selectedBanks === null
      ? bankKeys
      : bankKeys.filter((selectedBank) => selectedBanks.includes(selectedBank));
  const visibleSortedBankKeys = sortedBankKeys.filter((selectedBank) =>
    visibleBankKeys.includes(selectedBank),
  );
  const allBanksChecked =
    bankKeys.length > 0 && visibleBankKeys.length === bankKeys.length;

  const chartContainerConfig: ChartConfig = visibleBankKeys.reduce(
    (acc, selectedBank) => ({
      ...acc,
      [selectedBank]: { label: chartConfig![selectedBank].label },
    }),
    {},
  );

  const bankColors: Record<string, string> = bankKeys.reduce(
    (acc, selectedBank, index) => ({
      ...acc,
      [selectedBank]: getDepositRatesChartBankColor(
        selectedBank,
        String(chartConfig?.[selectedBank].label ?? selectedBank),
        index,
      ),
    }),
    {},
  );

  const allRates = chartData
    ? chartData.chartData.flatMap((point) =>
        visibleBankKeys
          .map((selectedBank) => point[selectedBank])
          .filter((rate): rate is number => typeof rate === "number"),
      )
    : [];
  const minRate = allRates.length ? Math.min(...allRates) : 0;
  const maxRate = allRates.length ? Math.max(...allRates) : 1;
  const yAxisMin = Math.max(0, Number((minRate - 0.1).toFixed(2)));
  const yAxisMax = Number((maxRate + 0.1).toFixed(2));
  const dataStateHeightClass = bank ? "h-[350px]" : "h-[450px]";

  const handleToggleAllBanks = () => {
    setSelectedBanks((currentSelection) => {
      const isCurrentlyAllSelected =
        !!currentSelection && currentSelection.length === bankKeys.length;

      return isCurrentlyAllSelected ? [] : bankKeys;
    });
  };

  const handleToggleBank = (selectedBank: string) => {
    setSelectedBanks((currentSelection) => {
      const nextSelection = currentSelection ?? bankKeys;

      if (nextSelection.length === bankKeys.length) {
        return [selectedBank];
      }

      if (nextSelection.includes(selectedBank)) {
        return nextSelection.filter((bankKey) => bankKey !== selectedBank);
      }

      return [...nextSelection, selectedBank];
    });
  };

  const bankFilterLabel = allBanksChecked
    ? "All banks"
    : visibleBankKeys.length === 0
      ? "No banks selected"
      : `${visibleBankKeys.length} banks selected`;
  const chartTitle =
    title ??
    (bank ? `${bank} Deposit Rates Trend` : "Fixed Deposit Rates Trend");

  return (
    <Card className="my-6">
      <CardHeader className="space-y-2 pb-4">
        {bank ? (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-semibold">{chartTitle}</h3>
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
        ) : (
          <>
            <h3 className="text-base font-semibold">{chartTitle}</h3>
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
                      {sortedBankKeys.map((selectedBank) => (
                        <DropdownMenuCheckboxItem
                          key={selectedBank}
                          checked={visibleBankKeys.includes(selectedBank)}
                          onCheckedChange={() => handleToggleBank(selectedBank)}
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className="h-2 w-2 shrink-0 rounded-[2px]"
                              style={{
                                backgroundColor: bankColors[selectedBank],
                              }}
                            />
                            <span>
                              {chartData?.chartConfig[selectedBank].label ??
                                selectedBank}
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
          </>
        )}
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {isLoading ? (
          <Skeleton className={`${dataStateHeightClass} w-full`} />
        ) : visibleBankKeys.length === 0 ? (
          <div
            className={`flex ${dataStateHeightClass} items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground`}
          >
            Select at least one bank to display rate trends.
          </div>
        ) : fetchStatus === FetchStatus.Failure || !chartData ? null : (
          <div className="space-y-3">
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
                  width={56}
                />
                <Tooltip
                  content={<DepositRatesChartTooltip range={range} />}
                  cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
                />
                {visibleBankKeys.map((selectedBank) => (
                  <Line
                    key={selectedBank}
                    type="monotone"
                    dataKey={selectedBank}
                    name={chartData.chartConfig[selectedBank].label}
                    stroke={bankColors[selectedBank]}
                    strokeWidth={2}
                    dot={false}
                    connectNulls
                    isAnimationActive={false}
                  />
                ))}
              </LineChart>
            </ChartContainer>
            {!bank && (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-2 text-xs text-muted-foreground">
                {visibleSortedBankKeys.map((selectedBank) => (
                  <div key={selectedBank} className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 shrink-0 rounded-[2px]"
                      style={{ backgroundColor: bankColors[selectedBank] }}
                    />
                    <span>{chartData.chartConfig[selectedBank].label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
