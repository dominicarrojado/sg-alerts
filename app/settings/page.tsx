import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import { Routes } from "@/lib/enums";
import SendLinkForm from "./send-link-form";
import Authenticated from "./authenticated";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your subscription settings for SG Alerts.",
  alternates: {
    canonical: `${Routes.Settings}/`,
  },
};

export default function Settings({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { id } = searchParams;

  return (
    <Container className="pt-0">
      {id ? <Authenticated /> : <SendLinkForm />}
    </Container>
  );
}
