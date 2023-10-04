import { cn } from "@/lib/utils";
import React, { HTMLProps } from "react";

export type Props = HTMLProps<HTMLDivElement>;

const Container = ({ children, className, ...props }: Props) => {
  return (
    <div {...props} className={cn("p-10 mx-auto max-w-2xl", className)}>
      {children}
    </div>
  );
};
export { Container };
