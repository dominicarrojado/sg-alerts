import clsx from "clsx";
import React, { HTMLProps } from "react";

export type Props = HTMLProps<HTMLDivElement>;

const Divider = ({ className, ...props }: Props) => {
  return (
    <div {...props} className={clsx("relative", className)}>
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
    </div>
  );
};

export { Divider };
