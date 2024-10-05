import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import { Anchor } from "@/components/ui/anchor";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getAssetUrl } from "@/lib/assets";
import { Routes } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "../shared-metadata";
import Testimonials from "./testimonials";

const title = "Support and Donate";
const description =
  "Your kind donation will be sincerely appreciated and will go a long way.";
const url = Routes.Donate;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    ...META_OPEN_GRAPH,
    title,
    description,
    url,
  },
  twitter: {
    ...META_TWITTER,
    title,
    description,
  },
};

export default function Donate() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>{description}</Subheading>
      </div>
      <Paragraph>
        I created <span className="font-medium">SG Alerts</span> to help people
        save time and effort. While this service is free to use, it takes time
        and effort to maintain and incur costs to run. Your donation will help
        me cover the costs and keep the services running. It will also be a
        great motivation for me to continue improving the service with new
        features.
      </Paragraph>
      <Paragraph>
        If you&apos;d like to support my work with a donation, I would be very
        grateful. Every donation will be sincerely appreciated and will go a
        long way. Leave a message with your donation and I will add your name to
        the list of supporters below. Thank you very much for your support ~
      </Paragraph>
      <div className="flex flex-col gap-4 mt-6 sm:flex-row">
        <Card className="w-72 max-w-full mx-auto sm:w-1/2">
          <CardContent className="flex aspect-square items-center justify-center p-4">
            <img
              src={getAssetUrl("paylah.jpg")}
              className="w-full h-auto aspect-square"
              alt="DBS PayLah! QR code"
              width="540"
              height="540"
              draggable="false"
            />
          </CardContent>
          <CardFooter className="justify-center">
            <Paragraph className="text-center">
              Scan with{" "}
              <Anchor
                href="https://www.dbs.com.sg/personal/deposits/pay-with-ease/dbs-paylah"
                isExternal
              >
                DBS PayLah!
              </Anchor>{" "}
              <br />
              (for Singapore Residents)
            </Paragraph>
          </CardFooter>
        </Card>
        <Card className="w-72 max-w-full mx-auto sm:w-1/2">
          <Anchor
            href="https://www.paypal.com/paypalme/DominicArrojado"
            className="no-underline"
            isExternal
          >
            <CardContent className="flex aspect-square items-center justify-center p-4">
              <img
                src={getAssetUrl("paypal.svg")}
                className="w-full h-auto aspect-square bg-white p-10"
                alt="PayPal"
                width="540"
                height="540"
                draggable="false"
              />
            </CardContent>
            <CardFooter className="justify-center">
              <Paragraph className="text-center">
                Click to donate via PayPal <br />
                (For International Supporters)
              </Paragraph>
            </CardFooter>
          </Anchor>
        </Card>
      </div>
      <Paragraph>
        Thank you to all the kind souls who have donated so far. I truly
        appreciate your support and encouragement.
      </Paragraph>
      <Testimonials />
    </Container>
  );
}
