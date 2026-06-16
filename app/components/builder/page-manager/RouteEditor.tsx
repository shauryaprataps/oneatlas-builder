import type { Page } from "../types";

export function RouteEditor({ page }: { page: Page | null }) {
  if (!page) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-gray-400">
        Select a page to edit its route.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold text-gray-900">Route settings</h2>
        <p className="text-sm text-gray-500">Configure the selected page route.</p>
      </div>
      <label className="block text-sm font-medium text-gray-700">
        Page path
        <input className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-gray-900" readOnly value={page.slug} />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Page title
        <input className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-gray-900" readOnly value={page.name} />
      </label>
    </div>
  );
}
