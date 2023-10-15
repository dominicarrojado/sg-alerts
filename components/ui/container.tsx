import clsx from "clsx";
import React, { HTMLProps } from "react";

export type Props = HTMLProps<HTMLDivElement>;

const Container = ({ children, className, ...props }: Props) => {
  return (
    <div
      {...props}
      className={clsx("px-4 py-10 mx-auto max-w-2xl", "sm:px-10", className)}
    >
      {children}
    </div>
  );
};
export { Container };
