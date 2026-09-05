"use client";

import React from "react";
import {
  Flame,
  Shield,
  Command,
  Download,
  Settings,
  Terminal,
  Layers,
  Sparkles,
  Activity,
  Shirt,
  MessageSquare,
  TrendingUp,
  GraduationCap,
  Bot,
  CalendarCheck,
} from "lucide-react";
import { LifeDomain } from "@/lib/types";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  streakDays: number;
  userName: string;
  onOpenCommandPalette: () => void;
  onExportData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  streakDays,
  userName,
  onOpenCommandPalette,
  onExportData,
}) => {
  const navItems = [
    { id: "telemetry", label: "Telemetry", icon: Layers },
    { id: "body", label: "Body Coach", icon: Activity },
    { id: "style", label: "Style", icon: Shirt },
    { id: "communication", label: "Communication", icon: MessageSquare },
    { id: "finance", label: "Wealth", icon: TrendingUp },
    { id: "learning", label: "Learning", icon: GraduationCap },
    { id: "agents", label: "Agent Factory", icon: Bot },
    { id: "retro", label: "Weekly Retro", icon: CalendarCheck },
    { id: "settings", label: "Data Vault", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#07080b]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & System Status */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab("telemetry")}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-600 p-[1px] shadow-glow-cyan transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-[#0a0b10] rounded-[7px] flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-extrabold tracking-wider text-white">
                    APEX
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 uppercase font-semibold">
                    Local v2.4
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-sans hidden sm:block">
                  Advancement Operating System
                </div>
              </div>
            </button>

            {/* Privacy Shield Pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-mono">
              <Shield className="w-3 h-3" />
              <span>Local-First · Zero Surveillance</span>
            </div>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono font-medium">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              <span>{streakDays}d Streak</span>
            </div>

            {/* Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 text-slate-300 text-xs font-mono transition"
              title="Open Command Palette (⌘K)"
            >
              <Command className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Quick Action</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Backup Export */}
            <button
              onClick={onExportData}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 text-slate-300 hover:text-cyan-400 transition"
              title="Export Full Vault Backup (JSON)"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto py-2 no-scrollbar border-t border-slate-800/50">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-glow-cyan"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
