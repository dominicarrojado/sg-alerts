"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Routes } from "@/lib/enums";

export default function HeaderLogo() {
  const pathname = usePathname();
  const children = (
    <>
      <span className="mr-2 md:mr-4">🇸🇬</span>
      <span className="group-hover:underline">
        <abbr title="Singapore" className="no-underline">
          SG
        </abbr>{" "}
        Alerts
      </span>
    </>
  );

  return pathname === Routes.HOME ? (
    children
  ) : (
    <Link href={Routes.HOME} className="group">
      {children}
    </Link>
  );
}
