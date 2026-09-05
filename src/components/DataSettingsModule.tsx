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
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
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
  const handleToggleConnector = (id: string) => {
    onUpdateStore((prev) => ({
      ...prev,
      connectors: prev.connectors.map((c) =>
        c.id === id ? { ...c, connected: !c.connected, permissionGranted: !c.permissionGranted } : c
      ),
    }));
  };

  const getConnectorIcon = (iconName: string) => {
    switch (iconName) {
      case "Heart":
        return Heart;
      case "Clock":
        return Clock;
      case "Calendar":
        return Calendar;
      case "CreditCard":
        return CreditCard;
      default:
        return Shield;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border-emerald-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Shield className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Data Sovereignty & Local Vault
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Explicit, consent-based connectors. Zero background surveillance. You own your data.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-300">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Local Storage · Client-Side Enclave</span>
        </div>
      </div>

      {/* Explicit Connectors Grid */}
      <div className="p-6 rounded-2xl glass-panel space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Explicit Opt-In Data Connectors</h3>
          <span className="text-xs font-mono text-slate-400">Revocable Permissions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {store.connectors.map((conn) => {
            const Icon = getConnectorIcon(conn.icon);
            return (
              <div
                key={conn.id}
                className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 border border-slate-700">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{conn.name}</div>
                        <div className="text-[10px] font-mono text-slate-400">
                          Last Synced: {conn.lastSynced}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleConnector(conn.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase transition ${
                        conn.connected
                          ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {conn.connected ? "Connected" : "Disabled"}
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 font-sans mt-2">{conn.scope}</p>
                </div>

                <div className="text-[10px] font-mono text-slate-500 border-t border-slate-800 pt-2 flex items-center justify-between">
                  <span>Transport: Local Mac IPC Bridge</span>
                  <span>Permission: {conn.permissionGranted ? "Granted" : "Revoked"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Export & Data Sovereignty Actions */}
      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <h3 className="text-base font-bold text-white">Vault Management & Portability</h3>
        <p className="text-xs text-slate-400">
          Export your complete telemetry ledger in standard JSON format or reset local cache.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={onExport}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-glow-cyan flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Encrypted JSON Vault Backup</span>
          </button>

          <button
            onClick={() => {
              if (confirm("Restore all APEX models and metrics to default baseline state?")) {
                onReset();
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono uppercase tracking-wider transition border border-slate-700 flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Baseline</span>
          </button>

          <button
            onClick={() => {
              if (
                confirm(
                  "PERMANENT ACTION: Wipe all local data and empty the APEX storage enclave?"
                )
              ) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 text-xs font-mono uppercase tracking-wider transition border border-rose-500/30 flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>Wipe Local Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
