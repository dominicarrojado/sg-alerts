import React, { HTMLProps } from "react";
import { cn } from "@/lib/utils";

export type Props = HTMLProps<HTMLDivElement>;

const Divider = ({ className, ...props }: Props) => {
  return (
    <div {...props} className={cn("relative", className)}>
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
    </div>
  );
};

export { Divider };
