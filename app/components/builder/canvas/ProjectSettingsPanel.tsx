"use client";

import { useBuilder } from "../store/BuilderContext";

export function ProjectSettingsPanel() {
  const { state, updateBuilderState } = useBuilder();

  const projectName = state.project.name;
  const description = state.project.description ?? "";

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900">
          Project settings
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage workspace metadata.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-700">
            Project Name
          </label>
          <input
            aria-label="Project Name"
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
            value={projectName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateBuilderState({
                project: { ...state.project, name: e.target.value },
              })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-700">
            Description
          </label>
          <input
            aria-label="Description"
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateBuilderState({
                project: {
                  ...state.project,
                  description: e.target.value,
                },
              })
            }
          />
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-700">
            Environment
          </label>
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
            production
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-700">
            Created At
          </label>
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
            —
          </div>
        </div>
      </div>
    </section>
  );
}

