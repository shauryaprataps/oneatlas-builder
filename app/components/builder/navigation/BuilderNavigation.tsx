"use client";

import {
  Boxes,
  Database,
  LayoutTemplate,
  Plug,
  Settings,
  Workflow,
} from "lucide-react";
import { useMemo } from "react";
import { useBuilder } from "../store/BuilderContext";
import type { WorkspaceKey } from "./WorkspaceItem";
import { WorkspaceItem } from "./WorkspaceItem";

const items: Array<{
  id: WorkspaceKey;
  label: string;
  icon: typeof LayoutTemplate | typeof Boxes | typeof Database | typeof Workflow | typeof Plug | typeof Settings;
}> = [
  { id: "design", label: "Design", icon: LayoutTemplate },
  { id: "data", label: "Data", icon: Database },
  { id: "workflows", label: "Workflows", icon: Workflow },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "settings", label: "Settings", icon: Settings },
];

export function BuilderNavigation() {
  const { state, setActiveWorkspace } = useBuilder();

  const active = state.ui.activeWorkspace;

  const navItems = useMemo(() => items, []);

  return (
    <aside className="hidden h-full w-[220px] shrink-0 flex-col border-r border-gray-200 bg-white lg:flex">
      <div className="p-3">
        <div className="mb-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
          <p className="text-xs font-semibold text-gray-700">Workspace</p>
        </div>

        <div className="space-y-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <WorkspaceItem
              key={id}
              id={id}
              label={label}
              icon={Icon}
              active={id === active}
              onSelect={setActiveWorkspace}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

