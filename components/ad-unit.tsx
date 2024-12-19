"use client";

import React, { useEffect } from "react";
import { displayAd } from "@/lib/google-adsense";
import { cn } from "@/lib/utils";
import {
  GoogleAdSenseUnit,
  GoogleAdSenseUnitFormat,
  GoogleAdSenseUnitLayout,
} from "@/lib/enums";
import { GOOGLE_ADSENSE_CLIENT_ID } from "@/lib/constants";
import styles from "./ad-unit.module.css";

type Props = {
  className?: string;
};

export default function AdUnit({ className }: Props) {
  useEffect(() => {
    displayAd();
  }, []);

  return (
    <div>
      <ins
        className={cn(
          "adsbygoogle mt-6 block text-center",
          className,
          styles.adunit,
        )}
        data-ad-client={GOOGLE_ADSENSE_CLIENT_ID}
        data-ad-slot={GoogleAdSenseUnit.TOPIC_BODY}
        data-ad-format={GoogleAdSenseUnitFormat.FLUID}
        data-ad-layout={GoogleAdSenseUnitLayout.IN_ARTICLE}
        data-full-width-responsive="true"
      />
    </div>
  );
}
