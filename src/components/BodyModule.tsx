"use client";

import React, { useState } from "react";
import { ApexStore } from "@/lib/storage";
import { CALISTHENICS_PROGRESSION_TREE } from "@/lib/calisthenics";
import { CalisthenicsWorkoutLog } from "@/lib/types";
import {
  Activity,
  ShieldCheck,
  Plus,
  Flame,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Zap,
} from "lucide-react";

interface BodyModuleProps {
  store: ApexStore;
  onUpdateStore: (updater: (prev: ApexStore) => ApexStore) => void;
  onSelectAgent: (agentId: string) => void;
}

export const BodyModule: React.FC<BodyModuleProps> = ({ store, onUpdateStore, onSelectAgent }) => {
  const [selectedCategory, setSelectedCategory] = useState<"Push" | "Pull" | "Legs" | "Core">("Push");
  
  // Quick Log State
  const [logExercise, setLogExercise] = useState("Standard Floor Push-Up");
  const [logSets, setLogSets] = useState("4");
  const [logReps, setLogReps] = useState("10");
  const [logRpe, setLogRpe] = useState("8.0");
  const [logNotes, setLogNotes] = useState("");

  const categories: ("Push" | "Pull" | "Legs" | "Core")[] = ["Push", "Pull", "Legs", "Core"];

  const currentStepForCat =
    selectedCategory === "Push"
      ? store.currentPushStep
      : selectedCategory === "Pull"
      ? store.currentPullStep
      : selectedCategory === "Legs"
      ? store.currentLegStep
      : store.currentCoreStep;

  const filteredTree = CALISTHENICS_PROGRESSION_TREE.filter(
    (ex) => ex.category === selectedCategory
  );

  const handleLogCalisthenics = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: CalisthenicsWorkoutLog = {
      id: `cal-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      exerciseName: logExercise,
      category: selectedCategory,
      sets: parseInt(logSets) || 3,
      reps: parseInt(logReps) || 10,
      difficultyRating: parseFloat(logRpe) || 8.0,
      notes: logNotes || "Solid strict form with lockout.",
    };

    onUpdateStore((prev) => ({
      ...prev,
      calisthenicsLogs: [newLog, ...prev.calisthenicsLogs],
      domainScores: prev.domainScores.map((d) =>
        d.domain === "body"
          ? { ...d, score: Math.min(100, d.score + 2), trend: d.trend + 1.5 }
          : d
      ),
    }));

    setLogNotes("");
    alert("Home Calisthenics session recorded in your encrypted ledger!");
  };

  const handleAdvanceProgression = (category: "Push" | "Pull" | "Legs" | "Core") => {
    onUpdateStore((prev) => {
      if (category === "Push") return { ...prev, currentPushStep: Math.min(6, prev.currentPushStep + 1) };
      if (category === "Pull") return { ...prev, currentPullStep: Math.min(6, prev.currentPullStep + 1) };
      if (category === "Legs") return { ...prev, currentLegStep: Math.min(5, prev.currentLegStep + 1) };
      return { ...prev, currentCoreStep: Math.min(5, prev.currentCoreStep + 1) };
    });
    alert(`Level unlocked for ${category}! Your progression step has been advanced.`);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border-rose-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Activity className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Home Calisthenics & Relative Strength Engine
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            100% Bodyweight & Gymnastics Progression Tree adapted to your setup ({store.user.homeEquipment.join(", ")}).
          </p>
        </div>

        <button
          onClick={() => onSelectAgent("agent-calisthenics")}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Consult Calisthenics AI</span>
        </button>
      </div>

      {/* Progression Tree Tabs & Visualization */}
      <div className="p-6 rounded-3xl glass-panel space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Movement Pattern Hierarchy</h3>
            <p className="text-xs text-slate-400">
              Select movement chain to review unlock status and joint conditioning milestones.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  const defaultEx = CALISTHENICS_PROGRESSION_TREE.find((x) => x.category === cat);
                  if (defaultEx) setLogExercise(defaultEx.name);
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono font-medium transition ${
                  selectedCategory === cat
                    ? "bg-rose-500 text-white font-bold shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Steps Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTree.map((ex) => {
            const isUnlocked = ex.progressionStep <= currentStepForCat;
            const isCurrent = ex.progressionStep === currentStepForCat;

            return (
              <div
                key={ex.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? "bg-rose-950/30 border-rose-500 shadow-glow-rose"
                    : isUnlocked
                    ? "bg-slate-900/70 border-slate-700 text-slate-200"
                    : "bg-slate-950/40 border-slate-800/80 opacity-50 text-slate-500"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Step 0{ex.progressionStep} / 0{ex.maxStep}
                    </span>
                    {isCurrent ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                        Active Target
                      </span>
                    ) : isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-600" />
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1.5">{ex.name}</h4>
                  <p className="text-xs text-slate-400 mb-3">{ex.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Equip: {ex.equipmentNeeded}</span>
                  {isCurrent && (
                    <button
                      onClick={() => handleAdvanceProgression(selectedCategory)}
                      className="text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1"
                    >
                      Master Step <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Logger Panel & Workout Audit Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Logger Form */}
        <div className="p-6 rounded-3xl glass-panel space-y-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-400" />
            <h3 className="text-sm font-bold text-white">Log Home Calisthenics Set</h3>
          </div>

          <form onSubmit={handleLogCalisthenics} className="space-y-3">
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                Exercise
              </label>
              <input
                type="text"
                value={logExercise}
                onChange={(e) => setLogExercise(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 text-xs text-white focus:border-rose-400 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Sets
                </label>
                <input
                  type="number"
                  value={logSets}
                  onChange={(e) => setLogSets(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white font-mono focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Reps
                </label>
                <input
                  type="number"
                  value={logReps}
                  onChange={(e) => setLogReps(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white font-mono focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  RPE (1-10)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={logRpe}
                  onChange={(e) => setLogRpe(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white font-mono focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                Form & Tension Notes
              </label>
              <input
                type="text"
                value={logNotes}
                onChange={(e) => setLogNotes(e.target.value)}
                placeholder="e.g. Scapulae fully locked at apex, 3s descent."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Record Calisthenics Reps</span>
            </button>
          </form>
        </div>

        {/* History Audit */}
        <div className="lg:col-span-2 p-6 rounded-3xl glass-panel space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Calisthenics Log History</h3>
            <span className="text-xs font-mono text-rose-400">
              {store.calisthenicsLogs.length} verified sessions
            </span>
          </div>

          <div className="overflow-x-auto">
            {store.calisthenicsLogs.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500 font-mono">
                No home workouts logged yet. Complete today's session and log your sets above.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Movement</th>
                    <th className="pb-3">Chain</th>
                    <th className="pb-3">Sets × Reps</th>
                    <th className="pb-3">RPE</th>
                    <th className="pb-3">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {store.calisthenicsLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-800/40">
                      <td className="py-3 font-mono text-slate-400">{log.date}</td>
                      <td className="py-3 font-semibold text-white">{log.exerciseName}</td>
                      <td className="py-3 font-mono text-rose-400">{log.category}</td>
                      <td className="py-3 font-mono text-cyan-300">
                        {log.sets} × {log.reps}
                      </td>
                      <td className="py-3 font-mono text-amber-400">{log.difficultyRating}/10</td>
                      <td className="py-3 text-slate-400 max-w-xs truncate">{log.notes || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
