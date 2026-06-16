import type { Entity, ResourceStatus } from "../types";

interface EntityListProps {
  entities: Entity[];
  selectedEntityId: string | null;
  status: ResourceStatus;
  onSelectEntity: (entityId: string) => void;
}

export function EntityList({
  entities,
  selectedEntityId,
  status,
  onSelectEntity,
}: EntityListProps) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Entities</p>
        <button className="text-lg leading-none text-orange-500">+</button>
      </div>
      {status === "loading" ? (
        <div className="space-y-2">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-9 animate-pulse rounded-lg bg-gray-200/70" />
          ))}
        </div>
      ) : entities.length > 0 ? (
        entities.map((entity) => (
          <button
            key={entity.id}
            className={`mb-1 w-full rounded-lg px-3 py-2 text-left text-sm ${
              entity.id === selectedEntityId
                ? "bg-white font-medium text-gray-900 shadow-sm"
                : "text-gray-600"
            }`}
            onClick={() => onSelectEntity(entity.id)}
          >
            {entity.name}
          </button>
        ))
      ) : (
        <p className="px-2 py-8 text-center text-xs text-gray-400">
          No entities yet
        </p>
      )}
    </div>
  );
}
