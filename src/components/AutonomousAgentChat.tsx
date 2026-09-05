"use client";

import React, { useState, useRef, useEffect } from "react";
import { ApexStore } from "@/lib/storage";
import { AgentChatMessage, SubAgentDefinition } from "@/lib/types";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Zap,
  Activity,
  Shirt,
  MessageSquare,
  TrendingUp,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface AgentChatProps {
  store: ApexStore;
  onUpdateStore: (updater: (prev: ApexStore) => ApexStore) => void;
  onSelectTab: (tab: string) => void;
  onAgentThinkingChange: (thinking: boolean) => void;
}

export const AutonomousAgentChat: React.FC<AgentChatProps> = ({
  store,
  onUpdateStore,
  onSelectTab,
  onAgentThinkingChange,
}) => {
  const [inputMessage, setInputMessage] = useState("");
  const [selectedAgentId, setSelectedAgentId] = useState<string>("agent-calisthenics");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeAgent =
    store.subAgents.find((a) => a.id === selectedAgentId) || store.subAgents[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [store.chatMessages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || loading) return;

    const userMsg: AgentChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    onUpdateStore((prev) => ({
      ...prev,
      chatMessages: [...prev.chatMessages, userMsg],
    }));

    setInputMessage("");
    setLoading(true);
    onAgentThinkingChange(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          agentId: selectedAgentId,
          userProfile: store.user,
          currentStore: {
            pushStep: store.currentPushStep,
            pullStep: store.currentPullStep,
            legStep: store.currentLegStep,
            styleCapsule: store.styleProfile,
          },
        }),
      });

      const data = await res.json();

      const assistantMsg: AgentChatMessage = {
        id: `msg-resp-${Date.now()}`,
        role: "assistant",
        agentName: data.agentName || activeAgent.name,
        content: data.content,
        timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actionsTaken: data.actionsTaken,
        suggestedAction: data.suggestedAction,
      };

      onUpdateStore((prev) => ({
        ...prev,
        chatMessages: [...prev.chatMessages, assistantMsg],
      }));
    } catch (e: any) {
      console.error(e);
      const errorMsg: AgentChatMessage = {
        id: `msg-err-${Date.now()}`,
        role: "assistant",
        agentName: "APEX System",
        content: `Error contacting autonomous agent: ${e.message}. Using offline fallback reasoning.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      onUpdateStore((prev) => ({
        ...prev,
        chatMessages: [...prev.chatMessages, errorMsg],
      }));
    } finally {
      setLoading(false);
      onAgentThinkingChange(false);
    }
  };

  const getAgentIcon = (id: string) => {
    switch (id) {
      case "agent-calisthenics":
        return Activity;
      case "agent-style":
        return Shirt;
      case "agent-communication":
        return MessageSquare;
      case "agent-wealth":
        return TrendingUp;
      case "agent-learning":
        return GraduationCap;
      default:
        return Bot;
    }
  };

  const quickPrompts = [
    { label: "Generate Today's Calisthenics", text: "Generate my customized home calisthenics workout for today based on my setup.", agentId: "agent-calisthenics" },
    { label: "Build Capsule Wardrobe from Zero", text: "Analyze my physical measurements and skin undertone to build my complete capsule wardrobe from scratch.", agentId: "agent-style" },
    { label: "Critique Draft Email", text: "I have an important negotiation draft. Analyze it for needy or defensive phrases and give me the executive rewrite.", agentId: "agent-communication" },
    { label: "Run Wealth & Runway Audit", text: "Calculate my liquid runway months and age-based Boglehead asset allocation.", agentId: "agent-wealth" },
  ];

  return (
    <div className="p-6 rounded-3xl glass-panel border border-cyan-500/20 shadow-2xl flex flex-col h-[650px] justify-between">
      {/* Top Agent Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Bot className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white tracking-tight">
              APEX Multi-Agent Autonomous Command
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time conversational agents acting on your real profile data.
          </p>
        </div>

        {/* Sub-Agent Pill Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {store.subAgents.map((agent) => {
            const Icon = getAgentIcon(agent.id);
            const isSelected = selectedAgentId === agent.id;
            return (
              <button
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                  isSelected
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan"
                    : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{agent.name.replace("APEX ", "")}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {store.chatMessages.map((msg) => {
          const isAssistant = msg.role === "assistant";
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isAssistant ? "justify-start" : "justify-end"}`}
            >
              {isAssistant && (
                <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 shadow-glow-cyan">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isAssistant
                    ? "bg-slate-900/90 border border-slate-800 text-slate-200"
                    : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium shadow-lg"
                }`}
              >
                {isAssistant && (
                  <div className="flex items-center justify-between font-mono text-[10px] text-cyan-400 font-bold mb-1.5 pb-1 border-b border-slate-800/80">
                    <span>{msg.agentName || "APEX Autonomous Agent"}</span>
                    <span className="text-slate-500 font-normal">{msg.timestamp}</span>
                  </div>
                )}

                <div className="whitespace-pre-wrap font-sans">{msg.content}</div>

                {/* Agent Action Pill if triggered */}
                {msg.actionsTaken && (
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                    {msg.actionsTaken.map((act, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3 h-3 text-cyan-400" />
                        {act}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {!isAssistant && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-3 animate-fadeIn">
            <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-300 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>{activeAgent.name} is synthesizing personalized response...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div className="pt-2 pb-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedAgentId(qp.agentId);
              handleSendMessage(qp.text);
            }}
            className="px-3 py-1 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-[11px] font-mono transition-all whitespace-nowrap flex items-center gap-1 shrink-0"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>{qp.label}</span>
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2 pt-2 border-t border-slate-800"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={`Instruct ${activeAgent.name}... (e.g. "Create my workout", "Build my capsule wardrobe")`}
          className="flex-1 bg-slate-900/90 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none font-sans"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim() || loading}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition disabled:opacity-40 disabled:cursor-not-allowed shadow-glow-cyan flex items-center gap-1.5 shrink-0"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
};
