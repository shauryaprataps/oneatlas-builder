import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  compact?: boolean;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center px-5 text-center ${
        compact ? "py-10" : "min-h-72 py-14"
      }`}
    >
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50 text-orange-500">
        <Icon className="h-5 w-5" />
      </span>
      <p className="text-sm font-semibold text-gray-700">{title}</p>
      <p className="mt-1 max-w-xs text-xs leading-5 text-gray-400">
        {description}
      </p>
    </div>
  );
}
