"use client";

import { useEffect, useMemo } from "react";
import { Anchor } from "@/components/ui/anchor";
import { useGetFlightsInfo } from "@/lib/api-hooks";
import { FetchStatus, FlightAirline } from "@/lib/enums";

type Props = {
  airline: FlightAirline;
  destinationCityCode: string;
  linkText: string;
};

export function FlightShareUrlAnchor({
  airline,
  destinationCityCode,
  linkText,
}: Props) {
  const [fetchStatus, flightsInfo, getFlightsInfo] = useGetFlightsInfo(airline);

  useEffect(() => {
    getFlightsInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shareUrl = useMemo(() => {
    const destinationFlights = flightsInfo.items
      .filter((flight) => flight.destinationCityCode === destinationCityCode)
      .sort((left, right) => left.price - right.price);

    return destinationFlights[0]?.shareUrl;
  }, [flightsInfo.items, destinationCityCode]);

  if (fetchStatus !== FetchStatus.Success || !shareUrl) {
    return <span>{linkText}</span>;
  }

  return (
    <Anchor href={shareUrl} isExternal>
      {linkText}
    </Anchor>
  );
}
