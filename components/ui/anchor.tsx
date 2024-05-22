import React, { ForwardedRef, HTMLProps } from "react";
import { cn } from "@/lib/utils";

export type Props = HTMLProps<HTMLAnchorElement> & {
  isExternal?: boolean;
};
const Anchor = React.forwardRef(
  (
    { children, className, isExternal, target, ...props }: Props,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => (
    <a
      {...props}
      ref={ref}
      className={cn("font-medium underline underline-offset-4", className)}
      rel={isExternal ? "noopener noreferrer nofollow" : undefined}
      target={isExternal ? "_blank" : target}
    >
      {children}
    </a>
  )
);

Anchor.displayName = "Anchor";

export { Anchor };
