"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { CommandPalette } from "@/components/CommandPalette";
import { TelemetryDashboard } from "@/components/TelemetryDashboard";
import { BodyModule } from "@/components/BodyModule";
import { StyleModule } from "@/components/StyleModule";
import { CommunicationModule } from "@/components/CommunicationModule";
import { FinanceModule } from "@/components/FinanceModule";
import { LearningModule } from "@/components/LearningModule";
import { AgentFactoryModule } from "@/components/AgentFactoryModule";
import { WeeklyRetroModule } from "@/components/WeeklyRetroModule";
import { DataSettingsModule } from "@/components/DataSettingsModule";
import {
  ApexStore,
  loadApexStore,
  saveApexStore,
  resetApexStore,
  exportApexBackup,
  INITIAL_DATA,
} from "@/lib/storage";

export default function Home() {
  const [store, setStore] = useState<ApexStore>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<string>("telemetry");
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const loaded = loadApexStore();
    setStore(loaded);
    setMounted(true);
  }, []);

  const handleUpdateStore = (updater: (prev: ApexStore) => ApexStore) => {
    setStore((prev) => {
      const next = updater(prev);
      saveApexStore(next);
      return next;
    });
  };

  const handleExportData = () => {
    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(exportApexBackup());
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `apex-vault-backup-${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetData = () => {
    resetApexStore();
    setStore(INITIAL_DATA);
    alert("APEX data store reset to baseline state.");
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07080b] text-cyan-400 font-mono text-sm">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Initializing APEX Enclave...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#07080b]">
      {/* Top Operating Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        streakDays={store.user.streakDays}
        userName={store.user.name}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onExportData={handleExportData}
      />

      {/* Main Workspace View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "telemetry" && (
          <TelemetryDashboard
            store={store}
            onNavigateTab={setActiveTab}
            onUpdateStore={handleUpdateStore}
          />
        )}
        {activeTab === "body" && (
          <BodyModule store={store} onUpdateStore={handleUpdateStore} />
        )}
        {activeTab === "style" && (
          <StyleModule store={store} onUpdateStore={handleUpdateStore} />
        )}
        {activeTab === "communication" && (
          <CommunicationModule store={store} onUpdateStore={handleUpdateStore} />
        )}
        {activeTab === "finance" && (
          <FinanceModule store={store} onUpdateStore={handleUpdateStore} />
        )}
        {activeTab === "learning" && (
          <LearningModule store={store} onUpdateStore={handleUpdateStore} />
        )}
        {activeTab === "agents" && (
          <AgentFactoryModule store={store} onUpdateStore={handleUpdateStore} />
        )}
        {activeTab === "retro" && (
          <WeeklyRetroModule store={store} onUpdateStore={handleUpdateStore} />
        )}
        {activeTab === "settings" && (
          <DataSettingsModule
            store={store}
            onUpdateStore={handleUpdateStore}
            onExport={handleExportData}
            onReset={handleResetData}
          />
        )}
      </main>

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateTab={setActiveTab}
        onExport={handleExportData}
        onReset={handleResetData}
      />

      {/* Footer System Status */}
      <footer className="w-full border-t border-slate-900 bg-[#07080b]/90 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-2">
          <div>APEX Personal Advancement Operating System · Antigravity Core</div>
          <div className="flex items-center gap-4">
            <span className="text-cyan-400">● Core Telemetry Active</span>
            <span>Local Enclave: Protected</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
