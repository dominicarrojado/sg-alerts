"use client";

import React, { useEffect } from "react";
import { AlertTriangle, Loader2Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetSubscription } from "@/lib/api-hooks";
import { FetchStatus } from "@/lib/enums";
import SettingsForm from "./settings-form";

export default function Authenticated() {
  const [fetchStatus, subscription, getSubscription] = useGetSubscription();

  useEffect(() => {
    getSubscription();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {fetchStatus === FetchStatus.Success && subscription && (
        <SettingsForm subscription={subscription} />
      )}
      {(fetchStatus === FetchStatus.Idle ||
        fetchStatus === FetchStatus.Loading) && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Loader2Icon className="mr-2 h-6 w-6 animate-spin" />
              Fetching your preferences...
            </CardTitle>
            <CardDescription>
              Please wait while we fetch your notification preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <p className="text-sm text-muted-foreground">
                If this takes too long, please refresh the page.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      {fetchStatus === FetchStatus.NotFound && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-6 w-6" />
              Preferences not found
            </CardTitle>
            <CardDescription>
              We were unable to find your notification preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <p className="text-sm text-muted-foreground">
                It may have been deleted or no longer exist in our database.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      {fetchStatus === FetchStatus.Failure && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Something went wrong</CardTitle>
            <CardDescription>
              We were unable to fetch your notification preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <p className="text-sm text-muted-foreground">
                Please try again later.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
