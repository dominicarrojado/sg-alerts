"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MAIN_MENU_ITEMS, TOPICS_MENU_ITEMS } from "@/lib/content";
import { PH_ALERTS_URL } from "@/lib/constants";

export default function MenuToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const closeSheet = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <MenuIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <span className="mr-2">🇸🇬</span>
            <abbr title="Singapore" className="no-underline">
              SG
            </abbr>{" "}
            Alerts
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="my-4 h-[calc(100vh-6rem)] pl-7">
          <div className="flex flex-col space-y-3">
            {MAIN_MENU_ITEMS.map(({ title, href }) => (
              <Link key={href} href={href} onClick={closeSheet}>
                {title}
              </Link>
            ))}
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-3 pt-6">
              <h4 className="font-medium">Topics</h4>
              {TOPICS_MENU_ITEMS.map(({ title, href }, index) => (
                <nav
                  key={index}
                  className="flex gap-2 items-center text-muted-foreground"
                >
                  {href ? (
                    <Link key={href} href={href} onClick={closeSheet}>
                      {title}
                    </Link>
                  ) : (
                    <>
                      <span className="opacity-60">{title}</span>
                      <Badge variant="outline" className="shrink-0">
                        Coming soon
                      </Badge>
                    </>
                  )}
                </nav>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-3 pt-6">
              <h4 className="font-medium">Other Alerts</h4>
              <nav className="flex gap-2 items-center">
                <a href={PH_ALERTS_URL}>
                  <span className="mr-1">🇵🇭</span> PH Alerts
                </a>
              </nav>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
