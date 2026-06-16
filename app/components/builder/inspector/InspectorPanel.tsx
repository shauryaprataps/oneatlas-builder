"use client";

import { Globe, Info, LayoutTemplate, MapPin } from "lucide-react";
import { EmptyState } from "../shared/EmptyState";
import { ErrorState } from "../shared/ErrorState";
import { useBuilder } from "../store/BuilderContext";
import type { ComponentInstance, Page } from "../types";
import { PropertyField } from "./PropertyField";
import { PropertyGroup } from "./PropertyGroup";
import { ComponentInspector } from "./ComponentInspector";

function formatPageLabel(page: Page | null) {
  if (!page) return "—";
  return page.name || "Untitled";
}

export function InspectorPanel() {
  const { state } = useBuilder();

  const selectedPage =
    state.pages.items.find((p) => p.id === state.ui.selectedPageId) ?? null;

  const selectedInstance: ComponentInstance | null = (() => {
    console.log("InspectorPanel selectedInstanceId", state.ui.selectedInstanceId);
    console.log("InspectorPanel selectedPageId", state.ui.selectedPageId);

    if (!state.ui.selectedInstanceId || !selectedPage) return null;
    return (
      selectedPage.instances.find((inst) => inst.id === state.ui.selectedInstanceId) ??
      null
    );
  })();

  // 1) selectedInstanceId takes precedence
  if (selectedInstance) {
    return (
      <aside className="h-full overflow-y-auto border-l border-gray-200 bg-white">
        <div className="p-4">
          <ComponentInspector instance={selectedInstance} />
        </div>
      </aside>
    );
  }

  // 2) selectedComponentId fallback is intentionally NOT used in Stage 8C.

  // Error handling
  if (state.pages.status === "error") {
    return (
      <aside className="h-full overflow-y-auto border-l border-gray-200 bg-white">
        <div className="p-4">
          <ErrorState
            title="Inspector unavailable"
            message={state.pages.error ?? "Invalid response."}
            onRetry={() => undefined}
          />
        </div>
      </aside>
    );
  }

  // 3) selectedPageId fallback
  if (!selectedPage) {
    return (
      <aside className="h-full overflow-y-auto border-l border-gray-200 bg-white">
        <div className="p-4">
          <EmptyState
            title="Select a page"
            description="Choose a page from Page Manager to inspect its schema."
            icon={LayoutTemplate}
          />
        </div>
      </aside>
    );
  }

  // 4) Empty state for page selected but no instance selected
  return (
    <aside className="h-full overflow-y-auto border-l border-gray-200 bg-white">
      <div className="p-4">
        <PropertyGroup title="Project">
          <PropertyField label="Project Name">{state.project.name}</PropertyField>
          <PropertyField label="Environment">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-semibold text-gray-900">production</span>
            </div>
          </PropertyField>
        </PropertyGroup>

        <div className="mt-5" />

        <PropertyGroup title="Selected Page">
          <PropertyField label="Selected Page">{formatPageLabel(selectedPage)}</PropertyField>
          <PropertyField label="Page ID">{selectedPage.id}</PropertyField>
          <PropertyField label="Tip">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-700">Click an instance on the canvas.</span>
            </div>
          </PropertyField>
        </PropertyGroup>

        <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-3">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 text-orange-500" />
            <div>
              <p className="text-xs font-semibold text-gray-900">Inspector</p>
              <p className="mt-1 text-xs leading-5 text-gray-600">
                Instance controls appear here once you select an instance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}


