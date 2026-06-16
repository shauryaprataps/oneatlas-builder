"use client";

import type { ComponentDefinition } from "../types";

export function ComponentItem({
  component,
  active,
  onSelect,
}: {
  component: ComponentDefinition;
  active: boolean;
  onSelect: (componentId: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(component.id)}
      draggable
      onDragStart={(e) => {
        console.log("DRAG START", {
          componentId: component.id,
          type: component.type,
        });
        e.dataTransfer.effectAllowed = "copy";
        e.dataTransfer.setData("application/x-component-definition", JSON.stringify({
          componentId: component.id,
          type: component.type,
        }));
      }}

      className={`w-full min-w-0 rounded-xl border px-3 py-2 text-left transition ${
        active
          ? "border-orange-300 bg-orange-50"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
      aria-pressed={active}
    >
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-gray-900">
          {component.name}
        </div>
        <div className="mt-0.5 text-[11px] font-medium text-gray-500">
          {component.type}
        </div>
      </div>
    </button>
  );
}

