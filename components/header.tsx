import React from "react";
import { Container } from "./ui/container";
import { ModeToggle } from "./mode-toggle";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "./page-header";

export default function Header() {
  return (
    <Container className="pb-0">
      <div className="flex items-start justify-between">
        <PageHeader>
          <PageHeaderHeading className="space-y-2">
            <span className="mr-2 md:mr-4">🇸🇬</span>
            <abbr title="Singapore" className="no-underline">
              SG
            </abbr>{" "}
            Alerts
          </PageHeaderHeading>
          <PageHeaderDescription>
            Subscribe to all things Singapore. Save time. Stay updated.
          </PageHeaderDescription>
        </PageHeader>
        <ModeToggle />
      </div>
    </Container>
  );
}
