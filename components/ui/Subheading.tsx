import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Subheading({ children }: Props) {
  return <p className="text-lg text-muted-foreground">{children}</p>;
}
