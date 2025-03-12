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
import { useGetSsdcSlotsDatesMap } from "@/lib/api-hooks";
import { getTelegramChannelUrl } from "@/lib/telegram";
import { trackEvent } from "@/lib/google-analytics";
import {
  SsdcService,
  FetchStatus,
  Routes,
  TelegramChannel,
  GoogleAnalyticsEvent,
  TopicTitle,
} from "@/lib/enums";
import { SUBSCRIBE_FORM_ID } from "@/lib/constants";
import type { SsdcSlotsInfoItems } from "@/lib/types";

export function SsdcSlotsTable() {
  const [fetchState, ssdcSlotsDatesMap, getSsdcSlotsDatesMap] =
    useGetSsdcSlotsDatesMap();
  const ssdcSlotsInfoItems: SsdcSlotsInfoItems = [
    {
      service: SsdcService.PRACTICAL_LESSON_BOOKING,
      title: "Class 3 / 3A Practical Lesson Booking",
      lastAvailableDate:
        ssdcSlotsDatesMap[SsdcService.PRACTICAL_LESSON_BOOKING],
      topicLink: getTelegramChannelUrl(
        TelegramChannel.SsdcPracticalLessonBooking,
      ),
      topicTitle: TopicTitle.SsdcPracticalLessonBooking,
    },
    {
      service: SsdcService.PRIVATE_LEARNERS,
      title: "Private Learners",
      lastAvailableDate: ssdcSlotsDatesMap[SsdcService.PRIVATE_LEARNERS],
      topicLink: getTelegramChannelUrl(TelegramChannel.SsdcPrivateLearners),
      topicTitle: TopicTitle.SsdcPrivateLearners,
    },
    {
      service: SsdcService.ENROLMENT_WEEKEND,
      title: "Class 3 / 3A School Enrolment (weekend)",
      lastAvailableDate: ssdcSlotsDatesMap[SsdcService.ENROLMENT_WEEKEND],
      topicLink: `${Routes.DrivingCategory}#${SUBSCRIBE_FORM_ID}`,
      topicTitle: TopicTitle.SsdcEnrolmentWeekend,
    },
    {
      service: SsdcService.OTHER_COURSES_ENROLMENT,
      title: "Other Courses Enrolment (weekend)",
      lastAvailableDate: ssdcSlotsDatesMap[SsdcService.OTHER_COURSES_ENROLMENT],
      topicLink: `${Routes.DrivingCategory}#${SUBSCRIBE_FORM_ID}`,
      topicTitle: TopicTitle.SsdcOtherCoursesEnrolment,
    },
    {
      service: SsdcService.FOREIGN_LICENCE_WEEKEND,
      title: "Foreign Licence Package (weekend)",
      lastAvailableDate: ssdcSlotsDatesMap[SsdcService.FOREIGN_LICENCE_WEEKEND],
      topicLink: `${Routes.DrivingCategory}#${SUBSCRIBE_FORM_ID}`,
      topicTitle: TopicTitle.SsdcForeignLicenceWeekend,
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
    getSsdcSlotsDatesMap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  return fetchState === FetchStatus.Success ? (
    <Table className="my-6" data-clarity-unmask="true">
      <TableHeader>
        <TableRow>
          <TableHead>Type of Service</TableHead>
          <TableHead className="w-1/2 text-right sm:w-[240px]">
            Date of Last Available Slots
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ssdcSlotsInfoItems.map((slotsInfoItem) => {
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
            <TableRow key={slotsInfoItem.service}>
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
        {Array.from({ length: ssdcSlotsInfoItems.length }).map((_, index) => (
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
