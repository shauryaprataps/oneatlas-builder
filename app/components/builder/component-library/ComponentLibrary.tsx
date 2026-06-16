"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";

import type { ComponentDefinition, ResourceCollection } from "../types";
import { ComponentCategory } from "./ComponentCategory";

function categorizeByType(components: ComponentDefinition[]): Record<string, ComponentDefinition[]> {
  return components.reduce<Record<string, ComponentDefinition[]>>((acc, c) => {
    const key = c.type;
    acc[key] = acc[key] ?? [];
    acc[key].push(c);
    return acc;
  }, {});
}

export function ComponentLibrary({
  components,
  selectedComponentId,
  onSelectComponent,
}: {
  components: ResourceCollection<ComponentDefinition>;
  selectedComponentId: string | null;
  onSelectComponent: (componentId: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const categorized = useMemo(() => {
    const map = categorizeByType(components.items);
    const entries = Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([type, items]) => [type, items] as const);
    return entries;
  }, [components.items]);

  return (
    <aside className="flex h-full min-h-0 flex-col border-r border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-950">Components</h2>
          <p className="mt-0.5 text-[11px] text-gray-400">
            {components.items.length} items
          </p>
        </div>
        <button
          type="button"
          className="rounded-lg p-1 text-gray-500 transition hover:bg-gray-50 hover:text-orange-600"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expand component library" : "Collapse component library"}
        >
          {collapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
        {components.status === "error" ? (
          <div className="rounded-xl border border-gray-200 bg-white p-3 text-sm text-red-600">
            {components.error ?? "Failed to load components."}
          </div>
        ) : null}

        {components.status !== "error" && collapsed ? (
          <div className="rounded-xl bg-gray-50 px-3 py-4 text-center text-xs font-semibold text-gray-600">
            Library collapsed
          </div>
        ) : null}

        {components.status !== "error" && !collapsed ? (
          <div className="space-y-4">
            {categorized.length === 0 ? (
              <div className="rounded-xl bg-gray-50 p-4 text-center text-xs font-semibold text-gray-600">
                No components available.
              </div>
            ) : (
              categorized.map(([type, items]) => (
                <ComponentCategory
                  key={type}
                  title={type}
                  components={items}
                  activeComponentId={selectedComponentId}
                  onSelect={onSelectComponent}
                />
              ))
            )}
          </div>
        ) : null}
      </div>
    </aside>
  );
}

