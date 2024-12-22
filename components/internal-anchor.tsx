"use client";

import { LinkProps } from "next/link";
import React, { ReactNode } from "react";
import { MAIN_PATH } from "@/lib/constants";
import { Environment } from "@/lib/enums";

type Props = LinkProps & {
  href: string;
  children: ReactNode;
};

export default function InternalAnchor({ children, href, ...props }: Props) {
  const finalHref =
    process.env.NODE_ENV === Environment.Production
      ? `${MAIN_PATH}${href}`
      : href;

  return (
    <a {...props} href={finalHref}>
      {children}
    </a>
  );
}
