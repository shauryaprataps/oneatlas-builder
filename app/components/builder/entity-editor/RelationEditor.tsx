import type { Entity, EntityRelation } from "../types";

interface RelationEditorProps {
  entities: Entity[];
  relations: EntityRelation[];
}

export function RelationEditor({
  entities,
  relations,
}: RelationEditorProps) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <p className="text-sm font-semibold text-gray-900">Relationships</p>
      {relations.length > 0 ? (
        <div className="mt-3 space-y-2">
          {relations.map((relation) => (
            <div key={relation.id} className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600">
              {relation.label ??
                `${relation.type} ${entities.find((entity) => entity.id === relation.targetEntityId)?.name ?? "entity"}`}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-sm text-gray-400">No relationships defined.</p>
      )}
    </div>
  );
}
