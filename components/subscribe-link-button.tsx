"use client";

import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Routes } from "@/lib/enums";
import { SUBSCRIBE_FORM_ID } from "@/lib/constants";

type Props = {
  route: Routes;
  linkText: string;
};

export default function SubscribeLinkButton({ route, linkText }: Props) {
  const linkUrl = `${route}#${SUBSCRIBE_FORM_ID}`;

  return (
    <Button variant="secondary" asChild>
      <Link href={linkUrl}>
        {linkText} <ArrowRightIcon className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  );
}
