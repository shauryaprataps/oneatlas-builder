"use client";

import { Bell, Search, Settings, User, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
export default function Header() {
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
const dropdownRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenProfileMenu(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () =>
    document.removeEventListener("mousedown", handleClickOutside);
}, []);
  return (
    <header className="sticky top-0 z-20 h-20 bg-[#F5F5EE]/90 backdrop-blur-sm border-b border-[#E5E7EB]">
      <div className="h-full px-8 flex items-center justify-between">
        {/* Search */}
        <div className="relative w-[520px]">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
          />

          <input
            type="text"
            placeholder="Search projects..."
            className="
              w-full
              h-12
              pl-11
              pr-4
              rounded-full
              bg-white
              border
              border-[#E5E7EB]
              outline-none
              text-[15px]
              placeholder:text-[#9CA3AF]
              focus:border-[#FF6600]
              transition-all
            "
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          <button
            className="
              w-10
              h-10
              rounded-full
              hover:bg-white
              flex
              items-center
              justify-center
              transition-all
            "
          >
            <Bell size={20} className="text-[#6B7280]" />
          </button>

          <div className="relative" ref={dropdownRef}>
  <button
    onClick={() => setOpenProfileMenu((prev) => !prev)}
    className="
      w-11
      h-11
      rounded-full
      bg-[#FF6600]
      text-white
      flex
      items-center
      justify-center
      font-semibold
      hover:bg-[#E65C00]
      transition-colors
    "
  >
    S
  </button>

  {openProfileMenu && (
    <div
      className="
        absolute
        right-0
        top-14
        w-64
        bg-white
        border
        border-[#E5E7EB]
        rounded-2xl
        shadow-xl
        overflow-hidden
        z-50
      "
    >
      {/* User Info */}
      <div className="px-5 py-4 border-b border-[#E5E7EB]">
        <p className="text-[15px] font-semibold text-[#111111]">
          Shaurya
        </p>

        <p className="text-sm text-[#6B7280]">
          Pro Plan
        </p>
      </div>

      {/* Profile */}
      <button
        className="
          w-full
          flex
          items-center
          gap-3
          px-5
          py-3
          text-left
          text-[#111111]
          hover:bg-[#FAFAF8]
          transition-colors
        "
      >
        <User size={16} />
        Profile
      </button>

      {/* Settings */}
      <button
        className="
          w-full
          flex
          items-center
          gap-3
          px-5
          py-3
          text-left
          text-[#111111]
          hover:bg-[#FAFAF8]
          transition-colors
        "
      >
        <Settings size={16} />
        Settings
      </button>

      <div className="border-t border-[#E5E7EB]" />

      {/* Logout */}
      <button
        className="
          w-full
          flex
          items-center
          gap-3
          px-5
          py-3
          text-left
          text-red-500
          hover:bg-[#FAFAF8]
          transition-colors
        "
      >
        <LogOut size={16} />
        Sign Out
      </button>
    </div>
  )}
</div>
        </div>
      </div>
    </header>
  );
}