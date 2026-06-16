import type { Entity } from "../types";

interface SchemaPreviewProps {
  entity: Entity;
}

export function SchemaPreview({ entity }: SchemaPreviewProps) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-gray-950 p-4 text-xs leading-5 text-gray-200">
      <code>{JSON.stringify(entity, null, 2)}</code>
    </pre>
  );
}
