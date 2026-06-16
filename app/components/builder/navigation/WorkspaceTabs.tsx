"use client";

import { useMemo } from "react";


import { useBuilder } from "../store/BuilderContext";

import type { WorkspaceKey } from "./WorkspaceItem";

const tabs: Array<{ id: WorkspaceKey; label: string }> = [
  { id: "design", label: "Design" },
  { id: "data", label: "Data" },
  { id: "workflows", label: "Workflows" },
  { id: "integrations", label: "Integrations" },
  { id: "settings", label: "Settings" },
];

export function WorkspaceTabs() {
  const { state, setActiveWorkspace } = useBuilder();
  const active = state.ui.activeWorkspace;

  const tabDefs = useMemo(() => tabs, []);

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="flex items-center gap-1 px-3 sm:px-5">
        {tabDefs.map((tab) => {
          const isActive = tab.id === active;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveWorkspace(tab.id)}
              className={`-mb-px rounded-t-lg px-3 py-3 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-b-2 border-orange-500 text-orange-600"
                  : "text-gray-600 hover:text-orange-600 hover:bg-gray-50"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

