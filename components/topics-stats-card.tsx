"use client";

import { RssIcon } from "lucide-react";
import StatsCard from "@/components/stats-card";
import { TOPICS_COUNT } from "@/lib/constants";

export default function TopicsStatsCard() {
  return (
    <StatsCard
      finalCount={TOPICS_COUNT}
      description="Active Topics"
      Icon={<RssIcon />}
    />
  );
}
