import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { Container } from "@/components/ui/container";
import { Anchor } from "@/components/ui/anchor";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import { Routes } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import CdcLessonSlotsInfo from "./cdc-lesson-slots-info";

const title =
  "ComfortDelGro Driving Centre Practical Lesson Slots (Class 3A Motorcar)";
const description =
  "Subscribe to SG Alerts to get notified when there are new practical lesson slot(s) for Class 3A Motorcar at ComfortDelGro Driving Centre (CDC) website.";
const url = Routes.CdcPracticalLessonSlots;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    ...META_OPEN_GRAPH,
    title,
    description,
    url,
  },
  twitter: {
    ...META_TWITTER,
    title,
    description,
  },
};

export default function CdcPracticalLessonSlots() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Subscribe to get notified when there are new practical lesson slot(s)
          for Class 3A Motorcar at ComfortDelGro Driving Centre website.
        </Subheading>
      </div>
      <CdcLessonSlotsInfo />
      <Paragraph>
        <Anchor href="https://www.cdc.com.sg/" isExternal>
          ComfortDelGro Driving Centre (CDC)
        </Anchor>{" "}
        is one of the largest driving centres in Singapore. It offers a wide
        range of driving courses and practical lessons for all types of vehicles
        including{" "}
        <Anchor href="https://www.cdc.com.sg/course/class-33a" isExternal>
          Class 3A Motorcar
        </Anchor>
        .
      </Paragraph>
      <Paragraph>
        The practical lessons are conducted by experienced driving instructors
        who will teach you how to drive safely on the road. You will also learn
        about traffic rules and regulations, as well as defensive driving
        techniques. After completing the course, you will be able to apply for
        your driving license and start driving on your own.
      </Paragraph>
      <Paragraph>
        If you are planning to take up driving lessons at CDC, it is important
        that you book your practical lesson slots early so that you can get the
        slots you want. However, due to the high demand for practical lesson
        slots and no session opening date for Class 3A lessons, it is extremely
        difficult to get the slots you want. This is especially true if you are
        only available during certain timeslots.
      </Paragraph>
      <Paragraph>
        Slots cancellation is also common at CDC. This is because many students
        are unable to attend their practical lessons due to work or other
        commitments. As a result, there are instances where slots become
        available at the last minute. If you are lucky, you may be able to get
        these slots. However, you will need to constantly check the CDC website
        for available slots.
      </Paragraph>
      <Paragraph>
        <span className="font-medium">SG Alerts</span> is a free notification
        service that monitors the CDC website for available practical lesson
        slots for Class 3A Motorcar (for Standard only, not applicable for One
        Team or Elite Team). It sends you an email notification when there are
        new slots available so you can save time and effort. It is not a
        guarantee that you will get the slots you want, but it will definitely
        increase your chances of getting them.
      </Paragraph>
      <Paragraph>
        To get started, simply click the button below to head over to the
        subscription page. Once there, you can select{" "}
        <span className="font-medium">
          CDC Practical Lesson Slots (Class 3A Motorcar)
        </span>{" "}
        as one of the topics you want to subscribe to.
      </Paragraph>
      <div className="mt-8 text-center">
        <Link href={Routes.Home}>
          <Button variant="secondary">Subscribe Now</Button>
        </Link>
      </div>
    </Container>
  );
}
