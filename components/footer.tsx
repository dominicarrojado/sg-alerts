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
    </Container>
  );
}
