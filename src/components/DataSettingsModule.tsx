"use client";

import React from "react";
import { ApexStore } from "@/lib/storage";
import {
  Shield,
  Download,
  Trash2,
  Lock,
  Heart,
  Clock,
  Calendar,
  CreditCard,
  RotateCcw,
  User,
} from "lucide-react";

interface DataSettingsProps {
  store: ApexStore;
  onUpdateStore: (updater: (prev: ApexStore) => ApexStore) => void;
  onExport: () => void;
  onReset: () => void;
}

export const DataSettingsModule: React.FC<DataSettingsProps> = ({
  store,
  onUpdateStore,
  onExport,
  onReset,
}) => {
  const { user } = store;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border-emerald-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Shield className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Data Sovereignty & Local Vault
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Zero cloud tracking. All real telemetry and calibrations stay on your machine.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-300">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Local Storage · Enclave Protected</span>
        </div>
      </div>

      {/* Real Calibrated Profile Summary */}
      <div className="p-6 rounded-3xl glass-panel space-y-4">
        <h3 className="text-base font-bold text-white">Active Calibration Ledger</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">User Profile</span>
            <span className="text-white font-bold">{user.name || "Uninitialized"}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Body Metrics</span>
            <span className="text-cyan-300 font-bold">{user.heightCm}cm / {user.weightKg}kg</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Skin Undertone</span>
            <span className="text-amber-300 font-bold">{user.skinTone}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Home Equipment</span>
            <span className="text-emerald-400 font-bold truncate block">{user.homeEquipment.join(", ")}</span>
          </div>
        </div>
      </div>

      {/* Vault Management Actions */}
      <div className="p-6 rounded-3xl glass-panel space-y-4">
        <h3 className="text-base font-bold text-white">Vault Export & Portability</h3>
        <p className="text-xs text-slate-400">
          Export your complete telemetry ledger in standard JSON format or reset local cache.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={onExport}
            className="px-5 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-glow-cyan flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Encrypted JSON Vault Backup</span>
          </button>

          <button
            onClick={() => {
              if (confirm("Reset APEX to fresh onboarding state?")) {
                onReset();
              }
            }}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono uppercase tracking-wider transition border border-slate-700 flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Profile Setup</span>
          </button>

          <button
            onClick={() => {
              if (
                confirm("PERMANENT ACTION: Wipe all local data and empty the APEX storage enclave?")
              ) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="px-4 py-2.5 rounded-2xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 text-xs font-mono uppercase tracking-wider transition border border-rose-500/30 flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>Wipe Local Storage</span>
          </button>
        </div>
      </div>
    </div>
  );
};
