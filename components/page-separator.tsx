"use client";

import { ReactNode } from "react";
import { Separator, SeparatorText } from "@/components/ui/separator";

type Props = {
  children: ReactNode;
};

export default function PageSeparator({ children }: Props) {
  return (
    <Separator className="relative my-8 sm:my-10">
      <SeparatorText>{children}</SeparatorText>
    </Separator>
  );
}
