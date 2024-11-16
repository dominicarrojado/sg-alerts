"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { Container } from "./ui/container";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "./page-header";
import HeaderLogo from "./header-logo";
import ModeToggle from "./mode-toggle";
import MenuToggle from "./menu-toggle";
import { cn } from "@/lib/utils";
import { Routes } from "@/lib/enums";
import { ROUTES_WITH_NO_TITLE } from "@/lib/constants";

export default function Header() {
  const pathname = usePathname();
  const useLogoTitle = ROUTES_WITH_NO_TITLE.includes(pathname as Routes);

  return (
    <Container className="pb-0">
      <div
        className={cn(
          "relative flex min-h-[40px] justify-between",
          useLogoTitle ? "items-start" : "items-end",
        )}
      >
        {useLogoTitle ? (
          <PageHeader>
            <PageHeaderHeading className="space-y-2">
              <HeaderLogo pathname={pathname} />
            </PageHeaderHeading>
            <PageHeaderDescription>
              Subscribe to all things Singapore. <br />
              Save time. Stay updated.
            </PageHeaderDescription>
          </PageHeader>
        ) : (
          <div className="text-2xl font-bold dark:text-white">
            <HeaderLogo pathname={pathname} flagClassName="mr-2 md:mr-2" />
          </div>
        )}
        <div className="absolute right-0 top-0 flex h-10 gap-2">
          <ModeToggle />
          <MenuToggle />
        </div>
      </div>
    </Container>
  );
}
