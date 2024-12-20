"use client";

import React, { FormEvent, useMemo, useState } from "react";
import { AlertCircle, CheckCircle, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Divider } from "@/components/ui/divider";
import { Anchor } from "@/components/ui/anchor";
import SwitchCard from "@/components/switch-card";
import { useUpdateSubscription } from "@/lib/api-hooks";
import { trackEvent } from "@/lib/google-analytics";
import {
  FetchStatus,
  GoogleAnalyticsEvent,
  Routes,
  SubscriptionTopic,
} from "@/lib/enums";
import { NOTIFICATION_SETTINGS } from "@/lib/content";
import type { Subscription, SubscriptionTopics } from "@/lib/types";

type Props = {
  subscription: Subscription;
};

export default function SettingsForm({ subscription }: Props) {
  const updateBtnText = "Save Changes";
  const [fetchStatus, updateSubscription] = useUpdateSubscription();
  const [topics, setTopics] = useState<SubscriptionTopics>(subscription.topics);
  const hasTopics = useMemo(
    () =>
      topics.some((topicId) =>
        NOTIFICATION_SETTINGS.find((setting) => setting.id === topicId),
      ),
    [topics],
  );
  const [isFormTouched, setIsFormTouched] = useState(false);
  const isLoading = fetchStatus === FetchStatus.Loading;
  const switchOnClick = (topicId: SubscriptionTopic, topicTitle: string) => {
    const newTopics = topics.includes(topicId)
      ? topics.filter((t) => t !== topicId)
      : [...topics, topicId];

    setTopics(newTopics);
    setIsFormTouched(true);
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatePromise = updateSubscription(topics);

    trackEvent({
      event:
        topics.length !== 0
          ? GoogleAnalyticsEvent.SUBSCRIBE_FORM_SUBMIT
          : GoogleAnalyticsEvent.UNSUBSCRIBE_FORM_SUBMIT,
      buttonText: updateBtnText,
    });

    const isSuccess = await updatePromise;

    if (isSuccess) {
      setIsFormTouched(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Update Preferences</CardTitle>
          <CardDescription>
            Choose the topics you would like to receive email notifications for.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Email Address</Label>
              <Input
                id="name"
                type="email"
                name="email"
                value={subscription.user.email}
                disabled
              />
            </div>
            <Divider />
            {NOTIFICATION_SETTINGS.map(
              ({ id, title, description, topicRoute }) => (
                <SwitchCard
                  key={id}
                  id={id}
                  name="topics"
                  title={title}
                  description={description}
                  topicRoute={topicRoute}
                  disabled={isLoading}
                  checked={topics.includes(id)}
                  onClick={() => switchOnClick(id, title)}
                />
              ),
            )}
            <p className="text-sm font-light text-muted-foreground">
              By submitting this form, you agree to receive email notifications
              about the services above and understand that you can unsubscribe
              at any time.
            </p>
          </div>
        </CardContent>
        <CardFooter className="sticky bottom-0 z-50 flex-col space-y-4 rounded-b-lg">
          {fetchStatus === FetchStatus.Success && !isFormTouched && (
            <Alert variant="default">
              <CheckCircle className="h-4 w-4" />
              {hasTopics && <AlertTitle>Success</AlertTitle>}
              <AlertDescription>
                {hasTopics ? (
                  "Your preferences have been updated."
                ) : (
                  <>
                    You have unsubscribed from all topics. We hope to see you
                    again soon! <br />
                    If SG Alerts has been helpful to you, please consider{" "}
                    <Link href={Routes.Donate} passHref legacyBehavior>
                      <Anchor>donating</Anchor>
                    </Link>
                    .
                  </>
                )}
              </AlertDescription>
            </Alert>
          )}
          {fetchStatus === FetchStatus.Failure && (
            <Alert variant="destructive" className="bg-card shadow-md">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Something went wrong. Please try again later.
              </AlertDescription>
            </Alert>
          )}
          <div className="inline-block w-full rounded-md bg-card">
            <Button
              type="submit"
              className="relative w-full shadow-md hover:shadow-none"
              disabled={isLoading || !isFormTouched}
            >
              {isLoading && (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />{" "}
                </>
              )}
              {updateBtnText}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
