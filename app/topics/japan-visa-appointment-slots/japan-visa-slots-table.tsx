"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Anchor } from "@/components/ui/anchor";
import { useGetJapanVisaSlotsDatesMap } from "@/lib/api-hooks";
import { getTelegramChannelUrl } from "@/lib/telegram";
import { trackEvent } from "@/lib/google-analytics";
import {
  FetchStatus,
  GoogleAnalyticsEvent,
  JapanVisaType,
  Routes,
  TelegramChannel,
  TopicTitle,
} from "@/lib/enums";
import { JAPAN_VISA_TYPES_LENGTH, SUBSCRIBE_FORM_ID } from "@/lib/constants";
import type { JapanVisaSlotsInfoItems } from "@/lib/types";

export function JapanVisaSlotsTable() {
  const [fetchState, japanVisaSlotsDatesMap, getJapanVisaSlotsDatesMap] =
    useGetJapanVisaSlotsDatesMap();
  const japanVisaSlotsInfoItems: JapanVisaSlotsInfoItems = [
    {
      type: JapanVisaType.TOURISM,
      title: "Tourism or Sightseeing",
      lastAvailableDate: japanVisaSlotsDatesMap[JapanVisaType.TOURISM],
      topicLink: getTelegramChannelUrl(TelegramChannel.JapanVisaTourism),
      topicTitle: TopicTitle.JapanVisaTourism,
    },
    {
      type: JapanVisaType.BUSINESS,
      title:
        "Short-term Business, Long-term stay with COE, Spouse or Child of Japanese National",
      lastAvailableDate: japanVisaSlotsDatesMap[JapanVisaType.BUSINESS],
      topicLink: `${Routes.JapanVisaCategory}#${SUBSCRIBE_FORM_ID}`,
      topicTitle: TopicTitle.JapanVisaBusiness,
    },
    {
      type: JapanVisaType.OTHERS,
      title: "All other visa applications and services",
      lastAvailableDate: japanVisaSlotsDatesMap[JapanVisaType.OTHERS],
      topicLink: getTelegramChannelUrl(TelegramChannel.JapanVisaOthers),
      topicTitle: TopicTitle.JapanVisaOthers,
    },
  ];
  const topicOnClick = (title: string, linkUrl: string, linkText?: string) => {
    trackEvent({
      linkText,
      linkUrl,
      event: GoogleAnalyticsEvent.TOPIC_CLICK,
      topicTitle: title,
    });
  };

  useEffect(() => {
    getJapanVisaSlotsDatesMap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  return fetchState === FetchStatus.Success ? (
    <Table className="my-6">
      <TableHeader>
        <TableRow>
          <TableHead>Type of Application</TableHead>
          <TableHead className="w-1/2 text-right sm:w-[240px]">
            Date of Last Available Slots
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {japanVisaSlotsInfoItems.map((slotsInfoItem) => {
          const { title, topicLink } = slotsInfoItem;
          const isExternal = !topicLink.startsWith("/");
          const anchorEl = (
            <Anchor
              href={topicLink}
              isExternal={isExternal}
              onClick={
                isExternal
                  ? () =>
                      topicOnClick(slotsInfoItem.topicTitle, topicLink, title)
                  : undefined
              }
            >
              {title}
            </Anchor>
          );

          return (
            <TableRow key={slotsInfoItem.type}>
              <TableCell className="font-medium">
                {isExternal ? (
                  anchorEl
                ) : (
                  <Link href={topicLink} passHref legacyBehavior>
                    {anchorEl}
                  </Link>
                )}
              </TableCell>
              <TableCell className="text-right">
                {slotsInfoItem.lastAvailableDate}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  ) : (
    <Table className="my-6">
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className="h-5 w-full" />
          </TableHead>
          <TableHead className="w-1/2 sm:w-[240px]">
            <Skeleton className="h-5 w-full" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: JAPAN_VISA_TYPES_LENGTH }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-5 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
