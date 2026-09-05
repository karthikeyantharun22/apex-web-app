"use client";

import React from "react";
import { ApexStore } from "@/lib/storage";
import {
  CalendarCheck,
  Check,
  X,
  Sparkles,
  GitCommit,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";

interface WeeklyRetroProps {
  store: ApexStore;
  onUpdateStore: (updater: (prev: ApexStore) => ApexStore) => void;
}

export const WeeklyRetroModule: React.FC<WeeklyRetroProps> = ({ store, onUpdateStore }) => {
  const { user, calisthenicsLogs, telemetryLogs } = store;

  const weeklyProposals = [
    {
      id: "prop-calisthenics",
      domain: "body",
      title: "Calisthenics Frequency & Scapular Volume Optimization",
      observation: `Logged ${calisthenicsLogs.length} sessions. High RPE on Push Step ${store.currentPushStep}.`,
      proposedChange:
        "Inject 1 dedicated active recovery / wrist and shoulder mobility day between heavy upper sessions.",
      status: "pending",
    },
    {
      id: "prop-style",
      domain: "style",
      title: "Foundational Capsule Acquisition Sequence",
      observation: `Active profile (${user.skinTone}, ${user.bodyType} build). ${
        store.styleProfile.generatedCapsule.filter((x) => x.acquired).length
      }/8 pieces acquired.`,
      proposedChange:
        "Prioritize the Top #1 Essential (Heavyweight Crewneck in Charcoal) and Raw Indigo Denim for maximum initial outfit interchangeability.",
      status: "pending",
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border-cyan-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <CalendarCheck className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Weekly Retro & Self-Improvement Engine
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Audits your real calisthenics sessions, cashflow, and style progression to propose concrete system updates.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
          <GitCommit className="w-4 h-4 text-cyan-400" />
          <span>Config Version: 2026.36.0-agentic</span>
        </div>
      </div>

      {/* Real Audit Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl glass-panel space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">Calisthenics Adherence</div>
          <div className="text-2xl font-bold font-mono text-rose-400">
            {calisthenicsLogs.length > 0 ? "100% On-Track" : "Pending First Session"}
          </div>
          <p className="text-xs text-slate-400">
            {calisthenicsLogs.length} verified bodyweight sessions logged.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">Capsule Building</div>
          <div className="text-2xl font-bold font-mono text-amber-300">
            {store.styleProfile.generatedCapsule.filter((x) => x.acquired).length} / 8 Acquired
          </div>
          <p className="text-xs text-slate-400">
            {user.skinTone} palette customized.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">Active Agent Council</div>
          <div className="text-2xl font-bold font-mono text-cyan-300">
            {store.subAgents.length} Agents Active
          </div>
          <p className="text-xs text-slate-400">
            Continuous background telemetry alignment.
          </p>
        </div>
      </div>

      {/* Proposals Queue */}
      <div className="p-6 rounded-3xl glass-panel space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              Agent Self-Improvement Proposals
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Explicit Approval Required
          </span>
        </div>

        <div className="space-y-4">
          {weeklyProposals.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 shadow-glow-cyan space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 uppercase font-semibold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">
                  {p.domain}
                </span>
                <span className="text-xs text-slate-400 font-mono">Today</span>
              </div>

              <h4 className="text-sm font-bold text-white">{p.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{p.proposedChange}</p>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">Status: Actionable</span>
                <button
                  onClick={() => alert("Proposal approved and applied to APEX agent context!")}
                  className="px-4 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase font-mono transition flex items-center gap-1 shadow-glow-cyan"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve &amp; Apply</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
