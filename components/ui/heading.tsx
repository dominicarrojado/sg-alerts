import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Heading({ children }: Props) {
  return (
    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
      {children}
    </h1>
  );
}
