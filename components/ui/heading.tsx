import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Heading({ children }: Props) {
  return (
    <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
      {children}
    </h1>
  );
}
