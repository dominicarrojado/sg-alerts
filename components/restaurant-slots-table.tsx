"use client";

import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Anchor } from "@/components/ui/anchor";
import { useGetRestaurantSlotsInfo } from "@/lib/api-hooks";
import { FetchStatus, Restaurant } from "@/lib/enums";
import { formatDate } from "@/lib/date";

interface RestaurantSlotsTableProps {
  restaurant: Restaurant;
}

export function RestaurantSlotsTable({
  restaurant,
}: RestaurantSlotsTableProps) {
  const [fetchState, restaurantSlotsInfo, getRestaurantSlotsInfo] =
    useGetRestaurantSlotsInfo(restaurant);
  const {
    items: restaurantSlots,
    updatedAt,
    lastAvailableDate,
  } = restaurantSlotsInfo;

  useEffect(() => {
    getRestaurantSlotsInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurant]);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  if (fetchState !== FetchStatus.Success) {
    return (
      <Alert className="my-6">
        <Skeleton className="absolute left-4 top-4 mt-1 h-4 w-4 rounded-full" />
        <AlertTitle className="pl-7 leading-normal">
          <Skeleton className="h-5 w-full sm:h-6 sm:w-1/2" />
          <Skeleton className="mt-1 h-6 w-4/5 sm:hidden" />
        </AlertTitle>
        <AlertDescription className="pl-7 text-muted-foreground">
          <Skeleton className="h-4 w-full sm:h-5 sm:w-1/3" />
          <Skeleton className="mt-1 h-5 w-2/5 sm:hidden" />
        </AlertDescription>
      </Alert>
    );
  }

  if (restaurantSlots.length === 0) {
    return (
      <Alert className="my-6" data-clarity-unmask="true">
        <CheckCircle className="mt-1 h-4 w-4" />
        <AlertTitle className="leading-normal">
          {lastAvailableDate
            ? `Last available slots were spotted on ${lastAvailableDate}.`
            : "No table reservation slots currently available."}
        </AlertTitle>
        {updatedAt && (
          <AlertDescription className="text-muted-foreground">
            Last updated on {updatedAt}.
          </AlertDescription>
        )}
      </Alert>
    );
  }

  return (
    <Table className="my-6" data-clarity-unmask="true">
      <TableCaption>Last updated on {updatedAt}.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            Seating Area
            <div className="font-normal text-muted-foreground sm:hidden">
              Meal / Earliest Date
            </div>
          </TableHead>
          <TableHead className="hidden sm:table-cell">Meal</TableHead>
          <TableHead className="hidden sm:table-cell">
            Available Slots
          </TableHead>
          <TableHead className="hidden sm:table-cell">Earliest Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {restaurantSlots.map((slot) => {
          const formattedMeal =
            slot.mealTypeName.charAt(0).toUpperCase() +
            slot.mealTypeName.slice(1);
          const formattedDate = slot.earliestDate
            ? formatDate(slot.earliestDate)
            : "N/A";

          return (
            <TableRow key={`${slot.tableName}-${slot.mealTypeName}`}>
              <TableCell className="font-medium">
                {slot.tableName}
                <div className="font-normal text-muted-foreground sm:hidden">
                  {formattedMeal} · {formattedDate} ({slot.slotsCount}{" "}
                  {slot.slotsCount === 1 ? "slot" : "slots"})
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {formattedMeal}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {slot.slotsCount}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {formattedDate}
              </TableCell>
              <TableCell className="text-right">
                <Anchor href={slot.link} isExternal>
                  Reserve Now
                </Anchor>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
