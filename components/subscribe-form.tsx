"use client";

import Link from "next/link";
import React, { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, ArrowLeftIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Anchor } from "@/components/ui/anchor";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ToastAction } from "@/components/ui/toast";
import SwitchCard from "@/components/switch-card";
import { useToast } from "@/lib/hooks/use-toast";
import { useSubmitSubscribeRequest } from "@/lib/api-hooks";
import { trackEvent } from "@/lib/google-analytics";
import {
  FetchStatus,
  GoogleAnalyticsEvent,
  Routes,
  SubscriptionTopic,
} from "@/lib/enums";
import { NEW_FEATURES_NOTIFICATION_SETTING } from "@/lib/content";
import { SUBSCRIBE_FORM_ID, TOAST_DURATION } from "@/lib/constants";
import type { NotificationSettings, SubscriptionTopics } from "@/lib/types";

type Props = {
  defaultTopics: NotificationSettings;
  backButtonRoute?: Routes;
};

export default function SubscribeForm({
  defaultTopics,
  backButtonRoute,
}: Props) {
  const submitBtnText = "Subscribe Now";
  const scrollDownToastTitle = "👍 Almost there!";
  const scrollDownText = "Scroll Down";
  const formCardRef = useRef<HTMLDivElement>(null);
  const hasToastedRef = useRef(false);
  const isNoTopicsToastOpenRef = useRef(false);
  const dismissToastRef = useRef<() => void>(() => {});
  const subscriptionTopics = useMemo(() => {
    const filteredTopics = defaultTopics.filter(
      ({ hasTelegramChannel }) => !hasTelegramChannel,
    );

    return [...filteredTopics, NEW_FEATURES_NOTIFICATION_SETTING];
  }, [defaultTopics]);
  const { toast } = useToast();
  const [fetchStatus, submitSubscribeRequest] = useSubmitSubscribeRequest();
  const [topics, setTopics] = useState<SubscriptionTopics>([
    SubscriptionTopic.FeaturesSgAlerts,
  ]);
  const [email, setEmail] = useState("");
  const isFormValid =
    email.includes("@") && email.includes(".") && topics.length > 0;
  const isLoading = fetchStatus === FetchStatus.Loading;
  const scrollDownOnClick = () => {
    const formCardEl = formCardRef.current;

    if (formCardEl) {
      formCardEl.scrollIntoView({ behavior: "smooth" });
    }

    isNoTopicsToastOpenRef.current = false;

    trackEvent({
      toastTitle: scrollDownToastTitle,
      event: GoogleAnalyticsEvent.TOAST_CLICK,
      buttonText: scrollDownText,
    });
  };
  const switchOnClick = (topicId: SubscriptionTopic, topicTitle: string) => {
    const newTopics = topics.includes(topicId)
      ? topics.filter((t) => t !== topicId)
      : [...topics, topicId];

    if (newTopics.length !== 0 && !hasToastedRef.current) {
      hasToastedRef.current = true;

      const { dismiss } = toast({
        title: scrollDownToastTitle,
        description: "If you're done, scroll down to the last step.",
        action: (
          <ToastAction
            altText="Scroll to Last Step"
            onClick={scrollDownOnClick}
          >
            {scrollDownText}
          </ToastAction>
        ),
        duration: TOAST_DURATION,
      });

      dismissToastRef.current = dismiss;

      trackEvent({
        event: GoogleAnalyticsEvent.TOAST_OPEN,
        toastTitle: scrollDownToastTitle,
        buttonText: topicTitle,
      });
    } else if (isNoTopicsToastOpenRef.current) {
      dismissToastRef.current();
      isNoTopicsToastOpenRef.current = false;
    }

    setTopics(newTopics);
  };
  const inputOnChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>, btnText: string) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    if (!hasToastedRef.current) {
      hasToastedRef.current = true;

      const toastTitle = "⚠️ Just a heads up!";
      const continueText = "Continue";
      const { dismiss } = toast({
        title: toastTitle,
        description:
          "You have not selected any topics. \nYou will only receive email notifications about new features.",
        action: (
          <ToastAction
            altText="Continue to Subscribe"
            onClick={() => onSubmit(e, continueText)}
          >
            {continueText}
          </ToastAction>
        ),
        duration: TOAST_DURATION,
      });

      isNoTopicsToastOpenRef.current = true;
      dismissToastRef.current = dismiss;

      trackEvent({
        toastTitle,
        event: GoogleAnalyticsEvent.TOAST_OPEN,
        buttonText: submitBtnText,
      });

      return;
    }

    submitSubscribeRequest(email, topics);

    trackEvent({
      event: GoogleAnalyticsEvent.SUBSCRIBE_FORM_SUBMIT,
      buttonText: btnText,
    });
  };

  useEffect(() => {
    return () => {
      dismissToastRef.current();
    };
  }, []);

  return fetchStatus !== FetchStatus.Success ? (
    <>
      <form id={SUBSCRIBE_FORM_ID} onSubmit={(e) => onSubmit(e, submitBtnText)}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardTitle className="!mt-6">1️⃣ &nbsp;First Step</CardTitle>
            <CardDescription>
              Choose at least one topic you want to get notified about via
              email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {subscriptionTopics.map(
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
            </div>
          </CardContent>
        </Card>
        <Card ref={formCardRef} className="mt-4 sm:mt-6">
          <CardHeader>
            <CardTitle>2️⃣ &nbsp;Last Step</CardTitle>
            <CardDescription>
              Provide your email address and confirm your subscription.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                disabled={isLoading}
                onChange={inputOnChange}
                required
              />
              <p className="text-sm font-light text-muted-foreground">
                By submitting this form, you agree to receive email
                notifications about your chosen services above and understand
                that you can update it at any time{" "}
                <Link href={Routes.Settings} passHref legacyBehavior>
                  <Anchor>here</Anchor>
                </Link>
                .
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
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
              disabled={isLoading || !isFormValid}
            >
              {isLoading && (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />{" "}
                </>
              )}
              {submitBtnText}
            </Button>
            {backButtonRoute && (
              <Button
                variant="secondary"
                className="w-full"
                disabled={isLoading}
                asChild
              >
                <Link href={backButtonRoute}>
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  Go Back
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </>
  ) : (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>🎉 You&apos;re almost there!</CardTitle>
        <CardDescription>
          You will receive an email shortly at{" "}
          <strong className="font-medium">{email}</strong>. <br />
          Please click on the link in the email to confirm your subscription.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <p className="text-sm text-muted-foreground">
            If you do not receive the email, please check your spam folder.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
