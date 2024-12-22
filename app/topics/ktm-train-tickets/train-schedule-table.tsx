"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TRAIN_SCHEDULE_ITEMS } from "@/lib/content";

export function TrainScheduleTable() {
  return (
    <Table className="my-6" data-clarity-unmask="true">
      <TableCaption>
        We monitor these days and time slots from now till the next 38 days.
      </TableCaption>

      <TableHeader>
        <TableRow>
          <TableHead>Day</TableHead>
          <TableHead>Time</TableHead>
          <TableHead className="text-right">To</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {TRAIN_SCHEDULE_ITEMS.map((schedule) => (
          <TableRow key={schedule.day}>
            <TableCell>{schedule.day}</TableCell>
            <TableCell>{schedule.time}</TableCell>
            <TableCell className="text-right">{schedule.to}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
