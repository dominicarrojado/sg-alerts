"use client";

import Link from "next/link";
import React, { FormEvent, useState } from "react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSendSubscriptionLink } from "@/lib/api-hooks";
import { FetchStatus, Routes } from "@/lib/enums";

export default function SendLinkForm() {
  const [fetchStatus, sendSubscriptionLink] = useSendSubscriptionLink();
  const [email, setEmail] = useState("");
  const isFormValid = email.includes("@") && email.includes(".");
  const isLoading = fetchStatus === FetchStatus.Loading;
  const inputOnChange = (e: FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendSubscriptionLink(email);
  };

  return fetchStatus !== FetchStatus.Success ? (
    <form onSubmit={onSubmit}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Get Subscription Link</CardTitle>
          <CardDescription>
            To update your notification preferences, please enter your email
            address below.
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
            <p className="text-sm text-muted-foreground">
              We will send you a special link to update your notification
              preferences if you are an existing subscriber.
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
            Send Link
          </Button>
          <Button className="w-full" variant="secondary" asChild>
            <Link href={Routes.Home}>
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </form>
  ) : (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>🎉 We&apos;ve received your request!</CardTitle>
        <CardDescription>
          If you are an existing subscriber, you will receive an email with the
          subscription link shortly at <b className="font-medium">{email}</b>.
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
