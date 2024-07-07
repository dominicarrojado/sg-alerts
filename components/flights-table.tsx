"use client";

import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Anchor } from "@/components/ui/anchor";
import { useGetFlightsInfo } from "@/lib/api-hooks";
import { formatMoney, formatMoneyPeso } from "@/lib/number";
import { cn } from "@/lib/utils";
import { Currency, FetchStatus, FlightAirline } from "@/lib/enums";
import Balancer from "react-wrap-balancer";

type Props = {
  airline: FlightAirline;
  destinationLabel?: string;
  displayCityCode?: boolean;
  pricesLabel?: string;
  currency?: string;
  usePercentDiff?: boolean;
  withTravelBy?: boolean;
};

export function FlightsTable({
  airline,
  destinationLabel = "Destination",
  displayCityCode = true,
  pricesLabel = "Price",
  currency = Currency.SGD,
  usePercentDiff = true,
  withTravelBy = true,
}: Props) {
  const [fetchState, flightsInfo, getFlightsInfo] = useGetFlightsInfo(airline);
  const { items: flights, updatedAt } = flightsInfo;

  useEffect(() => {
    getFlightsInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  return fetchState === FetchStatus.Success ? (
    <Table className="my-6">
      <TableCaption>Last updated on {updatedAt}.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[220px]">{destinationLabel}</TableHead>
          {withTravelBy && (
            <TableHead className="hidden sm:table-cell">Travel By</TableHead>
          )}
          <TableHead className="text-right">{pricesLabel}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {flights.map((flight) => {
          const { price, previousPrice, destinationCityCode } = flight;
          const diff = previousPrice ? Number(price - previousPrice) : 0;
          const percentDiff =
            usePercentDiff && previousPrice ? (diff / previousPrice) * 100 : 0;
          const percentDiffRounded = Math.round(percentDiff);
          const isPositive = diff >= 0;

          return (
            <TableRow key={flight.id}>
              <TableCell>
                <Anchor href={flight.shareUrl} isExternal>
                  {flight.destinationCityName}
                  {displayCityCode && ` (${destinationCityCode})`}
                </Anchor>
              </TableCell>
              {withTravelBy && (
                <TableCell className="hidden sm:table-cell">
                  <Balancer>
                    {flight.departureDate} - {flight.returnDate}
                  </Balancer>
                </TableCell>
              )}
              <TableCell className="text-right font-medium">
                {currency === Currency.SGD
                  ? formatMoney(flight.price)
                  : formatMoneyPeso(flight.price)}
                {previousPrice &&
                  diff !== 0 &&
                  (!usePercentDiff || percentDiffRounded !== 0) && (
                    <span
                      className={cn(
                        "ml-1 font-normal",
                        isPositive ? "text-primary" : "text-green-500"
                      )}
                    >
                      ({isPositive && "+"}
                      {usePercentDiff ? percentDiffRounded : diff}
                      {usePercentDiff && "%"})
                    </span>
                  )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  ) : (
    <Table className="my-6">
      <TableCaption>
        <Skeleton className="h-5 w-1/2" />
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[230px]">
            <Skeleton className="h-5 w-full" />
          </TableHead>
          <TableHead className="hidden sm:table-cell">
            <Skeleton className="h-5 w-full" />
          </TableHead>
          <TableHead className="text-right">
            <Skeleton className="inline-block h-5 w-1/2 sm:w-full" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-5 w-full" />
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <Skeleton className="h-5 w-full" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="inline-block h-5 w-1/2 sm:w-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
