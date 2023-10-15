import clsx from "clsx";
import React, { HTMLProps } from "react";

export type Props = HTMLProps<HTMLAnchorElement> & {
  isExternal?: boolean;
};

const Anchor = ({
  children,
  className,
  isExternal,
  target,
  ...props
}: Props) => {
  return (
    <a
      {...props}
      className={clsx("font-medium underline underline-offset-4", className)}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : target}
    >
      {children}
    </a>
  );
};
export { Anchor };
