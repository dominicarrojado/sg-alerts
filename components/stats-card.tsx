"use client";

import { useState, useEffect, ReactNode, useMemo } from "react";
import { Loader2Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  finalCount: number;
  description: string;
  isLoading?: boolean;
  Icon: ReactNode;
};

export default function StatsCard(props: Props) {
  const { finalCount, description, isLoading, Icon } = props;
  const [count, setCount] = useState(0);
  const intervalMs = useMemo(
    () => Math.max(1500 / finalCount, 10),
    [finalCount],
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isLoading) {
      timer = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount < finalCount) {
            return prevCount + Math.ceil((finalCount - prevCount) / 10);
          }
          clearInterval(timer);
          return finalCount;
        });
      }, intervalMs);
    }

    return () => clearInterval(timer);
  }, [isLoading, finalCount, intervalMs]);

  return (
    <Card
      className="flex flex-grow items-center gap-6 pr-6"
      data-clarity-unmask="true"
    >
      <div className="flex-grow">
        <CardHeader className="pb-2">
          <CardTitle className="text-4xl">
            {isLoading || count === 0 ? (
              <Loader2Icon className="h-10 w-10 animate-spin" />
            ) : (
              count.toLocaleString()
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted p-2.5 text-muted-foreground">
        {Icon}
      </div>
    </Card>
  );
}
