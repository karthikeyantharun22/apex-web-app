"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Activity,
  MessageSquare,
  TrendingUp,
  GraduationCap,
  Shirt,
  Download,
  Bot,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
  onExport: () => void;
  onReset: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onExport,
  onReset,
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: "log-workout",
      title: "Log Workout Session",
      desc: "Record sets, reps, weight, and RPE with progressive overload tracking",
      icon: Activity,
      category: "Body Coach",
      action: () => {
        onNavigateTab("body");
        onClose();
      },
    },
    {
      id: "check-draft",
      title: "Analyze Message / Email Draft",
      desc: "Detect needy or defensive patterns and generate assertive rewrite",
      icon: MessageSquare,
      category: "Communication",
      action: () => {
        onNavigateTab("communication");
        onClose();
      },
    },
    {
      id: "review-cards",
      title: "Review Spaced Repetition Cards",
      desc: "Complete active recall flashcards queued for today (SM-2)",
      icon: GraduationCap,
      category: "Learning",
      action: () => {
        onNavigateTab("learning");
        onClose();
      },
    },
    {
      id: "style-outfit",
      title: "Generate Event Outfit",
      desc: "Calculate high-contrast capsule coordination for upcoming event",
      icon: Shirt,
      category: "Style",
      action: () => {
        onNavigateTab("style");
        onClose();
      },
    },
    {
      id: "check-runway",
      title: "Audit Wealth Runway & Allocation",
      desc: "Review Boglehead 3-fund split and liquid emergency runway",
      icon: TrendingUp,
      category: "Finance",
      action: () => {
        onNavigateTab("finance");
        onClose();
      },
    },
    {
      id: "spawn-agent",
      title: "Agent Factory: Scaffold Sub-Agent",
      desc: "Create a specialized sub-agent with strict inherited guardrails",
      icon: Bot,
      category: "Agent Factory",
      action: () => {
        onNavigateTab("agents");
        onClose();
      },
    },
    {
      id: "export-data",
      title: "Export Vault Backup (JSON)",
      desc: "Download encrypted local-first JSON backup of all telemetry",
      icon: Download,
      category: "Data Vault",
      action: () => {
        onExport();
        onClose();
      },
    },
    {
      id: "reset-store",
      title: "Reset to Baseline Demo State",
      desc: "Restore default seed data across all modules",
      icon: RotateCcw,
      category: "System",
      action: () => {
        if (confirm("Reset all local APEX data to factory baseline?")) {
          onReset();
          onClose();
        }
      },
    },
  ];

  const filtered = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.desc.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl glass-panel border border-cyan-500/30 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800/80 bg-slate-900/90">
          <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or jump to module... (e.g. workout, pitch, finance)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-400 font-mono">
              No matching APEX commands found.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/70 text-left transition group border border-transparent hover:border-slate-700/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-800/80 group-hover:bg-cyan-950/60 border border-slate-700/60 group-hover:border-cyan-500/40 text-slate-300 group-hover:text-cyan-400 transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-cyan-300 transition">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-1">{item.desc}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span>Navigate</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">↑↓</kbd>
            <span>Select</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Enter</kbd>
          </div>
          <div className="flex items-center gap-1 text-cyan-400">
            <Sparkles className="w-3 h-3" />
            <span>APEX Intelligence Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
