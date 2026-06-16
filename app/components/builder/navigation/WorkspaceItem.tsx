"use client";

import type { LucideIcon } from "lucide-react";

export type WorkspaceKey =
  | "design"
  | "data"
  | "workflows"
  | "integrations"
  | "settings";

export interface WorkspaceItemProps {
  id: WorkspaceKey;
  label: string;
  icon?: LucideIcon;
  active: boolean;
  onSelect: (id: WorkspaceKey) => void;
}

export function WorkspaceItem({
  id,
  label,
  icon: Icon,
  active,
  onSelect,
}: WorkspaceItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-150 ${
        active
          ? "bg-orange-50 text-orange-600"
          : "text-gray-600 hover:bg-gray-50 hover:text-orange-600"
      }`}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      <span className="truncate">{label}</span>
    </button>
  );
}

