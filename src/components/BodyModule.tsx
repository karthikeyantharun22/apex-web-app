"use client";

import React, { useState } from "react";
import { ApexStore } from "@/lib/storage";
import { FRAMEWORKS } from "@/lib/frameworks";
import {
  Dumbbell,
  ShieldAlert,
  Flame,
  Scale,
  Plus,
  TrendingUp,
  Activity,
  CheckCircle2,
  Info,
  Calendar,
} from "lucide-react";

interface BodyModuleProps {
  store: ApexStore;
  onUpdateStore: (updater: (prev: ApexStore) => ApexStore) => void;
}

export const BodyModule: React.FC<BodyModuleProps> = ({ store, onUpdateStore }) => {
  // Workout Logger Form State
  const [exercise, setExercise] = useState("Barbell Bench Press");
  const [sets, setSets] = useState("4");
  const [reps, setReps] = useState("8");
  const [weightKg, setWeightKg] = useState("100");
  const [rpe, setRpe] = useState("8.0");
  const [notes, setNotes] = useState("");

  // 1RM Calculator State
  const [calcWeight, setCalcWeight] = useState("120");
  const [calcReps, setCalcReps] = useState("5");

  // Calorie & Pushback Guardrail State
  const [loggedCalories, setLoggedCalories] = useState(store.bodyMetrics.dailyCalories.toString());
  const [loggedWeight, setLoggedWeight] = useState(store.bodyMetrics.currentWeightKg.toString());
  const [customDeficit, setCustomDeficit] = useState("20");

  const calc1RM = FRAMEWORKS.body.calculate1RM(
    parseFloat(calcWeight) || 0,
    parseInt(calcReps) || 1
  );

  const handleLogWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    const newWorkout = {
      id: `w-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      exercise,
      sets: parseInt(sets) || 3,
      reps: parseInt(reps) || 8,
      weightKg: parseFloat(weightKg) || 60,
      rpe: parseFloat(rpe) || 8.0,
      framework: `NSCA Progressive Overload (Estimated 1RM: ${FRAMEWORKS.body.calculate1RM(
        parseFloat(weightKg) || 60,
        parseInt(reps) || 8
      )}kg)`,
      notes,
    };

    onUpdateStore((prev) => ({
      ...prev,
      workouts: [newWorkout, ...prev.workouts],
    }));

    setNotes("");
    alert("Workout recorded and progressive overload metrics updated.");
  };

  // Pushback verification
  const deficitNum = parseFloat(customDeficit) || 20;
  const safetyEval = FRAMEWORKS.body.evaluateSafety(deficitNum, 0.6);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border-rose-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Dumbbell className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Body & Physique Engineering
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Governed by {FRAMEWORKS.body.title} — blunt, numbers-first, with active safety pushback.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-right">
            <div className="text-[10px] font-mono uppercase text-slate-400">Readiness Score</div>
            <div className="text-base font-mono font-bold text-rose-400">
              {store.bodyMetrics.recoveryReadiness}% Optimal
            </div>
          </div>
        </div>
      </div>

      {/* Pushback & Safety Banner */}
      {!safetyEval.safe && safetyEval.pushback && (
        <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/50 flex items-start gap-3 text-rose-200 text-xs">
          <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold font-mono uppercase tracking-wider block mb-0.5">
              APEX Guardrail Pushback Triggered
            </span>
            <p>{safetyEval.pushback}</p>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workout Logger Panel */}
        <div className="lg:col-span-2 p-6 rounded-2xl glass-panel space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-rose-400" />
              <h3 className="text-base font-bold text-white">Log Resistance Training</h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">ACSM Protocol</span>
          </div>

          <form onSubmit={handleLogWorkout} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Compound / Isolation Movement
                </label>
                <input
                  type="text"
                  value={exercise}
                  onChange={(e) => setExercise(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white font-sans focus:border-rose-400 focus:outline-none"
                  placeholder="e.g. Barbell Squat, Overhead Press"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Load (kg)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-rose-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Working Sets
                </label>
                <input
                  type="number"
                  value={sets}
                  onChange={(e) => setSets(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-rose-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Reps per Set
                </label>
                <input
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-rose-400 focus:outline-none"
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
                  min="5"
                  max="10"
                  value={rpe}
                  onChange={(e) => setRpe(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-rose-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                Kinematics & Biomechanical Notes
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Clean pause, knee tracking aligned, 3-second eccentric."
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-rose-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Commit Workout Set</span>
            </button>
          </form>
        </div>

        {/* 1RM Brzycki Calculator & Energy Balance */}
        <div className="space-y-6">
          {/* 1RM Calculator */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">1RM Brzycki Model</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                  Load (kg)
                </label>
                <input
                  type="number"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white font-mono focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                  Reps
                </label>
                <input
                  type="number"
                  value={calcReps}
                  onChange={(e) => setCalcReps(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white font-mono focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
              <span className="text-xs text-slate-300 font-medium">Estimated 1RM:</span>
              <span className="text-xl font-bold font-mono text-cyan-300">{calc1RM} kg</span>
            </div>
          </div>

          {/* Caloric Deficit & Safety Modeler */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Deficit & Pushback Modeler</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Helms 2014</span>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-400 font-mono">Planned Deficit %</span>
                <span className="text-amber-400 font-mono font-bold">{customDeficit}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                value={customDeficit}
                onChange={(e) => setCustomDeficit(e.target.value)}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <div className="text-[11px] text-slate-400 p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              {deficitNum > 28 ? (
                <span className="text-rose-400 font-semibold">
                  ⚠️ UNSAFE: Deficit above 28% accelerates muscle wasting.
                </span>
              ) : (
                <span className="text-emerald-400 font-medium">
                  ✓ OPTIMAL: Deficit within safe 0.5-1.0% bodyweight/week rate.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Workout Log Audit Table */}
      <div className="p-6 rounded-2xl glass-panel">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white">Recent Resistance Training History</h3>
            <p className="text-xs text-slate-400">
              Verified sessions tracking intensity, volume, and RPE benchmarks.
            </p>
          </div>
          <span className="text-xs font-mono text-rose-400">
            {store.workouts.length} recorded sessions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                <th className="pb-3">Date</th>
                <th className="pb-3">Exercise</th>
                <th className="pb-3">Sets x Reps</th>
                <th className="pb-3">Load</th>
                <th className="pb-3">RPE</th>
                <th className="pb-3">Volume Load</th>
                <th className="pb-3">Scientific Model</th>
                <th className="pb-3">Form Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {store.workouts.map((w) => (
                <tr key={w.id} className="hover:bg-slate-800/40">
                  <td className="py-3 font-mono text-slate-400">{w.date}</td>
                  <td className="py-3 font-semibold text-white">{w.exercise}</td>
                  <td className="py-3 font-mono text-cyan-300">
                    {w.sets} × {w.reps}
                  </td>
                  <td className="py-3 font-mono text-rose-300 font-bold">{w.weightKg} kg</td>
                  <td className="py-3 font-mono text-amber-400">{w.rpe} / 10</td>
                  <td className="py-3 font-mono text-slate-300">
                    {Math.round(w.sets * w.reps * w.weightKg)} kg
                  </td>
                  <td className="py-3 font-mono text-slate-400 text-[11px]">{w.framework}</td>
                  <td className="py-3 text-slate-400 max-w-xs truncate">{w.notes || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
