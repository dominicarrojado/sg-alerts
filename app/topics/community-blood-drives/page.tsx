import { Metadata } from "next";
import React from "react";
import { Anchor } from "@/components/ui/anchor";
import { Container } from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import SubscribeLinkButton from "@/components/subscribe-link-button";
import AdUnit from "@/components/ad-unit";
import { BloodDrivesTable } from "@/components/blood-drives-table";
import { EventService, Routes, TopicTitle } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";

const title = "Community Blood Drives";
const description =
  "Get notified when new community blood donation drives are organised by the Singapore Red Cross.";
const url = Routes.EventsBloodDrive;

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

export default function CommunityBloodDrives() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>
          Receive email notifications when there are new community blood
          donation drives organised by the Singapore Red Cross.
        </Subheading>
      </div>
      <BloodDrivesTable service={EventService.RED_CROSS} />
      <Paragraph>
        The{" "}
        <Anchor href="https://redcross.sg/" isExternal>
          Singapore Red Cross
        </Anchor>{" "}
        and the{" "}
        <Anchor href="https://www.hsa.gov.sg/blood-donation" isExternal>
          Health Sciences Authority (HSA)
        </Anchor>{" "}
        regularly organise mobile{" "}
        <Anchor href="https://giveblood.sg/#blood-drive" isExternal>
          community blood drives
        </Anchor>{" "}
        across community clubs, religious venues, schools and corporate
        locations in Singapore to maintain national blood stock levels.
      </Paragraph>
      <Paragraph>
        Every day, hundreds of units of blood are required in Singapore to
        support medical treatments, emergency surgeries, trauma care and
        patients suffering from chronic conditions such as leukaemia and
        thalassaemia.
      </Paragraph>
      <AdUnit />
      <Paragraph>
        Generally, first-time blood donors must be between 16 and 65 years old
        (youths aged 16 and 17 require parental consent), while regular donors
        can donate up to age 75. Donors must weigh at least 45 kg, be in good
        health and refer to the{" "}
        <Anchor
          href="https://www.hsa.gov.sg/blood-donation/can-i-donate"
          isExternal
        >
          HSA eligibility guidelines
        </Anchor>{" "}
        for medical history checks. Donors are encouraged to rest well and stay
        hydrated before visiting a donation drive.
      </Paragraph>
      <Paragraph>
        <span className="font-medium">SG Alerts</span> monitors the Singapore
        Red Cross schedule and sends email notifications whenever new community
        blood drives are announced so you can easily plan your visit.
      </Paragraph>
      <Paragraph>
        To get started, click the button below to head over to the subscription
        page and subscribe to Community Blood Drives alerts.
      </Paragraph>
      <div className="sticky bottom-6 z-50 mt-8 text-center">
        <SubscribeLinkButton
          route={Routes.EventsCategory}
          linkText="Subscribe Now"
          topicTitle={TopicTitle.EventsBloodDrive}
        />
      </div>
    </Container>
  );
}
