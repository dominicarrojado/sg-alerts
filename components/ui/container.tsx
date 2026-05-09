import React, { HTMLProps } from "react";
import { cn } from "@/lib/utils";

export type Props = HTMLProps<HTMLDivElement>;

const Container = ({ children, className, ...props }: Props) => {
  return (
    <div
      {...props}
      className={cn("mx-auto max-w-2xl px-4 py-10", "sm:px-10", className)}
    >
      {children}
    </div>
  );
};
export { Container };
