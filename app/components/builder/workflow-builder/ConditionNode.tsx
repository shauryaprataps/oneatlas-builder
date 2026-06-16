import type { WorkflowNode } from "../types";

export function ConditionNode({ node }: { node: WorkflowNode }) {
  return (
    <div className="w-52 rounded-xl border border-amber-200 bg-white p-3 shadow-sm">
      <span className="text-xs font-semibold uppercase tracking-wide text-amber-600">Condition</span>
      <p className="mt-1 text-sm font-semibold text-gray-900">{node.title}</p>
      {node.description && <p className="text-xs text-gray-500">{node.description}</p>}
    </div>
  );
}
