"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DONATION_TESTIMONIALS } from "@/lib/content";
import { DonationTestimonials } from "@/lib/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Testimonials() {
  const [isMobile, setIsMobile] = useState(false);
  const testimonialArrays = useMemo(() => {
    if (isMobile) {
      return [DONATION_TESTIMONIALS];
    }

    // split testimonials into 2 columns
    return DONATION_TESTIMONIALS.reduce(
      (acc, curr, index) => {
        if (index % 2 === 0) {
          acc[0].push(curr);
        } else {
          acc[1].push(curr);
        }
        return acc;
      },
      [[] as DonationTestimonials, [] as DonationTestimonials]
    );
  }, [isMobile]);

  useEffect(() => {
    const windowOnResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", windowOnResize);

    return () => {
      window.removeEventListener("resize", windowOnResize);
    };
  }, []);

  return (
    <div className="mt-6 grid grid-cols-1 grid-rows-1 gap-4 sm:grid-cols-2">
      {testimonialArrays.map((testimonials, index) => (
        <ul key={index} className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-[48px] h-[48px]">
                    <AvatarFallback>
                      {testimonial.firstName[0]}
                      {testimonial.lastName}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-md">{testimonial.firstName}</h4>
                    <span className="text-xs text-muted-foreground">
                      {testimonial.date}
                    </span>
                  </div>
                </div>
                {testimonial.message && (
                  <blockquote className="pt-2">
                    <p className="text-sm">{testimonial.message}</p>
                  </blockquote>
                )}
                <div className="flex items-center"></div>
              </CardContent>
            </Card>
          ))}
        </ul>
      ))}
    </div>
  );
}
