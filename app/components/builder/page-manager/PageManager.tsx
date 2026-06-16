"use client";

import { useState } from "react";

import { PageTree } from "./PageTree";
import { useBuilder } from "../store/BuilderContext";

export function PageManager() {
  const { state, selectPage, setBuilderState } = useBuilder();


  const [query, setQuery] = useState("");

  const pages = state.pages.items.filter((p) =>
    p.name.toLowerCase().includes(query.trim().toLowerCase()),
  );


  return (
    <aside className="h-full w-60 shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-[72px] shrink-0 flex-col justify-center gap-2 border-b border-gray-100 px-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-950">Pages</h2>
            <p className="mt-0.5 text-[11px] text-gray-400">
              {pages.length} {pages.length === 1 ? "page" : "pages"}
            </p>
          </div>
          <button
            className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
            type="button"
            onClick={() => {
              // Stage 8C: Ensure we always have a selectable page so createInstance can append.
              if (state.pages.items.length > 0) return;

              const newPageId = crypto.randomUUID();

              const newPage = {
                id: newPageId,
                name: "Untitled Page",
                slug: `page-${newPageId.slice(0, 8)}`,
                description: undefined,
                blocks: [],
                instances: [],
              };

              // Stage 8C: Bootstrap a default page locally.
              // Add the new page via BuilderContext so React state stays consistent.
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setBuilderState((current: any) => ({
                ...current,
                pages: {
                  ...current.pages,
                  items: [newPage],
                  // Preserve existing status/error when bootstrapping.
                  status: current.pages.status,
                  error: current.pages.error,
                },
              }));

              selectPage(newPageId);


            }}
          >
            New Page
          </button>
        </div>


        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search pages…"
          className="h-9 rounded-xl border border-gray-200 bg-white px-3 text-xs font-medium text-gray-900 outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
          aria-label="Search pages"
        />
      </div>

      <PageTree
        error={state.pages.error}
        pages={pages}
        selectedPageId={state.ui.selectedPageId}
        status={state.pages.status}
        onSelectPage={selectPage}
      />
    </aside>
  );
}

