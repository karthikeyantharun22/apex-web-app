"use client";

import React from "react";
import { ApexStore } from "@/lib/storage";
import { RetroProposal } from "@/lib/types";
import {
  CalendarCheck,
  Check,
  X,
  Sparkles,
  GitCommit,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
} from "lucide-react";

interface WeeklyRetroProps {
  store: ApexStore;
  onUpdateStore: (updater: (prev: ApexStore) => ApexStore) => void;
}

export const WeeklyRetroModule: React.FC<WeeklyRetroProps> = ({ store, onUpdateStore }) => {
  const handleProposalDecision = (id: string, status: "approved" | "rejected") => {
    onUpdateStore((prev) => ({
      ...prev,
      retroProposals: prev.retroProposals.map((p) =>
        p.id === id ? { ...p, status } : p
      ),
    }));
    alert(
      status === "approved"
        ? "Proposal approved and committed to local agent config version."
        : "Proposal rejected."
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border-cyan-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <CalendarCheck className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Weekly Retro & Self-Improvement Engine
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Audits recommendations vs. logged outcomes. Proposes concrete config upgrades for explicit user approval.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
          <GitCommit className="w-4 h-4 text-cyan-400" />
          <span>Config Version: 2026.36.0-local</span>
        </div>
      </div>

      {/* Retro Audit Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl glass-panel space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">Recommendation Adherence</div>
          <div className="text-2xl font-bold font-mono text-emerald-300">92.4%</div>
          <p className="text-xs text-slate-400">
            24 of 26 prescribed domain micro-actions completed.
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">Systematic Misses Flagged</div>
          <div className="text-2xl font-bold font-mono text-amber-300">2 Items</div>
          <p className="text-xs text-slate-400">
            Squat RPE fatigue creep &amp; late-night screen time latency.
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">Pending Upgrade Proposals</div>
          <div className="text-2xl font-bold font-mono text-cyan-300">
            {store.retroProposals.filter((p) => p.status === "pending").length} Actionable
          </div>
          <p className="text-xs text-slate-400">
            Ready for your 1-click review and approval.
          </p>
        </div>
      </div>

      {/* Upgrade Proposals Queue */}
      <div className="p-6 rounded-2xl glass-panel space-y-6">
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
          {store.retroProposals.map((proposal) => (
            <div
              key={proposal.id}
              className={`p-5 rounded-2xl border transition-all ${
                proposal.status === "approved"
                  ? "bg-emerald-950/20 border-emerald-500/40"
                  : proposal.status === "rejected"
                  ? "bg-slate-900/40 border-slate-800 opacity-50"
                  : "bg-slate-900/80 border-cyan-500/40 shadow-glow-cyan"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-cyan-400 uppercase font-semibold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">
                    {proposal.domain}
                  </span>
                  <h4 className="text-sm font-bold text-white">{proposal.title}</h4>
                </div>
                <span className="text-[11px] font-mono text-slate-400">{proposal.date}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans mb-4">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
                    Observed Metric Divergence:
                  </span>
                  <p className="text-slate-300">{proposal.observation}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block mb-1">
                    Proposed System Update:
                  </span>
                  <p className="text-slate-200 font-medium">{proposal.proposedChange}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1">
                    Hypothesized Impact:
                  </span>
                  <p className="text-slate-300">{proposal.impactHypothesis}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                <div className="text-[11px] font-mono text-slate-400">
                  Status:{" "}
                  <span
                    className={`font-bold uppercase ${
                      proposal.status === "approved"
                        ? "text-emerald-400"
                        : proposal.status === "rejected"
                        ? "text-rose-400"
                        : "text-cyan-400"
                    }`}
                  >
                    {proposal.status}
                  </span>
                </div>

                {proposal.status === "pending" ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleProposalDecision(proposal.id, "rejected")}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
                    <button
                      onClick={() => handleProposalDecision(proposal.id, "approved")}
                      className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono uppercase transition flex items-center gap-1 shadow-glow-cyan"
                    >
                      <Check className="w-3.5 h-3.5" /> Approve &amp; Deploy Update
                    </button>
                  </div>
                ) : (
                  <div className="text-[11px] font-mono text-slate-500">
                    {proposal.status === "approved"
                      ? "✓ Applied to runtime"
                      : "✕ Dismissed by user"}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
