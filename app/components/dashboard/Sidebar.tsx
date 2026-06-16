"use client";

import { FolderOpen, Hammer, LayoutGrid, LayoutTemplate } from "lucide-react";

interface SidebarProps {
  active: string;
  setActive: (page: string) => void;
}

export default function Sidebar({
  active,
  setActive,
}: SidebarProps) {
  const topItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutGrid,
    },
    {
      id: "projects",
      label: "My Projects",
      icon: FolderOpen,
    },
    {
      id: "templates",
      label: "Templates",
      icon: LayoutTemplate,
    },
    {
      id: "builder",
      label: "Builder",
      icon: Hammer,
    },
  ];

  return (
    <aside className="w-[280px] min-h-screen bg-[#F5F5EE] border-r border-[#E5E7EB] flex flex-col">
      {/* Logo */}
      <div className="h-22 px-8 flex items-center border-b border-[#E5E7EB]" />

      {/* Main Navigation */}
      <div className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {topItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                  active === item.id
                    ? "bg-white text-[#111111] shadow-sm"
                    : "text-[#6B7280] hover:bg-white/60"
                }`}
              >
                <Icon size={18} />
                <span className="text-[15px] font-medium">{item.label}</span>
                {active === item.id && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-[#FF6600]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

