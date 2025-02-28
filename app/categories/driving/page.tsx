import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import PageSeparator from "@/components/page-separator";
import SubscribeForm from "@/components/subscribe-form";
import { Routes } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "@/app/shared-metadata";
import {
  DRIVING_CATEGORY_ITEMS,
  DRIVING_NOTIFICATION_SETTINGS,
} from "@/lib/content";

const title = "Driving in Singapore";
const description =
  "Subscribe to get notified to topics related to driving in Singapore such as appointment slots, practical lessons and more.";
const url = Routes.DrivingCategory;

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

export default function Driving() {
  return (
    <Container>
      <div className="mb-6 space-y-2">
        <Heading>{title}</Heading>
        <Subheading>{description}</Subheading>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>For Student Drivers</CardTitle>
          <CardDescription>
            Select the driving centre that you would like to receive
            notifications for.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
            {DRIVING_CATEGORY_ITEMS.map(
              ({ emoji, title, description, href }) => (
                <Button
                  key={title.toString()}
                  variant="outline"
                  className="aspect-square bg-transparent"
                  asChild
                >
                  <Link href={href}>
                    <div className="flex flex-col py-2 text-center">
                      <div className="text-2xl sm:text-4xl">{emoji}</div>
                      <div className="mt-2">{title}</div>
                      <div className="mt-1 text-xs font-light text-muted-foreground">
                        {description}
                      </div>
                    </div>
                  </Link>
                </Button>
              ),
            )}
          </div>
        </CardContent>
      </Card>
      <PageSeparator>OR</PageSeparator>
      <SubscribeForm
        defaultTopics={DRIVING_NOTIFICATION_SETTINGS}
        backButtonRoute={Routes.Home}
      />
    </Container>
  );
}
