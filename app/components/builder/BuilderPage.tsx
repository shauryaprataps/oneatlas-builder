"use client";

import { ChatPanel } from "./chat-panel/ChatPanel";
import { BuilderCanvas } from "./canvas/BuilderCanvas";
import { ComponentLibrary } from "./component-library/ComponentLibrary";
import { DEFAULT_COMPONENT_LIBRARY } from "./component-library/ComponentLibraryData";
import { PageManager } from "./page-manager/PageManager";

import { InspectorPanel } from "./inspector/InspectorPanel";
import { WorkspaceTabs } from "./navigation/WorkspaceTabs";
import { BuilderProvider, useBuilder } from "./store/BuilderContext";

import { ToastProvider } from "./toast/ToastProvider";
import { BuilderToolbar } from "./toolbar/BuilderToolbar";
import { useEffect } from "react";


function seedComponentsIfNeeded(params: {
  state: ReturnType<typeof useBuilder>["state"];
  setBuilderState: ReturnType<typeof useBuilder>["setBuilderState"];
}) {
  const { state, setBuilderState } = params;

  if (state.components.items.length > 0) return;

  setBuilderState((current) => ({
    ...current,
    components: {
      items: DEFAULT_COMPONENT_LIBRARY,
      status: "success",
      error: null,
    },
  }));
}


function WorkspaceContent() {
  const { state, selectComponent, setBuilderState } = useBuilder();

  const showDesignColumns = state.ui.activeWorkspace === "design";

  useEffect(() => {
    if (!showDesignColumns) return;

    if (state.components.items.length === 0) {
      seedComponentsIfNeeded({ state, setBuilderState });
    }

    if (!state.ui.selectedComponentId) {
      setBuilderState((current) => ({
        ...current,
        ui: {
          ...current.ui,
          selectedComponentId: DEFAULT_COMPONENT_LIBRARY[0]?.id ?? null,
        },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDesignColumns]);

  return (
    <div className="flex min-h-0 flex-1 w-full overflow-hidden">
      {showDesignColumns ? (
        <div className="grid h-full min-h-0 w-full grid-cols-[420px_280px_minmax(400px,1fr)_300px] xl:grid-cols-[420px_280px_minmax(400px,1fr)_300px]">
          {/* Chat */}
          <div className="min-h-0 overflow-hidden border-r border-gray-200">
            <ChatPanel />
          </div>

          {/* Builder rail = Pages + Components */}
          <div className="min-h-0 overflow-hidden border-r border-gray-200">
            <div className="flex h-full min-h-0 flex-col">
              <PageManager />
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden border-t border-gray-100 bg-white">
                <ComponentLibrary
                  components={{
                    items: DEFAULT_COMPONENT_LIBRARY,
                    status: "success",
                    error: null,
                  }}
                  selectedComponentId={state.ui.selectedComponentId}
                  onSelectComponent={selectComponent}
                />
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="min-h-0 min-w-0 overflow-hidden">
            <div className="h-full w-full flex min-h-0 flex-col">
              <WorkspaceTabs />
              <div className="flex min-h-0 flex-1 w-full">
                <BuilderCanvas />
              </div>
            </div>
          </div>

          {/* Inspector */}
          <div className="min-h-0 overflow-hidden border-l border-gray-200">
            <InspectorPanel />
          </div>
        </div>
      ) : (
        <div className="grid h-full min-h-0 w-full grid-cols-[420px_1fr] xl:grid-cols-[420px_1fr]">
          {/* Chat */}
          <div className="min-h-0 overflow-hidden border-r border-gray-200">
            <ChatPanel />
          </div>

          {/* Workspace */}
          <div className="min-h-0 overflow-hidden">
            <div className="h-full w-full flex min-h-0 flex-col">
              <WorkspaceTabs />
              <div className="flex min-h-0 flex-1 w-full">
                <BuilderCanvas />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function BuilderWorkspace() {
  return (
    <div className="flex h-dvh min-h-0 flex-col overflow-hidden bg-[#F5F5EE]">
      <BuilderToolbar />
      <WorkspaceContent />
    </div>
  );
}


export function BuilderPage() {
  return (
    <ToastProvider>
      <BuilderProvider>
        <BuilderWorkspace />
      </BuilderProvider>
    </ToastProvider>
  );
}
