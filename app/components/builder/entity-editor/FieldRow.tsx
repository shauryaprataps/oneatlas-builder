import type { EntityField } from "../types";

interface FieldRowProps {
  field: EntityField;
}

export function FieldRow({ field }: FieldRowProps) {
  return (
    <div className="grid grid-cols-[1fr_9rem_auto] items-center gap-3 rounded-xl border border-gray-200 p-3">
      <span className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-800">
        {field.name}
      </span>
      <span className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600">
        {field.type}
      </span>
      <span className="text-xs font-medium text-gray-400">
        {field.required ? "Required" : "Optional"}
      </span>
    </div>
  );
}
