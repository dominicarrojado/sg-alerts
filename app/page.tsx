import React, { Fragment } from "react";
import Balancer from "react-wrap-balancer";
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
import { Divider } from "@/components/ui/divider";
import { Anchor } from "@/components/ui/anchor";
import { FIXED_DEPOSIT_BANKS } from "@/lib/constants";

export default function Home() {
  const notificationSettings = [
    {
      id: "japan-visa",
      title: "🇯🇵 Japan Visa Appointment Slots (Tourism)",
      description: (
        <>
          Receive email notifications when there are new appointment date(s) for{" "}
          <Anchor
            href="https://www.sg.emb-japan.go.jp/itpr_en/visit.html"
            isExternal
          >
            tourist visa application
          </Anchor>{" "}
          at the Embassy of Japan in Singapore. <br />
          <small>(for foreigners who require a visa to visit Japan)</small>
        </>
      ),
    },
    {
      id: "flights-singapore-airlines",
      title: "✈️ Flight Prices (Singapore Airlines)",
      description: (
        <>
          Receive email notifications when the flight prices goes down for{" "}
          <Anchor
            href="https://www.singaporeair.com/en_UK/sg/special-offers/flight-from-Singapore/"
            isExternal
          >
            Singapore Airlines flights
          </Anchor>{" "}
          departing from Singapore.
        </>
      ),
    },
    {
      id: "flights-cebu-pacific",
      title: "✈️ Flight Prices (Cebu Pacific)",
      description: (
        <>
          Receive email notifications when the flight prices goes down for{" "}
          <Anchor
            href="https://www.cebupacificair.com/en-PH/seat-sale"
            isExternal
          >
            Cebu Pacific flights
          </Anchor>{" "}
          departing from the Philippines.
        </>
      ),
    },
    {
      id: "flights-jetstar",
      title: "✈️ Flight Prices (Jetstar)",
      description: (
        <>
          Receive email notifications when the flight prices goes down for{" "}
          <Anchor href="https://www.jetstar.com/sg/en/deals" isExternal>
            Jetstar flights
          </Anchor>{" "}
          departing from Singapore.
        </>
      ),
    },
    {
      id: "deposit-rates",
      title: "💰 Fixed Deposit Rates",
      description: (
        <>
          Receive email notifications when the fixed deposit rates goes up
          across major banks in Singapore. <br />
          <small>
            (
            {FIXED_DEPOSIT_BANKS.map(({ title, url }, index) => (
              <Fragment key={title}>
                {index !== 0 &&
                  (index === FIXED_DEPOSIT_BANKS.length - 1 ? " and " : ", ")}
                <Anchor href={url}>{title}</Anchor>
              </Fragment>
            ))}
            )
          </small>
        </>
      ),
    },
    {
      id: "cdc-eyesight-test",
      title: "🚘 CDC Appointment Slots (Eyesight Test)",
      description: (
        <>
          Receive email notifications when there are new appointment date(s) for
          the{" "}
          <Anchor href="https://www.cdc.com.sg/eyesight-test" isExternal>
            eyesight test
          </Anchor>{" "}
          at ComfortDelGro Driving Centre.
        </>
      ),
    },
    {
      id: "cdc-counter-services",
      title: "🚘 CDC Appointment Slots (Counter Services)",
      description: (
        <>
          Receive email notifications when there are new appointment date(s) for{" "}
          <Anchor href="https://www.cdc.com.sg/eappointment" isExternal>
            counter services
          </Anchor>{" "}
          at ComfortDelGro Driving Centre.
        </>
      ),
    },
    {
      id: "movies-gv",
      title: "🎬 Movies with English Subtitles (GV)",
      description: (
        <>
          Receive email notifications when there are new movies with English
          subtitles at{" "}
          <Anchor href="https://www.gv.com.sg/" isExternal>
            Golden Village.
          </Anchor>{" "}
          <br />
          <small>
            (supported languages: English, Chinese, Korean, Japanese)
          </small>
        </>
      ),
    },
    {
      id: "movies-shaw",
      title: "🎬 Movies with English Subtitles (Shaw)",
      description: (
        <>
          Receive email notifications when there are new movies with English
          subtitles at{" "}
          <Anchor href="https://shaw.sg/" isExternal>
            Shaw Theatres
          </Anchor>
          . <br />
          <small>
            (supported languages: English, Chinese, Korean, Japanese)
          </small>
        </>
      ),
    },
    {
      id: "movies-cathay-cineplexes",
      title: "🎬 Movies with English Subtitles (Cathay Cineplexes)",
      description: (
        <>
          Receive email notifications when there are new movies with English
          subtitles at{" "}
          <Anchor href="https://www.cathaycineplexes.com.sg/" isExternal>
            Cathay Cineplexes
          </Anchor>
          . <br />
          <small>
            (supported languages: English, Chinese, Korean, Japanese)
          </small>
        </>
      ),
    },
    {
      id: "movies-the-projector",
      title: "🎬 Movies with English Subtitles (The Projector)",
      description: (
        <>
          Receive email notifications when there are new movies with English
          subtitles at{" "}
          <Anchor href="https://theprojector.sg/">The Projector</Anchor>. <br />
          <small>
            (supported languages: English, Chinese, Korean, Japanese)
          </small>
        </>
      ),
    },
    {
      id: "travel-deals-trip.com",
      title: "🌏 Travel Deals (Trip.com)",
      description: (
        <>
          Receive email notifications when there are new travel deals from{" "}
          <Anchor href="https://sg.trip.com/sale/deals" isExternal>
            Trip.com
          </Anchor>
          .
        </>
      ),
    },
    {
      id: "travel-deals-traveloka",
      title: "🌏 Travel Deals (Traveloka)",
      description: (
        <>
          Receive email notifications when there are new travel deals from{" "}
          <Anchor href="https://www.traveloka.com/en-sg/promotion" isExternal>
            Traveloka
          </Anchor>
          .
        </>
      ),
    },
    {
      id: "events-blood-drive",
      title: "🩸 Community Blood Drives",
      description: (
        <>
          Receive email notifications when there are new{" "}
          <Anchor href="https://giveblood.sg/#blood-drive" isExternal>
            community blood drives
          </Anchor>{" "}
          organised by the Singapore Red Cross.
        </>
      ),
    },
    {
      id: "restaurants-burnt-ends",
      title: "🍽️ Table Reservation Slots (Burnt Ends)",
      description: (
        <>
          Receive email notifications when there are new table reservation
          date(s) at{" "}
          <Anchor href="https://burntends.com.sg/reservation/" isExternal>
            Burnt Ends
          </Anchor>
          . <br />
          <small>
            (for main dining area & chefs counter seating - dinner time only)
          </small>
        </>
      ),
    },
    {
      id: "features-sg-alerts",
      title: "🚀 New Features & Alerts",
      description: (
        <>
          Receive email notifications when there are new feature(s) or alert(s)
          to subscribe to at SG Alerts. <br />
          <small>
            Have a suggestion or feedback? Drop me an{" "}
            <Anchor href="mailto:dominicarrojado@gmail.com" target="_blank">
              email
            </Anchor>
            .
          </small>
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
      </form>{" "}
      <Balancer className="mt-6 text-center text-sm leading-loose text-muted-foreground">
        Like the service? Please consider{" "}
        <Anchor
          href="https://www.paypal.com/paypalme/DominicArrojado"
          isExternal
        >
          donating
        </Anchor>{" "}
        so I can continue to maintain and improve it. Any amount is sincerely
        appreciated! 🙏
      </Balancer>
    </Container>
  );
}
