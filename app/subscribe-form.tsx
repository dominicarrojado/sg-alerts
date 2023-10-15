"use client";

import React, { FormEvent, useState } from "react";
import { Loader2Icon } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { Divider } from "@/components/ui/divider";
import { FetchStatus } from "@/lib/enums";
import { NOTIFICATION_SETTINGS } from "@/lib/content";

export default function SubscribeForm() {
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
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Choose what you want to be notified about.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {NOTIFICATION_SETTINGS.map((setting) => (
              <Label
                key={setting.id}
                htmlFor={setting.id}
                className="flex flex-row items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-0.5 pr-2">
                  <p className="text-base">{setting.title}</p>
                  <p className="text-sm font-light text-muted-foreground">
                    {setting.description}
                  </p>
                </div>
                <Switch id={setting.id} />
              </Label>
            ))}
            <Divider />
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Email Address</Label>
              <Input id="name" type="email" name="email" />
            </div>
            <p className="text-sm text-muted-foreground">
              By submitting this form, you agree to receive email notifications
              about the services above and understand that you can unsubscribe
              at any time.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />{" "}
              </>
            )}
            Subscribe Now
          </Button>
        </CardFooter>
      </Card>
    </form>
  ) : (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>🎉 You&apos;re almost there!</CardTitle>
        <CardDescription>
          You will receive a confirmation email shortly at{" "}
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
