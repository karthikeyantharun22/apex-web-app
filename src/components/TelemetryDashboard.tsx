"use client";

import React, { useState } from "react";
import { LifeSphere } from "./LifeSphere";
import { ApexStore } from "@/lib/storage";
import { LifeDomain } from "@/lib/types";
import {
  Moon,
  Dumbbell,
  Clock,
  PiggyBank,
  Brain,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  HeartPulse,
  Flame,
  Plus,
} from "lucide-react";

interface TelemetryDashboardProps {
  store: ApexStore;
  onNavigateTab: (tab: string) => void;
  onUpdateStore: (updater: (prev: ApexStore) => ApexStore) => void;
}

export const TelemetryDashboard: React.FC<TelemetryDashboardProps> = ({
  store,
  onNavigateTab,
  onUpdateStore,
}) => {
  const [selectedDomain, setSelectedDomain] = useState<LifeDomain | "all">("all");
  const [newLogNote, setNewLogNote] = useState("");
  const [newLogSleep, setNewLogSleep] = useState("7.8");
  const [newLogMood, setNewLogMood] = useState("8");

  const latestLog = store.telemetryLogs[store.telemetryLogs.length - 1];

  const handleAddQuickLog = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];
    const newLog = {
      date: today,
      sleepHours: parseFloat(newLogSleep) || 8.0,
      sleepScore: 90,
      workoutsDone: 1,
      screenTimeHours: 3.8,
      productiveMinutes: 340,
      savingsRate: 47,
      activeRecallReps: 25,
      moodScore: parseInt(newLogMood) || 8,
      journalNote: newLogNote || "Quick daily check-in completed.",
    };

    onUpdateStore((prev) => ({
      ...prev,
      telemetryLogs: [...prev.telemetryLogs, newLog],
      user: {
        ...prev.user,
        streakDays: prev.user.streakDays + 1,
      },
    }));
    setNewLogNote("");
    alert("Telemetry check-in logged! Streak updated.");
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 3D Life Sphere Hero Section */}
      <section>
        <LifeSphere
          domainScores={store.domainScores}
          selectedDomain={selectedDomain}
          onSelectDomain={setSelectedDomain}
        />
      </section>

      {/* Primary Telemetry Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sleep & Circadian Recovery */}
        <div
          onClick={() => onNavigateTab("body")}
          className="p-5 rounded-2xl glass-panel-interactive cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Moon className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-emerald-400 flex items-center">
              +4% vs avg <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight">
            {latestLog?.sleepHours || 8.0}h
          </div>
          <div className="text-xs text-slate-400 font-medium mt-0.5">Sleep & Recovery</div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Efficiency</span>
            <span className="text-cyan-300 font-semibold">{latestLog?.sleepScore || 92}% (Optimal)</span>
          </div>
        </div>

        {/* Strength & Training Volume */}
        <div
          onClick={() => onNavigateTab("body")}
          className="p-5 rounded-2xl glass-panel-interactive cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Dumbbell className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-cyan-400">Microcycle 2</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight">
            14.2 sets/wk
          </div>
          <div className="text-xs text-slate-400 font-medium mt-0.5">Target Muscle Groups</div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Schoenfeld MEV/MRV</span>
            <span className="text-rose-400 font-semibold">Stimulative</span>
          </div>
        </div>

        {/* Liquid Wealth & Runway */}
        <div
          onClick={() => onNavigateTab("finance")}
          className="p-5 rounded-2xl glass-panel-interactive cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <PiggyBank className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-emerald-400">18.2 mo runway</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight">
            {latestLog?.savingsRate || 47}%
          </div>
          <div className="text-xs text-slate-400 font-medium mt-0.5">Automated Savings Rate</div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Framework</span>
            <span className="text-emerald-300 font-semibold">Boglehead 3-Fund</span>
          </div>
        </div>

        {/* Spaced Repetition Mastery */}
        <div
          onClick={() => onNavigateTab("learning")}
          className="p-5 rounded-2xl glass-panel-interactive cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <Brain className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-cyan-400">SM-2 Core</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight">
            {latestLog?.activeRecallReps || 28} reps
          </div>
          <div className="text-xs text-slate-400 font-medium mt-0.5">Active Recall Completed</div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Retention Index</span>
            <span className="text-violet-300 font-semibold">91% Long-Term</span>
          </div>
        </div>
      </section>

      {/* Daily Operating Protocol + Live Telemetry Feed */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Protocol Checklist */}
        <div className="lg:col-span-2 p-6 rounded-2xl glass-panel">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  Daily Execution Protocol
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Concrete actions derived from active advancement frameworks — not guesses.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md">
              4/4 Complete Today
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white">
                    Lower Body Hypertrophy Session
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Barbell Back Squat (140kg x 6 @ RPE 8) + RDL (120kg x 8).
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                NSCA Progression
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white">
                    Spaced Repetition Flashcard Queue
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    28 active recall cards reviewed across Distributed Systems and Biomechanics.
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-mono text-violet-400 bg-violet-950/60 px-2 py-0.5 rounded border border-violet-500/30">
                SuperMemo SM-2
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white">
                    Investor Term Sheet Follow-up (Tone Polished)
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Draft rewritten to strip needy hedges and set firm Friday 4 PM syndicate deadline.
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                Munter / Voss
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white">
                    Nutritional Adherence & Protein Threshold
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    2,350 kcal logged; 175g protein (2.2g/kg LBM threshold satisfied).
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                Helms et al.
              </span>
            </div>
          </div>
        </div>

        {/* Quick Telemetry Logger Panel */}
        <div className="p-6 rounded-2xl glass-panel flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HeartPulse className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-bold text-white tracking-tight">Quick Check-in</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Log daily biometric & qualitative metrics into your local encrypted vault.
            </p>

            <form onSubmit={handleAddQuickLog} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                    Sleep (Hours)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={newLogSleep}
                    onChange={(e) => setNewLogSleep(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm text-white font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                    Energy / Mood (1-10)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newLogMood}
                    onChange={(e) => setNewLogMood(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm text-white font-mono focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Journal / Sentiment Note
                </label>
                <textarea
                  rows={3}
                  value={newLogNote}
                  onChange={(e) => setNewLogNote(e.target.value)}
                  placeholder="Record physiological signals, mental friction, or key breakthrough..."
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-glow-cyan flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Save to Vault</span>
              </button>
            </form>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
            <span>Storage: SQLite/Local AES</span>
            <span className="text-emerald-400">● Synced</span>
          </div>
        </div>
      </section>

      {/* Telemetry Trend History */}
      <section className="p-6 rounded-2xl glass-panel">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Recent Log History</h3>
            <p className="text-xs text-slate-400">
              Audit trail of daily physiological and productivity markers.
            </p>
          </div>
          <div className="text-xs font-mono text-cyan-400">
            {store.telemetryLogs.length} total entries
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                <th className="pb-3">Date</th>
                <th className="pb-3">Sleep (hrs)</th>
                <th className="pb-3">Efficiency</th>
                <th className="pb-3">Workouts</th>
                <th className="pb-3">Screen Time</th>
                <th className="pb-3">Productive Mins</th>
                <th className="pb-3">Recall Reps</th>
                <th className="pb-3">Mood</th>
                <th className="pb-3">Qualitative Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {store.telemetryLogs.slice(-5).reverse().map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="py-3 font-mono text-cyan-300 font-semibold">{log.date}</td>
                  <td className="py-3 font-mono text-white">{log.sleepHours}h</td>
                  <td className="py-3 font-mono text-emerald-400">{log.sleepScore}%</td>
                  <td className="py-3 font-mono text-slate-300">{log.workoutsDone}</td>
                  <td className="py-3 font-mono text-slate-300">{log.screenTimeHours}h</td>
                  <td className="py-3 font-mono text-slate-300">{log.productiveMinutes}m</td>
                  <td className="py-3 font-mono text-violet-300">{log.activeRecallReps}</td>
                  <td className="py-3 font-mono text-amber-300">{log.moodScore}/10</td>
                  <td className="py-3 text-slate-400 max-w-xs truncate">{log.journalNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
