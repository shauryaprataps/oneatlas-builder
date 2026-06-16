"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import {
  createInitialBuilderState,
  type BuilderState,
  type WorkspaceKey,
} from "../types";

interface BuilderContextValue {
  state: BuilderState;
  setBuilderState: Dispatch<SetStateAction<BuilderState>>;
  updateBuilderState: (update: Partial<BuilderState>) => void;
  updateUi: (update: Partial<BuilderState["ui"]>) => void;
  setActiveWorkspace: (workspace: WorkspaceKey) => void;
  selectPage: (pageId: string | null) => void;
  selectEntity: (entityId: string | null) => void;
  selectWorkflow: (workflowId: string | null) => void;
  selectIntegration: (integrationId: string | null) => void;

  // Stage 7: component selection
  selectComponent: (selectedComponentId: string | null) => void;

  // Stage 8: component instance selection + CRUD
  selectInstance: (selectedInstanceId: string | null) => void;
  updateInstance: (id: string, patch: Partial<BuilderState["pages"]["items"][number]["instances"][number]>) => void;
  deleteInstance: (id: string) => void;
  duplicateInstance: (id: string) => void;
  createInstance: (instance: BuilderState["pages"]["items"][number]["instances"][number]) => void;
}




const BuilderContext = createContext<BuilderContextValue | null>(null);

interface BuilderProviderProps {
  children: ReactNode;
  initialState?: BuilderState;
}

export function BuilderProvider({
  children,
  initialState,
}: BuilderProviderProps) {
  const [state, setBuilderState] = useState<BuilderState>(
    initialState ?? createInitialBuilderState(),
  );

  const updateBuilderState = useCallback((update: Partial<BuilderState>) => {
    setBuilderState((current) => ({ ...current, ...update }));
  }, []);

  const updateUi = useCallback((update: Partial<BuilderState["ui"]>) => {
    setBuilderState((current) => ({
      ...current,
      ui: { ...current.ui, ...update },
    }));
  }, []);

  const value = useMemo<BuilderContextValue>(
    () => ({
      state,
      setBuilderState,
      updateBuilderState,
      updateUi,
      setActiveWorkspace: (workspace: WorkspaceKey) =>
        updateUi({ activeWorkspace: workspace }),



      selectPage: (selectedPageId) => updateUi({ selectedPageId }),
      selectEntity: (selectedEntityId) => updateUi({ selectedEntityId }),
      selectWorkflow: (selectedWorkflowId) =>
        updateUi({ selectedWorkflowId }),
      selectIntegration: (selectedIntegrationId) =>
        updateUi({ selectedIntegrationId }),

      // Stage 7: component selection
      selectComponent: (selectedComponentId) =>
        updateUi({ selectedComponentId }),

      // Stage 8
      selectInstance: (selectedInstanceId) =>
        updateUi({ selectedInstanceId }),

      updateInstance: (id, patch) => {
        setBuilderState((current) => {
          const selectedPageId = current.ui.selectedPageId;
          if (!selectedPageId) return current;

          return {
            ...current,
            pages: {
              ...current.pages,
              items: current.pages.items.map((p) => {
                if (p.id !== selectedPageId) return p;

                return {
                  ...p,
                  instances: p.instances.map((inst) =>
                    inst.id === id ? { ...inst, ...patch } : inst,
                  ),
                };
              }),
            },
          };
        });
      },

      deleteInstance: (id) => {
        setBuilderState((current) => {
          const selectedPageId = current.ui.selectedPageId;
          if (!selectedPageId) return current;

          return {
            ...current,
            pages: {
              ...current.pages,
              items: current.pages.items.map((p) => {
                if (p.id !== selectedPageId) return p;
                return { ...p, instances: p.instances.filter((x) => x.id !== id) };
              }),
            },
            ui: {
              ...current.ui,
              selectedInstanceId:
                current.ui.selectedInstanceId === id ? null : current.ui.selectedInstanceId,
            },
          };
        });
      },

      duplicateInstance: (id) => {
        setBuilderState((current) => {
          const selectedPageId = current.ui.selectedPageId;
          if (!selectedPageId) return current;

          const page = current.pages.items.find((p) => p.id === selectedPageId);
          const original = page?.instances.find((x) => x.id === id);
          if (!page || !original) return current;

          const copy = { ...original, id: crypto.randomUUID() };

          return {
            ...current,
            pages: {
              ...current.pages,
              items: current.pages.items.map((p) => {
                if (p.id !== selectedPageId) return p;
                return { ...p, instances: [...p.instances, copy] };
              }),
            },
            ui: { ...current.ui, selectedInstanceId: copy.id },
          };
        });
      },

      createInstance: (instance) => {
        setBuilderState((current) => {
          const selectedPageId = current.ui.selectedPageId;
          console.log("selectedPageId", selectedPageId);

          console.log(
            "instances before",
            current.pages.items.find((p) => p.id === selectedPageId)
              ?.instances.length,
          );

          if (!selectedPageId) return current;


          return {
            ...current,
            pages: {
              ...current.pages,
              items: current.pages.items.map((p) => {
                if (p.id !== selectedPageId) return p;
                return { ...p, instances: [...p.instances, instance] };
              }),
            },
            ui: { ...current.ui, selectedInstanceId: instance.id },
          };
        });
      },
    }),

    [state, updateBuilderState, updateUi],

  );


  return (
    <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);

  if (!context) {
    throw new Error("useBuilder must be used within a BuilderProvider.");
  }

  return context;
}
