"use client";

import { Blocks, LayoutTemplate, Menu } from "lucide-react";

import { EntityEditor } from "../entity-editor/EntityEditor";
import { IntegrationPanel } from "../integration-panel/IntegrationPanel";
import { EmptyState } from "../shared/EmptyState";
import { ErrorState } from "../shared/ErrorState";
import { useBuilder } from "../store/BuilderContext";
import { WorkflowBuilder } from "../workflow-builder/WorkflowBuilder";

import { ProjectSettingsPanel } from "./ProjectSettingsPanel";
import { InstanceRenderer } from "./InstanceRenderer";

export function BuilderCanvas() {
  const {
    state,
    updateUi,
    selectInstance,
    createInstance,
  } = useBuilder();







  const selectedPage =
    state.pages.items.find((page) => page.id === state.ui.selectedPageId) ??
    null;

  console.log("Canvas selectedPageId", state.ui.selectedPageId);
  console.log("Canvas pages", state.pages.items);
  console.log("Canvas selectedPage", selectedPage);







  return (
    <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[#F5F5EE]">
      <div className="flex h-12 shrink-0 items-center border-b border-gray-200 bg-white px-3 sm:px-5">
        <button
          aria-label="Open AI Builder"
          className="mr-2 rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 md:hidden"
          onClick={() => updateUi({ isChatOpen: true })}
        >
          <Menu className="h-4 w-4" />
        </button>

        <nav className="flex h-full items-center gap-1" aria-label="Workspace">
          <span className="text-xs font-semibold text-gray-700">
            {state.ui.activeWorkspace}
          </span>
        </nav>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8">
        {state.ui.activeWorkspace === "design" ? (

            <DesignView
              error={state.pages.error}
              hasPages={state.pages.items.length > 0}
              isLoading={
                state.status === "loading" || state.pages.status === "loading"
              }
              selectedPage={selectedPage}
              selectedComponent={null}
              components={[]}
              onSelectComponent={() => undefined}
              selectedInstanceId={state.ui.selectedInstanceId}
              onSelectInstance={selectInstance}
              createInstance={createInstance}
            />

        ) : null}


        {/* Ensure canvas design view always renders even when no pages exist */}
        {state.ui.activeWorkspace === "design" && !selectedPage && null}


        {state.ui.activeWorkspace === "data" ? <EntityEditor /> : null}

        {state.ui.activeWorkspace === "workflows" ? <WorkflowBuilder /> : null}

        {state.ui.activeWorkspace === "integrations" ? <IntegrationPanel /> : null}

        {state.ui.activeWorkspace === "settings" ? <ProjectSettingsPanel /> : null}
      </div>

    </main>
  );
}

import type { Page } from "../types";

type DesignViewProps = {
  error: string | null;
  hasPages: boolean;
  isLoading: boolean;
  selectedPage: Page | null;
  createInstance: (
    instance: import("../types").ComponentInstance
  ) => void;
  selectedComponent: import("../types").ComponentDefinition | null;
  components: import("../types").ComponentDefinition[];
  onSelectComponent: (componentId: string | null) => void;
};


function DesignView({
  error,
  hasPages,
  isLoading,
  selectedPage,

  selectedInstanceId,
  createInstance,
  onSelectInstance,
}: DesignViewProps & {
  selectedInstanceId: string | null;
  onSelectInstance: (id: string) => void;
}) {

  // Stage 8A: render real instances on the canvas when a page is selected.
  if (selectedPage) {
    return (
      <div className="h-full rounded-2xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-950">Canvas</h3>
            <p className="mt-0.5 text-xs text-gray-500">
              Click an instance to inspect (inspector editing pending).
            </p>
          </div>
          <div className="text-xs font-semibold text-gray-500">
            {selectedPage.instances.length} instances
          </div>
        </div>

        <div
          className="relative min-h-[420px] overflow-hidden"
          onMouseEnter={() => console.log("CANVAS ENTER")}
          onMouseMove={() => console.log("CANVAS MOVE")}
          onDragOver={(e) => {
            console.log("DRAG OVER");
            e.preventDefault();
          }}
          onDrop={(e) => {
            console.log("DROP FIRED");
            e.preventDefault();
            if (!selectedPage) return;


            const raw = e.dataTransfer.getData(
              "application/x-component-definition",
            );
            console.log("RAW PAYLOAD", raw);
            if (!raw) return;

            try {
              const parsed: { componentId: string; type: string } = JSON.parse(raw);
              console.log("PARSED PAYLOAD", parsed);
              const { componentId, type } = parsed;

              const newId = crypto.randomUUID();
              const instance = {
                id: newId,
                componentId,
                type,
                x: e.nativeEvent.offsetX ?? 0,
                y: e.nativeEvent.offsetY ?? 0,
                width: 300,
                height: 80,
                padding: 8,
                margin: 8,
              };

              console.log("CREATE INSTANCE", instance);
              // BuilderContext: append instance via createInstance
              createInstance(instance);

              // select is expected to be handled by createInstance in BuilderContext

              // but in case it's not, we still ensure selection:
              onSelectInstance(newId);
            } catch {
              // ignore invalid drops
            }
          }}
        >

          {selectedPage.instances.length === 0 ? (
            <div
              className="flex h-[420px] flex-col items-center justify-center gap-2 text-center"
              onMouseEnter={() => console.log("EMPTY ENTER")}
              onMouseMove={() => console.log("EMPTY MOVE")}
            >
              <div className="rounded-2xl bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
                Drag components here to start building
              </div>
              <div className="max-w-md text-xs leading-5 text-gray-500">
                Instances exist only after creation. Drag-and-drop is intentionally disabled in Stage 8A.
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-white">
              <div className="pointer-events-auto absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[length:24px_24px]" />
              <div className="relative h-full w-full">
            {selectedPage.instances.map((instance) => (
              <InstanceRenderer
                key={instance.id}
                instance={instance}
                selected={instance.id === selectedInstanceId}
                onClick={() => {
                  onSelectInstance(instance.id);
                }}
              />
            ))}

              </div>
            </div>
          )}
        </div>
      </div>
    );
  }




  // Priority 3: render state-driven fallbacks.
  if (isLoading) return <CanvasSkeleton />;

  if (error) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white">
        <ErrorState
          title="Generation failed"
          message={error}
          onRetry={() => undefined}
        />
      </div>
    );
  }

  if (hasPages) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white">
        <EmptyState
          description="Select a page from the page manager to preview its schema."
          icon={LayoutTemplate}
          title="Select a page"
        />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_10px_30px_rgba(17,24,39,0.08)]">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-[#FAFAF8]">
        <div className="flex items-center gap-2 bg-[#F5F5EE] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="ml-1 flex min-w-0 flex-1 items-center">
            <div className="truncate rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold text-gray-500">
              Canvas preview
            </div>
          </div>
        </div>

        <div className="aspect-[16/9] w-full">
          <div className="flex h-full flex-col items-center justify-center p-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 shadow-sm">
              <Blocks className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-2xl font-bold tracking-tight text-gray-950">
              Select a page or start building
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
              Choose a page from Page Manager to preview it here. If there are no
              pages yet, generate them through the builder workflow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CanvasSkeleton() {
  return (
    <div className="mx-auto w-full max-w-5xl animate-pulse rounded-2xl border border-gray-200 bg-white p-6">
      <div className="h-7 w-48 rounded-lg bg-gray-100" />
      <div className="mt-3 h-4 w-72 max-w-full rounded bg-gray-100" />
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-28 rounded-xl bg-gray-100" />
        ))}
      </div>
      <div className="mt-4 h-64 rounded-xl bg-gray-100" />
    </div>
  );
}

