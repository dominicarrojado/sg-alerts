import * as React from "react";

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
import { Container } from "@/components/ui/container";
import { Switch } from "@/components/ui/switch";

export default function Home() {
  const notificationSettings = [
    {
      id: "japan-visa-slots",
      title: "🇯🇵 Japan Tourist Visa Appointment Slots",
      description: (
        <>
          Receive email notifications when there are available appointment slots
          from the Embassy of Japan in Singapore. <br />
          (for foreigners who require a visa to visit Japan)
        </>
      ),
    },
    {
      id: "cdc-eyesight-test",
      title: "🚘 CDC Appointment Slots (Eyesight Test)",
      description: (
        <>
          Receive email notifications when there are available slots for the
          eyesight test at ComfortDelGro Driving Centre.
        </>
      ),
    },
    {
      id: "cdc-counter-services",
      title: "🚘 CDC Appointment Slots (Counter Services)",
      description: (
        <>
          Receive email notifications when there are available slots for the
          counter services at ComfortDelGro Driving Centre.
        </>
      ),
    },
    {
      id: "flights-sq",
      title: "✈️ Flight Promos (Singapore Airlines)",
      description: (
        <>
          Receive email notifications when there are flight promotions directly
          from Singapore Airlines departing from Singapore.
        </>
      ),
    },
    {
      id: "flights-5j",
      title: "✈️ Flight Promos (Cebu Pacific)",
      description: (
        <>
          Receive email notifications when there are flight promotions directly
          from Cebu Pacific departing from the Philippines.
        </>
      ),
    },
    {
      id: "flights-3k",
      title: "✈️ Flight Promos (Jetstar)",
      description: (
        <>
          Receive email notifications when there are flight promotions directly
          from Jetstar departing from Singapore.
        </>
      ),
    },
    {
      id: "fixed-deposit-rates",
      title: "💰 Fixed Deposit Rates",
      description: (
        <>
          Receive email notifications when the fixed deposit rates are up across
          major banks in Singapore.
        </>
      ),
    },
    {
      id: "movies-gv",
      title: "🎬 Movies with English Subtitles (GV)",
      description: (
        <>
          Receive email notifications when there are new movies with English
          subtitles at Golden Village.
        </>
      ),
    },
    {
      id: "movies-shaw",
      title: "🎬 Movies with English Subtitles (Shaw)",
      description: (
        <>
          Receive email notifications when there are new movies with English
          subtitles at Shaw Theatres.
        </>
      ),
    },
    {
      id: "movies-cathay",
      title: "🎬 Movies with English Subtitles (Cathay Cineplexes)",
      description: (
        <>
          Receive email notifications when there are new movies with English
          subtitles at Cathay Cineplexes.
        </>
      ),
    },
    {
      id: "movies-the-projector",
      title: "🎬 Movies with English Subtitles (The Projector)",
      description: (
        <>
          Receive email notifications when there are new movies with English
          subtitles at The Projector.
        </>
      ),
    },
    {
      id: "travel-deals-trip-com",
      title: "🌏 Travel Deals (Trip.com)",
      description: (
        <>
          Receive email notifications when there are new travel deals from
          Trip.com.
        </>
      ),
    },
    {
      id: "travel-deals-traveloka",
      title: "🌏 Travel Deals (Traveloka)",
      description: (
        <>
          Receive email notifications when there are new travel deals from
          Traveloka.
        </>
      ),
    },
    {
      id: "community-blood-drives",
      title: "🩸 Community Blood Drives",
      description: (
        <>
          Receive email notifications when there are new community blood drives.
        </>
      ),
    },
    {
      id: "burnt-ends-slots",
      title: "🔥 Burnt Ends Reservation Slots (Main Dining - Dinner)",
      description: (
        <>
          Receive email notifications when there are new table reservation slots
          for Burnt Ends.
        </>
      ),
    },
  ];

  return (
    <Container className="pt-0">
      <form>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Choose what you want to be notified about.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {notificationSettings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between space-x-2"
                >
                  <Label
                    htmlFor={setting.id}
                    className="flex flex-col space-y-1"
                  >
                    <span>{setting.title}</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                      {setting.description}
                    </span>
                  </Label>
                  <Switch id={setting.id} />
                </div>
              ))}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="name">Email Address</Label>
                <Input id="name" type="email" name="email" />
              </div>
              <p className="text-sm text-muted-foreground">
                By submitting this form, you agree to receive email
                notifications about the services above and understand that you
                can unsubscribe at any time.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Subscribe Now
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Container>
  );
}
