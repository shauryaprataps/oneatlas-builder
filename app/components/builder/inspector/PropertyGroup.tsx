"use client";

import type { ReactNode } from "react";

export function PropertyGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-950">{title}</h3>
      </div>
      {children}
    </section>
  );
}

