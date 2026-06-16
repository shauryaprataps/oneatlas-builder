import type { WorkflowNode } from "../types";

export function TriggerNode({ node }: { node: WorkflowNode }) {
  return (
    <div className="w-52 rounded-xl border border-orange-200 bg-white p-3 shadow-sm">
      <span className="text-xs font-semibold uppercase tracking-wide text-orange-600">Trigger</span>
      <p className="mt-1 text-sm font-semibold text-gray-900">{node.title}</p>
      {node.description && <p className="text-xs text-gray-500">{node.description}</p>}
    </div>
  );
}
