import Link from "next/link";
import React from "react";
import Balancer from "react-wrap-balancer";
import { Routes } from "@/lib/enums";
import { OWNER_NAME, OWNER_WEBSITE } from "@/lib/constants";
import { Container } from "./ui/container";
import { Anchor } from "./ui/anchor";

export default function Footer() {
  return (
    <Container className="pt-0 text-center text-sm font-light leading-loose text-muted-foreground">
      <p>
        <Balancer>
          Like the service? Please consider{" "}
          <Link href={Routes.Donate} passHref legacyBehavior>
            <Anchor>donating</Anchor>
          </Link>{" "}
          to support this free notification service. Every donation is sincerely
          appreciated! 🙏
        </Balancer>
      </p>
      <p className="mt-4">
        Built by{" "}
        <Anchor href={OWNER_WEBSITE} target="_blank">
          {OWNER_NAME}
        </Anchor>
      </p>
      <p className="mt-4 text-xs font-normal leading-normal text-muted-foreground">
        <Balancer>
          Disclaimer: SG Alerts is an independent tracking and notification
          service not affiliated with any bank, airline, merchant, or government
          agency. Rates, promotions, and slot data are aggregated on a
          best-effort basis and provided for informational purposes only without
          warranty of any kind. Information does not constitute financial,
          investment, or legal advice. Always verify details with official
          providers.{" "}
          <Link href={Routes.Disclaimer} passHref legacyBehavior>
            <Anchor>Read full disclaimer</Anchor>
          </Link>
          .
        </Balancer>
      </p>
    </Container>
  );
}
