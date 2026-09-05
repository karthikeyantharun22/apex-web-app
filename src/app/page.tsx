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
import { UserProfileModal } from "@/components/UserProfileModal";
import {
  ApexStore,
  loadApexStore,
  saveApexStore,
  resetApexStore,
  exportApexBackup,
  getInitialCleanStore,
} from "@/lib/storage";
import { UserProfile } from "@/lib/types";
import { generateFoundationalWardrobe } from "@/lib/styleEngine";

export default function Home() {
  const [store, setStore] = useState<ApexStore | null>(null);
  const [activeTab, setActiveTab] = useState<string>("telemetry");
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isAgentThinking, setIsAgentThinking] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const loaded = loadApexStore();
    setStore(loaded);
    setMounted(true);
    if (!loaded.user.isInitialized) {
      setIsProfileModalOpen(true);
    }
  }, []);

  const handleUpdateStore = (updater: (prev: ApexStore) => ApexStore) => {
    setStore((prev) => {
      if (!prev) return prev;
      const next = updater(prev);
      saveApexStore(next);
      return next;
    });
  };

  const handleSaveProfile = (profile: UserProfile) => {
    const newStyle = generateFoundationalWardrobe(profile);
    handleUpdateStore((prev) => ({
      ...prev,
      user: profile,
      styleProfile: newStyle,
      domainScores: prev.domainScores.map((d) =>
        d.domain === "style"
          ? {
              ...d,
              framework: `${newStyle.seasonPalette} Capsule Matrix`,
              keyMetric: `${newStyle.seasonPalette} · 0/8 Acquired`,
            }
          : d
      ),
      chatMessages: [
        ...prev.chatMessages,
        {
          id: `msg-calib-${Date.now()}`,
          role: "assistant",
          agentName: "APEX Orchestrator",
          content: `⚡ **Profile Calibrated to Real User Data**: ${profile.name} (${profile.heightCm}cm, ${profile.weightKg}kg, ${profile.skinTone} undertone, Setup: ${profile.homeEquipment.join(", ")}). All AI calisthenics progressions and wardrobe recommendations have been rebuilt.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actionsTaken: ["Synthesized 8-piece foundational capsule", "Recalibrated bodyweight leverage ratios"],
        },
      ],
    }));
  };

  const handleExportData = () => {
    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(exportApexBackup());
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `apex-real-vault-${new Date().toISOString().split("T")[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetData = () => {
    resetApexStore();
    const clean = getInitialCleanStore();
    setStore(clean);
    setIsProfileModalOpen(true);
  };

  if (!mounted || !store) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07080b] text-cyan-400 font-mono text-sm">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Starting APEX Autonomous AI Operating System...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#07080b]">
      {/* Operating Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        streakDays={store.telemetryLogs.length + (store.user.isInitialized ? 1 : 0)}
        userName={store.user.name || "APEX Master"}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onExportData={handleExportData}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "telemetry" && (
          <TelemetryDashboard
            store={store}
            onNavigateTab={setActiveTab}
            onUpdateStore={handleUpdateStore}
            onOpenProfileModal={() => setIsProfileModalOpen(true)}
            isAgentThinking={isAgentThinking}
            onAgentThinkingChange={setIsAgentThinking}
          />
        )}
        {activeTab === "body" && (
          <BodyModule
            store={store}
            onUpdateStore={handleUpdateStore}
            onSelectAgent={() => {
              setActiveTab("telemetry");
            }}
          />
        )}
        {activeTab === "style" && (
          <StyleModule
            store={store}
            onUpdateStore={handleUpdateStore}
            onSelectAgent={() => {
              setActiveTab("telemetry");
            }}
          />
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

      {/* Real User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentProfile={store.user}
        onSaveProfile={handleSaveProfile}
      />

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateTab={setActiveTab}
        onExport={handleExportData}
        onReset={handleResetData}
      />

      {/* Footer */}
      <footer className="w-full border-t border-slate-900 bg-[#07080b]/90 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-2">
          <div>APEX Personal Advancement Operating System · Antigravity AI Core</div>
          <div className="flex items-center gap-4">
            <span className="text-cyan-400">● Multi-Agent Autonomous Council Active</span>
            <span>Local Vault: Zero Cloud Leaks</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
