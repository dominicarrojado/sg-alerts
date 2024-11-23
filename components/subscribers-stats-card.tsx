"use client";

import { useEffect } from "react";
import { UsersIcon } from "lucide-react";
import { useGetSubscribersCount } from "@/lib/api-hooks";
import { FetchStatus } from "@/lib/enums";
import StatsCard from "./stats-card";

export default function SubscribersStatsCard() {
  const [fetchStatus, subscribersCount, getSubscribersCount] =
    useGetSubscribersCount();
  const isLoading =
    fetchStatus === FetchStatus.Idle || fetchStatus === FetchStatus.Loading;

  useEffect(() => {
    getSubscribersCount();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return fetchStatus !== FetchStatus.Failure ? (
    <StatsCard
      finalCount={subscribersCount}
      description="Total Subscribers"
      isLoading={isLoading}
      Icon={<UsersIcon />}
    />
  ) : null;
}
