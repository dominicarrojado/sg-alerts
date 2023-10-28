import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import Authenticated from "./authenticated";

export const metadata: Metadata = {
  title: "Subscribe",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Subscribe() {
  return (
    <Container className="pt-0">
      <Authenticated />
    </Container>
  );
}
