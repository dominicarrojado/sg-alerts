import React from "react";
import { Container } from "./ui/container";

export default function Footer() {
  return (
    <Container className="pt-0">
      <p className="text-center text-sm leading-loose text-muted-foreground">
        Built by{" "}
        <a
          href="https://twitter.com/shadcn"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          Dominic Arrojado
        </a>
      </p>
    </Container>
  );
}
