"use client";

import { Boxes } from "lucide-react";
import { useBuilder } from "../store/BuilderContext";
import { PreviewButton } from "./PreviewButton";
import { PublishButton } from "./PublishButton";

export function BuilderToolbar() {
  const { state, updateBuilderState } = useBuilder();
  const projectName = state.project.name;

  function updateProjectName(name: string) {
    updateBuilderState({
      project: {
        ...state.project,
        name,
      },
    });
  }

  return (
    <header className="sticky top-0 z-30 grid h-16 shrink-0 grid-cols-[1fr_auto] items-center border-b border-gray-200 bg-white px-4 sm:grid-cols-3 sm:px-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm shadow-orange-200">
          <Boxes className="h-5 w-5" strokeWidth={2.25} />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold tracking-tight text-gray-950">OneAtlas</p>
          <p className="text-[11px] font-medium text-gray-400">Builder</p>
        </div>
      </div>

      <div className="hidden min-w-0 max-w-64 justify-self-center text-center sm:block">
        <input
          aria-label="Project title"
          className="w-full rounded-md border border-transparent bg-transparent px-2 py-0.5 text-center text-sm font-semibold text-gray-900 outline-none transition hover:border-gray-200 hover:bg-gray-50 focus:border-orange-300 focus:bg-white focus:ring-2 focus:ring-orange-100"
          onChange={(event) => updateProjectName(event.target.value)}
          onBlur={() => {
            if (!projectName.trim()) updateProjectName("Untitled Project");
          }}
          value={projectName}
        />
        <p className="text-[11px] capitalize text-gray-400">
          {state.project.status} saved
        </p>
      </div>

      <div className="flex items-center gap-2 justify-self-end">
        <PreviewButton />
        <PublishButton />
      </div>
    </header>
  );
}
