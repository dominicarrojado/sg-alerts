import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import { Routes } from "@/lib/enums";
import Authenticated from "./authenticated";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your subscription settings for SG Alerts.",
  alternates: {
    canonical: `${Routes.Settings}/`,
  },
};

export default function Settings() {
  return (
    <Container className="pt-0">
      <Authenticated />
    </Container>
  );
}
