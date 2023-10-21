"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon, Loader2Icon } from "lucide-react";
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
import { FetchStatus, Routes } from "@/lib/enums";

export default function SendLinkForm() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const isLoading = fetchStatus === FetchStatus.Loading;
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFetchStatus(FetchStatus.Loading);

    setTimeout(() => {
      setFetchStatus(FetchStatus.Success);
    }, 2000);
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
            <Label htmlFor="name">Email Address</Label>
            <Input id="name" type="email" name="email" disabled={isLoading} />
            <p className="text-sm text-muted-foreground">
              We will send you a special link to update your notification
              preferences if you are an existing subscriber.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />{" "}
              </>
            )}
            Send Link
          </Button>
          <Link href={Routes.Home} className="w-full">
            <Button type="button" className="w-full" variant="secondary">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </form>
  ) : (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>🎉 We&apos;ve received your request!</CardTitle>
        <CardDescription>
          If you are an existing subscriber, you will receive an email with the
          subscription link shortly at{" "}
          <b className="font-medium">dominicarrojado@gmail.com</b>.
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
