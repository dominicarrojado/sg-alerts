"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

type Props = {
  to: string;
};

export default function Redirect({ to }: Props) {
  useEffect(() => {
    redirect(to);
  }, [to]);

  return null;
}
