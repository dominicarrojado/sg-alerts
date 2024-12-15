"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { ArrowDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/google-analytics";
import { GoogleAnalyticsEvent } from "@/lib/enums";

type Props = {
  className?: string;
  children: ReactNode;
};

export default function PageScroller({ className, children }: Props) {
  const btnText = "Subscribe Now";
  const subscribeElRef = useRef<HTMLDivElement>(null);
  const [shouldDisplayBtn, setShouldDisplayBtn] = useState(true);
  const btnOnClick = () => {
    const subscribeEl = subscribeElRef.current;

    if (subscribeEl) {
      subscribeEl.scrollIntoView({ behavior: "smooth" });
    }

    trackEvent({
      event: GoogleAnalyticsEvent.SCROLL_CLICK,
      buttonText: btnText,
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldDisplayBtn(!entry.isIntersecting);
      },
      { threshold: 0.15 },
    );
    const subscribeEl = subscribeElRef.current;

    if (subscribeEl) {
      observer.observe(subscribeEl);
    }

    return () => {
      if (subscribeEl) {
        observer.unobserve(subscribeEl);
      }
    };
  }, []);

  return (
    <>
      <div ref={subscribeElRef} className={className}>
        {children}
      </div>
      <div
        className={cn(
          "pointer-events-none fixed bottom-0 left-0 z-50 w-full translate-y-full text-center opacity-0",
          "transition-all duration-300 ease-in-out",
          {
            "-translate-y-6 opacity-100": shouldDisplayBtn,
          },
        )}
      >
        <Button
          onClick={btnOnClick}
          className={cn({ "pointer-events-auto": shouldDisplayBtn })}
        >
          <span className="align-middle">{btnText}</span>
          <ArrowDownIcon className="ml-2 inline-block h-4 w-4 align-middle" />
        </Button>
      </div>
    </>
  );
}
