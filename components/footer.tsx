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
      <nav
        aria-label="Footer"
        className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs"
      >
        <Link href={Routes.About} passHref legacyBehavior>
          <Anchor>About</Anchor>
        </Link>
        <span>·</span>
        <Link href={Routes.HowItWorks} passHref legacyBehavior>
          <Anchor>How It Works</Anchor>
        </Link>
        <span>·</span>
        <Link href={Routes.Disclaimer} passHref legacyBehavior>
          <Anchor>Disclaimer</Anchor>
        </Link>
      </nav>
    </Container>
  );
}
