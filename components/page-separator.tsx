"use client";

import { ReactNode } from "react";
import { Separator, SeparatorText } from "@/components/ui/separator";

type Props = {
  children: ReactNode;
};

export default function PageSeparator({ children }: Props) {
  return (
    <Separator className="my-10 relative">
      <SeparatorText>{children}</SeparatorText>
    </Separator>
  );
}
