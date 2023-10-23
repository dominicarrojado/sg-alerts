import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import { Anchor } from "@/components/ui/anchor";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/Subheading";
import Paragraph from "@/components/ui/paragraph";
import { OWNER_EMAIL } from "@/lib/constants";
import { Routes } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "../shared-metadata";

const title = "About";
const description = "Learn more about SG Alerts and why it was created.";
const url = Routes.About;

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

export default function About() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>{description}</Subheading>
      </div>
      <Paragraph>
        <span className="font-medium">SG Alerts</span> is a free notification
        service that sends you an email depending on the topics you&apos;ve
        subscribed to. It&apos;s a simple service that helps you stay up to date
        with the latest information without having to constantly check the
        source website.
      </Paragraph>
      <Paragraph>
        It started out as a personal project to help me monitor the appointment
        booking slots for my Japan tourist visa application. I had little time
        left to apply for my visa, and I was having trouble finding an available
        appointment slot. I was frustrated with having to constantly check the
        embassy&apos;s website for available slots and I didn&apos;t want to pay
        the expensive agency fees just to secure a slot. So I created a service
        that could automatically monitor the website and notify me when a slot
        became available.
      </Paragraph>
      <Paragraph>
        I knew that other people would find the Japan Visa Appointment
        Notification Service useful as well, so I decided to share it with
        everyone. I created a simple website where people could subscribe to the
        service and receive notifications for free. It was well received, and
        many people were able to secure their visa appointment slots thanks to
        the service.
      </Paragraph>
      <Paragraph>
        After seeing how useful it was, I decided to create{" "}
        <span className="font-medium">SG Alerts</span> to expand the service to
        other topics that are relevant to Singapore residents such as flight
        prices, fixed deposit rates, driving centre appointment slots, and many
        more. I&apos;m always looking for new topics to add. If you have any
        suggestions or feedback, please feel free to{" "}
        <Anchor href={`mailto:${OWNER_EMAIL}`}>contact me</Anchor>.
      </Paragraph>
    </Container>
  );
}
