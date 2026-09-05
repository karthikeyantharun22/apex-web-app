"use client";

import React, { useState } from "react";
import { ApexStore } from "@/lib/storage";
import { SubAgent } from "@/lib/types";
import {
  Bot,
  Plus,
  ShieldCheck,
  Cpu,
  Terminal,
  Activity,
  CheckCircle2,
  Sliders,
  Sparkles,
  Play,
  Pause,
} from "lucide-react";

interface AgentFactoryProps {
  store: ApexStore;
  onUpdateStore: (updater: (prev: ApexStore) => ApexStore) => void;
}

export const AgentFactoryModule: React.FC<AgentFactoryProps> = ({ store, onUpdateStore }) => {
  const [showWizard, setShowWizard] = useState(false);
  const [agentName, setAgentName] = useState("");
  const [agentRole, setAgentRole] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [selectedTools, setSelectedTools] = useState<string[]>([
    "Local Vault Read",
    "Evidence Framework Validator",
  ]);

  const availableTools = [
    "Local Vault Read",
    "Evidence Framework Validator",
    "HealthKit Bridge",
    "SM-2 Card Generator",
    "Tone & Brevity Analyzer",
    "Asset Glide-Path Modeler",
  ];

  const handleToggleTool = (t: string) => {
    if (selectedTools.includes(t)) {
      setSelectedTools(selectedTools.filter((x) => x !== t));
    } else {
      setSelectedTools([...selectedTools, t]);
    }
  };

  const handleCreateAgent = (e: React.FormEvent) => {
    e.preventDefault();
    const newAgent: SubAgent = {
      id: `sub-${Date.now()}`,
      name: agentName || "Custom Specialist Sub-Agent",
      role: agentRole || "Specialized Domain Coach",
      icon: "Bot",
      status: "active",
      systemPrompt:
        systemPrompt ||
        "Operates strictly within cited domain evidence. Retains mandate to push back on unsafe or reckless plans.",
      tools: selectedTools,
      guardrailsInherited: true,
      queriesHandled: 0,
    };

    onUpdateStore((prev) => ({
      ...prev,
      subAgents: [...prev.subAgents, newAgent],
    }));

    setAgentName("");
    setAgentRole("");
    setSystemPrompt("");
    setShowWizard(false);
    alert("Sub-agent instantiated with inherited APEX guardrails!");
  };

  const handleToggleStatus = (id: string) => {
    onUpdateStore((prev) => ({
      ...prev,
      subAgents: prev.subAgents.map((a) =>
        a.id === id ? { ...a, status: a.status === "active" ? "standby" : "active" } : a
      ),
    }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border-cyan-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Bot className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Agent Factory & Orchestrator
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Meta-module for provisioning specialized sub-agents with strict inherited core guardrails.
          </p>
        </div>

        <button
          onClick={() => setShowWizard(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-glow-cyan flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Scaffold New Sub-Agent</span>
        </button>
      </div>

      {/* Inherited Guardrails Banner */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white block mb-0.5">
            Hard Guardrail Inheritance Mandate
          </span>
          <p className="text-slate-400">
            Every sub-agent spawned by the factory strictly inherits parent guardrails: zero covert surveillance,
            no unlicensed medical/financial advice, zero manipulative interpersonal scripts, and the obligation to push back on reckless plans.
          </p>
        </div>
      </div>

      {/* Active Sub-Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {store.subAgents.map((agent) => (
          <div
            key={agent.id}
            className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/30 transition flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Bot className="w-5 h-5" />
                </div>
                <button
                  onClick={() => handleToggleStatus(agent.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition ${
                    agent.status === "active"
                      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                      : "bg-slate-800 text-slate-400 border border-slate-700"
                  }`}
                >
                  {agent.status === "active" ? (
                    <>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Active
                    </>
                  ) : (
                    <>
                      <Pause className="w-3 h-3" /> Standby
                    </>
                  )}
                </button>
              </div>

              <h4 className="text-base font-bold text-white">{agent.name}</h4>
              <div className="text-xs text-cyan-400 font-mono mt-0.5">{agent.role}</div>

              <p className="text-xs text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                "{agent.systemPrompt}"
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="text-[11px] font-mono text-slate-400">
                <span className="text-slate-500 block mb-1">Attached Capabilities:</span>
                <div className="flex flex-wrap gap-1">
                  {agent.tools.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 text-[10px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2">
                <span>Guardrails: Inherited</span>
                <span className="text-cyan-300">{agent.queriesHandled} sessions run</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Creation Modal */}
      {showWizard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg p-6 rounded-2xl glass-panel border border-cyan-500/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Scaffold Specialized Sub-Agent</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                Template Engine
              </span>
            </div>

            <form onSubmit={handleCreateAgent} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Agent Title
                </label>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  placeholder="e.g. APEX Meal-Prep Biometrics Architect"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Domain Role
                </label>
                <input
                  type="text"
                  value={agentRole}
                  onChange={(e) => setAgentRole(e.target.value)}
                  placeholder="e.g. Micronutrient & Satiety Optimization Specialist"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  System Directive & Tone
                </label>
                <textarea
                  rows={3}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="Describe voice, boundaries, and specific mathematical models..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                  Tool Permissions
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableTools.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => handleToggleTool(t)}
                      className={`p-2 rounded-lg text-left text-xs font-mono transition flex items-center justify-between border ${
                        selectedTools.includes(t)
                          ? "bg-cyan-950/60 border-cyan-400 text-cyan-300"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      <span className="truncate">{t}</span>
                      {selectedTools.includes(t) && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWizard(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider"
                >
                  Provision Sub-Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
