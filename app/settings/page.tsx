import React from "react";
import { Container } from "@/components/ui/container";
import SendLinkForm from "./send-link-form";
import Authenticated from "./authenticated";

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
