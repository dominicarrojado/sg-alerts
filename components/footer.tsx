import React from "react";
import { OWNER_NAME, OWNER_WEBSITE } from "@/lib/constants";
import { Container } from "./ui/container";
import { Anchor } from "./ui/anchor";

export default function Footer() {
  return (
    <Container className="pt-0">
      <p className="text-center text-sm leading-loose text-muted-foreground">
        Built by{" "}
        <Anchor href={OWNER_WEBSITE} target="_blank">
          {OWNER_NAME}
        </Anchor>
      </p>
    </Container>
  );
}
