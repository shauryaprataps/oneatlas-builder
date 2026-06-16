"use client";

import type { ReactNode } from "react";

export function PropertyField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold text-gray-700">{label}</p>
      <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900">
        {children}
      </div>
    </div>
  );
}

