import { FileText } from "lucide-react";
import { EmptyState } from "../shared/EmptyState";
import { ErrorState } from "../shared/ErrorState";
import type { BuilderStatus, Page } from "../types";

interface PageTreeProps {
  pages: Page[];
  status: BuilderStatus;
  error: string | null;
  selectedPageId: string | null;
  onSelectPage: (pageId: string) => void;
}

export function PageTree({
  pages,
  status,
  error,
  selectedPageId,
  onSelectPage,
}: PageTreeProps) {
  if (status === "loading") {
    return (
      <div className="space-y-2 p-3">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-10 animate-pulse rounded-xl bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <ErrorState
        title="Pages unavailable"
        message={error ?? "Invalid response."}
        onRetry={() => undefined}
      />
    );
  }

  if (pages.length === 0) {
    return (
      <EmptyState
        compact
        description="Pages returned by the generation service will appear here."
        icon={FileText}
        title="No pages yet"
      />
    );
  }

  return (
    <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Project pages">
      {pages.map((page) => {
        const isSelected = page.id === selectedPageId;

        return (
          <button
            key={page.id}
            className={`group flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-sm transition ${
              isSelected
                ? "border-orange-200 bg-orange-50 font-semibold text-orange-700"
                : "border-transparent bg-white font-medium text-gray-600 hover:border-gray-200 hover:bg-gray-50 hover:text-gray-950"
            }`}
            onClick={() => onSelectPage(page.id)}
            type="button"
          >
            <FileText
              className={`h-4 w-4 transition ${
                isSelected ? "text-orange-500" : "text-gray-400 group-hover:text-orange-500"
              }`}
            />
            <div className="min-w-0 flex-1">
              <div className="truncate font-semibold">
                {page.name}
              </div>
              <div className="mt-0.5 text-[11px] text-gray-400">
                /{page.slug}
              </div>
            </div>
          </button>
        );
      })}
    </nav>
  );
}

