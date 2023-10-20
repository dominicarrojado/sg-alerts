import clsx from "clsx";
import React, { ForwardedRef, HTMLProps } from "react";

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
      className={clsx("font-medium underline underline-offset-4", className)}
      rel={isExternal ? "noopener noreferrer nofollow" : undefined}
      target={isExternal ? "_blank" : target}
    >
      {children}
    </a>
  )
);

Anchor.displayName = "Anchor";

export { Anchor };
