import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CATEGORY_ITEMS } from "@/lib/content";
import { OWNER_EMAIL } from "@/lib/constants";

export default function Home() {
  return (
    <Container className="pt-0">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            List of Categories
          </CardTitle>
          <CardDescription>
            Select a category that you would like to receive notifications for.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 pb-4 sm:grid-cols-3 sm:gap-6">
            {CATEGORY_ITEMS.map(({ emoji, title, description, href }) => (
              <Button
                key={title}
                variant="outline"
                className="bg-transparent aspect-square"
                asChild
              >
                <Link href={href}>
                  <div className="flex flex-col text-center py-2">
                    <div className="text-2xl sm:text-4xl">{emoji}</div>
                    <div className="mt-2">{title}</div>
                    {description && (
                      <div className="mt-1 text-xs text-muted-foreground font-light">
                        {description}
                      </div>
                    )}
                  </div>
                </Link>
              </Button>
            ))}
            <Button variant="ghost" asChild>
              <a href={`mailto:${OWNER_EMAIL}`}>
                <div className="flex flex-col text-center py-2">
                  <div className="text-2xl sm:text-4xl">💡</div>
                  <div className="mt-2">
                    New Topic? <br />
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground font-light">
                    Send an email
                  </div>
                </div>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
