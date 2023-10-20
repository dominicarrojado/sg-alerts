"use client";

import React, { FormEvent, useState } from "react";
import { AlertCircle, CheckCircle, Loader2Icon } from "lucide-react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SettingsForm() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const isLoading = fetchStatus === FetchStatus.Loading;
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFetchStatus(FetchStatus.Loading);

    setTimeout(() => {
      setFetchStatus(FetchStatus.Failure);
    }, 2000);
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
                value="dominicarrojado@gmail.com"
                disabled
              />
            </div>
            <Divider />
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
                <Switch id={setting.id} disabled={isLoading} />
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
          {fetchStatus === FetchStatus.Success && (
            <Alert variant="default">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your preferences have been updated.
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
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />{" "}
              </>
            )}
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
