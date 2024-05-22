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
import { Switch } from "@/components/ui/switch";
import { Divider } from "@/components/ui/divider";
import { Anchor } from "@/components/ui/anchor";
import { useUpdateSubscription } from "@/lib/api-hooks";
import { trackEvent } from "@/lib/google-analytics";
import { Subscription, SubscriptionTopics } from "@/lib/types";
import {
  FetchStatus,
  GoogleAnalyticsEvent,
  Routes,
  SubscriptionTopic,
} from "@/lib/enums";
import { NOTIFICATION_SETTINGS } from "@/lib/content";

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
        NOTIFICATION_SETTINGS.find((setting) => setting.id === topicId)
      ),
    [topics]
  );
  const [isFormTouched, setIsFormTouched] = useState(false);
  const isLoading = fetchStatus === FetchStatus.Loading;
  const switchOnClick = (topic: SubscriptionTopic) => {
    const newTopics = topics.includes(topic)
      ? topics.filter((t) => t !== topic)
      : [...topics, topic];

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
            Choose what you want to be notified about.
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
            {NOTIFICATION_SETTINGS.map(({ id, title, description }) => (
              <Label
                key={id}
                htmlFor={id}
                className="flex flex-row items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-0.5 pr-2">
                  <p className="text-base">{title}</p>
                  <p className="text-sm font-light text-muted-foreground">
                    {description}
                  </p>
                </div>
                <Switch
                  id={id}
                  name="topics"
                  disabled={isLoading}
                  checked={topics.includes(id)}
                  onClick={() => switchOnClick(id)}
                />
              </Label>
            ))}
            <p className="text-sm text-muted-foreground">
              By submitting this form, you agree to receive email notifications
              about the services above and understand that you can unsubscribe
              at any time.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-4">
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
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Something went wrong. Please try again later.
              </AlertDescription>
            </Alert>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !isFormTouched}
          >
            {isLoading && (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />{" "}
              </>
            )}
            {updateBtnText}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
