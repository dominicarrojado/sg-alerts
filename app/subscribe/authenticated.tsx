"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { AlertTriangle, Loader2Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Anchor } from "@/components/ui/anchor";
import { useVerifySubscription } from "@/lib/api-hooks";
import { FetchStatus, Routes } from "@/lib/enums";

export default function Authenticated() {
  const [fetchStatus, verifySubscription] = useVerifySubscription();

  useEffect(() => {
    verifySubscription();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {fetchStatus === FetchStatus.Success && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>🎉 Subscription confirmed!</CardTitle>
            <CardDescription>
              You are now subscribed to <b className="font-medium">SG Alerts</b>
              . <br />
              Get ready to receive updates on the topics you have selected.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <p className="text-sm text-muted-foreground">
                Thank you for subscribing and please share this with your
                friends and family.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      {(fetchStatus === FetchStatus.Idle ||
        fetchStatus === FetchStatus.Loading) && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Loader2Icon className="mr-2 h-6 w-6 animate-spin" />
              Verifying subscription...
            </CardTitle>
            <CardDescription>
              Please wait while we verify your subscription.
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
              We&apos;re unable to verify your token
            </CardTitle>
            <CardDescription>
              Your confirmation token may have expired or already been used.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <p className="text-sm text-muted-foreground">
                Please go to{" "}
                <Link href={Routes.Home} passHref>
                  <Anchor>home</Anchor>
                </Link>{" "}
                page and try to subscribe again.
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
              We were unable to verify your subscription.
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
