"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import AIPromptSection from "./AIPromptSection";
import ContinueBuilding from "./ContinueBuilding";
import RecentProjects from "./RecentProjects";
import Templates from "./Templates";


export default function DashboardLayout() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="min-h-screen flex bg-[#F5F5EE]">
      <Sidebar
        active={activePage}
        setActive={setActivePage}
      />

      <main className="flex-1">
        <Header />

        <div className="max-w-7xl mx-auto px-10 py-10">
          {activePage === "dashboard" && (
            <>
              <AIPromptSection />
              <ContinueBuilding />
              <RecentProjects />
            </>
          )}

          {activePage === "projects" && (
            <RecentProjects />
          )}

          {activePage === "templates" && (
            <Templates />
          )}

          {activePage === "settings" && (
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8">
              <h1 className="text-4xl font-bold">
                Settings
              </h1>
            </div>
          )}



          {activePage === "profile" && (
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8">
              <h1 className="text-4xl font-bold">
                Profile
              </h1>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}