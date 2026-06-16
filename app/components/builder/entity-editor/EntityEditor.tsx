"use client";

import { Database } from "lucide-react";
import { EmptyState } from "../shared/EmptyState";
import { ErrorState } from "../shared/ErrorState";
import { useBuilder } from "../store/BuilderContext";
import { EntityList } from "./EntityList";
import { FieldRow } from "./FieldRow";
import { RelationEditor } from "./RelationEditor";
import { SchemaPreview } from "./SchemaPreview";

export function EntityEditor() {
  const { state, selectEntity } = useBuilder();
  const selectedEntity =
    state.entities.items.find(
      (entity) => entity.id === state.ui.selectedEntityId,
    ) ?? null;
  const isLoading =
    state.status === "loading" || state.entities.status === "loading";

  if (state.entities.status === "error") {
    return (
      <section className="rounded-2xl border border-gray-200 bg-white">
        <ErrorState
          title="Entities unavailable"
          message={state.entities.error ?? "Invalid response."}
          onRetry={() => undefined}
        />
      </section>
    );
  }

  return (
    <section className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-4 lg:grid-cols-[14rem_1fr]">
      <EntityList
        entities={state.entities.items}
        selectedEntityId={state.ui.selectedEntityId}
        status={isLoading ? "loading" : state.entities.status}
        onSelectEntity={selectEntity}
      />
      {isLoading ? (
        <EntitySkeleton />
      ) : selectedEntity ? (
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              {selectedEntity.name}
            </h2>
            <p className="text-sm text-gray-500">
              Configure fields and relationships.
            </p>
          </div>
          {selectedEntity.fields.map((field) => (
            <FieldRow key={field.id} field={field} />
          ))}
          <RelationEditor
            entities={state.entities.items}
            relations={selectedEntity.relations}
          />
          <SchemaPreview entity={selectedEntity} />
        </div>
      ) : (
        <EmptyState
          description="Entity schemas returned by the generation service will appear here."
          icon={Database}
          title="No entities yet"
        />
      )}
    </section>
  );
}

function EntitySkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 w-40 rounded bg-gray-100" />
      {[0, 1, 2].map((item) => (
        <div key={item} className="h-16 rounded-xl bg-gray-100" />
      ))}
      <div className="h-40 rounded-xl bg-gray-100" />
    </div>
  );
}
