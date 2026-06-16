"use client";

import type { ComponentDefinition } from "../types";
import { ComponentItem } from "./ComponentItem";

export function ComponentCategory({
  title,
  components,
  activeComponentId,
  onSelect,
}: {
  title: string;
  components: ComponentDefinition[];
  activeComponentId: string | null;
  onSelect: (componentId: string) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="px-1 text-[11px] font-bold uppercase tracking-wide text-gray-500">
        {title}
      </div>
      <div className="space-y-1">
        {components.map((component) => (
          <ComponentItem
            key={component.id}
            component={component}
            active={component.id === activeComponentId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

