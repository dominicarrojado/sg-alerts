import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import { Routes } from "@/lib/enums";
import Authenticated from "./authenticated";

export const metadata: Metadata = {
  title: "Subscribe",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${Routes.Subscribe}/`,
  },
};

export default function Subscribe() {
  return (
    <Container className="pt-0">
      <Authenticated />
    </Container>
  );
}
