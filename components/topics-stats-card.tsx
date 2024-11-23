"use client";

import { RssIcon } from "lucide-react";
import {
  DRIVING_TELEGRAM_CHANNELS,
  JAPAN_VISA_TELEGRAM_CHANNELS,
  MONEY_TELEGRAM_CHANNELS,
  NOTIFICATION_SETTINGS,
  THEME_PARK_TELEGRAM_CHANNELS,
  TRAVEL_TELEGRAM_CHANNELS,
} from "@/lib/content";
import StatsCard from "./stats-card";

export default function TopicsStatsCard() {
  const topicsCount =
    NOTIFICATION_SETTINGS.filter((setting) => !setting.hasTelegramChannel)
      .length +
    JAPAN_VISA_TELEGRAM_CHANNELS.length +
    DRIVING_TELEGRAM_CHANNELS.length +
    MONEY_TELEGRAM_CHANNELS.length +
    TRAVEL_TELEGRAM_CHANNELS.length +
    THEME_PARK_TELEGRAM_CHANNELS.length;

  return (
    <StatsCard
      finalCount={topicsCount}
      description="Active Topics"
      Icon={<RssIcon />}
    />
  );
}
