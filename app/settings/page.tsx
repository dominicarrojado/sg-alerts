import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import { Routes } from "@/lib/enums";
import Authenticated from "./authenticated";
import { META_OPEN_GRAPH, META_TWITTER } from "../shared-metadata";

const title = "Settings";
const description = "Manage your subscription settings for SG Alerts.";
const url = `${Routes.Settings}/`;

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

export default function Settings() {
  return (
    <Container className="pt-0">
      <Authenticated />
    </Container>
  );
}
