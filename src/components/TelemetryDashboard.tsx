"use client";

import React, { useState } from "react";
import { LifeSphere } from "./LifeSphere";
import { AutonomousAgentChat } from "./AutonomousAgentChat";
import { ApexStore } from "@/lib/storage";
import { LifeDomain } from "@/lib/types";
import {
  Moon,
  Activity,
  PiggyBank,
  Brain,
  CheckCircle2,
  Sparkles,
  HeartPulse,
  Flame,
  Plus,
  ArrowRight,
  Shirt,
  User,
} from "lucide-react";

interface TelemetryDashboardProps {
  store: ApexStore;
  onNavigateTab: (tab: string) => void;
  onUpdateStore: (updater: (prev: ApexStore) => ApexStore) => void;
  onOpenProfileModal: () => void;
  isAgentThinking: boolean;
  onAgentThinkingChange: (thinking: boolean) => void;
}

export const TelemetryDashboard: React.FC<TelemetryDashboardProps> = ({
  store,
  onNavigateTab,
  onUpdateStore,
  onOpenProfileModal,
  isAgentThinking,
  onAgentThinkingChange,
}) => {
  const [selectedDomain, setSelectedDomain] = useState<LifeDomain | "all">("all");
  const [quickSleep, setQuickSleep] = useState("7.8");
  const [quickMood, setQuickMood] = useState("8");
  const [quickNote, setQuickNote] = useState("");

  const { user } = store;
  const latestLog = store.telemetryLogs[store.telemetryLogs.length - 1];

  const handleLogTelemetry = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog = {
      id: `tel-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      sleepHours: parseFloat(quickSleep) || 7.5,
      sleepScore: 90,
      workoutsDone: store.calisthenicsLogs.length > 0 ? 1 : 0,
      screenTimeHours: 3.8,
      productiveMinutes: 340,
      savingsRate: Math.round(((user.monthlyIncome - user.monthlyExpenses) / user.monthlyIncome) * 100),
      activeRecallReps: 15,
      moodScore: parseInt(quickMood) || 8,
      journalNote: quickNote || "Personal telemetry sync completed.",
    };

    onUpdateStore((prev) => ({
      ...prev,
      telemetryLogs: [...prev.telemetryLogs, newLog],
    }));

    setQuickNote("");
    alert("Real telemetry data point committed to local vault!");
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Real User Profile Banner */}
      <div className="p-6 rounded-3xl glass-panel border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold text-lg font-mono shadow-glow-cyan">
            {user.name ? user.name[0].toUpperCase() : "U"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">
                {user.name || "APEX Master Profile"}
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 uppercase">
                {user.bodyType} Build · {user.heightCm}cm / {user.weightKg}kg
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
              {user.primaryGoal}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenProfileModal}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono transition flex items-center gap-1.5 shrink-0"
        >
          <User className="w-3.5 h-3.5 text-cyan-400" />
          <span>Edit Real Profile</span>
        </button>
      </div>

      {/* 3D Life Sphere */}
      <section>
        <LifeSphere
          domainScores={store.domainScores}
          selectedDomain={selectedDomain}
          onSelectDomain={setSelectedDomain}
          isAgentThinking={isAgentThinking}
        />
      </section>

      {/* Autonomous AI Agent Command Center */}
      <section>
        <AutonomousAgentChat
          store={store}
          onUpdateStore={onUpdateStore}
          onSelectTab={onNavigateTab}
          onAgentThinkingChange={onAgentThinkingChange}
        />
      </section>

      {/* Real Telemetry Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Calisthenics Mastery */}
        <div
          onClick={() => onNavigateTab("body")}
          className="p-5 rounded-2xl glass-panel-interactive cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-rose-400">Step {store.currentPushStep}/6 Push</span>
          </div>
          <div className="text-xl font-bold font-mono text-white tracking-tight">
            {store.calisthenicsLogs.length} Workouts Done
          </div>
          <div className="text-xs text-slate-400 font-medium mt-0.5">Home Calisthenics Logs</div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Next Target</span>
            <span className="text-rose-400 font-semibold">Planche &amp; Pistol Squat</span>
          </div>
        </div>

        {/* Style Capsule Completion */}
        <div
          onClick={() => onNavigateTab("style")}
          className="p-5 rounded-2xl glass-panel-interactive cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Shirt className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-amber-400">{user.skinTone}</span>
          </div>
          <div className="text-xl font-bold font-mono text-white tracking-tight">
            {store.styleProfile.generatedCapsule.filter((x) => x.acquired).length} /{" "}
            {store.styleProfile.generatedCapsule.length} Pieces
          </div>
          <div className="text-xs text-slate-400 font-medium mt-0.5">Zero-Wardrobe Progress</div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Color Profile</span>
            <span className="text-amber-300 font-semibold truncate max-w-[120px]">
              {store.styleProfile.seasonPalette.split("/")[0]}
            </span>
          </div>
        </div>

        {/* Wealth & Savings Rate */}
        <div
          onClick={() => onNavigateTab("finance")}
          className="p-5 rounded-2xl glass-panel-interactive cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <PiggyBank className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-emerald-400">
              {Math.round(((user.monthlyIncome - user.monthlyExpenses) / user.monthlyIncome) * 100)}% Rate
            </span>
          </div>
          <div className="text-xl font-bold font-mono text-white tracking-tight">
            ${(user.monthlyIncome - user.monthlyExpenses).toLocaleString()}/mo
          </div>
          <div className="text-xs text-slate-400 font-medium mt-0.5">Net Free Cashflow</div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Allocation</span>
            <span className="text-emerald-300 font-semibold">110-Age Glide Path</span>
          </div>
        </div>

        {/* Spaced Repetition Flashcards */}
        <div
          onClick={() => onNavigateTab("learning")}
          className="p-5 rounded-2xl glass-panel-interactive cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <Brain className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-cyan-400">SM-2 Interval</span>
          </div>
          <div className="text-xl font-bold font-mono text-white tracking-tight">
            {store.flashcards.length} Cards Active
          </div>
          <div className="text-xs text-slate-400 font-medium mt-0.5">Active Recall Deck</div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Repetition</span>
            <span className="text-violet-300 font-semibold">SuperMemo Core</span>
          </div>
        </div>
      </section>
    </div>
  );
};
