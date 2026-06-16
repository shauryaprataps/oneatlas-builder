"use client";

import { Workflow as WorkflowIcon } from "lucide-react";
import { EmptyState } from "../shared/EmptyState";
import { ErrorState } from "../shared/ErrorState";
import { useBuilder } from "../store/BuilderContext";
import { ActionNode } from "./ActionNode";
import { ConditionNode } from "./ConditionNode";
import { EdgeConnector } from "./EdgeConnector";
import { NodeCanvas } from "./NodeCanvas";
import { TriggerNode } from "./TriggerNode";

export function WorkflowBuilder() {
  const { state } = useBuilder();
  const workflow =
    state.workflows.items.find(
      (item) => item.id === state.ui.selectedWorkflowId,
    ) ?? null;
  const isLoading =
    state.status === "loading" || state.workflows.status === "loading";

  if (state.workflows.status === "error") {
    return (
      <section className="rounded-2xl border border-gray-200 bg-white">
        <ErrorState
          title="Workflows unavailable"
          message={state.workflows.error ?? "Invalid response."}
          onRetry={() => undefined}
        />
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            {workflow?.name ?? "Workflows"}
          </h2>
          <p className="text-sm text-gray-500">
            Connect triggers, conditions, and actions.
          </p>
        </div>
        <button className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">
          Add node
        </button>
      </div>
      <NodeCanvas>
        {isLoading ? (
          <div className="h-64 w-52 animate-pulse rounded-xl bg-gray-200" />
        ) : workflow ? (
          workflow.nodes.map((node, index) => (
            <div key={node.id} className="contents">
              {index > 0 && <EdgeConnector />}
              {node.type === "trigger" && <TriggerNode node={node} />}
              {node.type === "condition" && <ConditionNode node={node} />}
              {node.type === "action" && <ActionNode node={node} />}
            </div>
          ))
        ) : (
          <EmptyState
            description="Workflow definitions returned by the generation service will appear here."
            icon={WorkflowIcon}
            title="No workflows yet"
          />
        )}
      </NodeCanvas>
    </section>
  );
}
