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
import { Alert, AlertTitle } from "@/components/ui/alert";
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
  const { items: restaurantSlots, updatedAt } = restaurantSlotsInfo;

  useEffect(() => {
    getRestaurantSlotsInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurant]);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  if (fetchState !== FetchStatus.Success) {
    return (
      <Table className="my-6">
        <TableCaption>
          <div className="flex flex-col items-center gap-3">
            <Skeleton className="h-5 w-1/2" />
          </div>
        </TableCaption>
        <TableHeader>
          <TableRow className="h-[48px]">
            <TableHead>
              <Skeleton className="h-5 w-full" />
            </TableHead>
            <TableHead className="hidden sm:table-cell">
              <Skeleton className="h-5 w-full" />
            </TableHead>
            <TableHead className="hidden sm:table-cell">
              <Skeleton className="h-5 w-full" />
            </TableHead>
            <TableHead className="hidden sm:table-cell">
              <Skeleton className="h-5 w-full" />
            </TableHead>
            <TableHead className="text-right">
              <Skeleton className="ml-auto h-5 w-20" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 2 }).map((_, index) => (
            <TableRow key={index} className="h-[52px]">
              <TableCell>
                <Skeleton className="h-5 w-3/4" />
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Skeleton className="h-5 w-16" />
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Skeleton className="h-5 w-12" />
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Skeleton className="h-5 w-24" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="ml-auto h-5 w-20" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (restaurantSlots.length === 0) {
    return (
      <Alert className="my-6" data-clarity-unmask="true">
        <CheckCircle className="mt-1 h-4 w-4" />
        <AlertTitle className="leading-normal">
          {updatedAt
            ? `No table reservation slots currently available. Last checked on ${updatedAt}.`
            : "No table reservation slots currently available."}
        </AlertTitle>
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
