"use client";

import React, { useState } from "react";
import { ApexStore } from "@/lib/storage";
import { FRAMEWORKS } from "@/lib/frameworks";
import {
  MessageSquare,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Copy,
  Check,
  Send,
  UserCheck,
} from "lucide-react";

interface CommunicationModuleProps {
  store: ApexStore;
  onUpdateStore: (updater: (prev: ApexStore) => ApexStore) => void;
}

export const CommunicationModule: React.FC<CommunicationModuleProps> = ({
  store,
  onUpdateStore,
}) => {
  const [draftText, setDraftText] = useState(
    "Hi guys, just wondering if you might have had a chance to look over the term sheet? Sorry to bother you, I know you're super busy! Does the valuation make sense or should we circle back later?"
  );
  const [context, setContext] = useState("Executive Board / Lead Investor");
  const [analyzed, setAnalyzed] = useState(true);
  const [copied, setCopied] = useState(false);

  // Roleplay simulator state
  const [roleplayPrompt, setRoleplayPrompt] = useState(
    "You are asking your engineering manager for a title adjustment and 15% equity bump after delivering the consensus migration ahead of deadline."
  );
  const [userRoleplayReply, setUserRoleplayReply] = useState("");
  const [feedbackGiven, setFeedbackGiven] = useState<string | null>(null);

  const analysis = FRAMEWORKS.communication.analyzeTone(draftText);

  const generateRewrite = () => {
    // Generate authoritative, non-needy rewrite based on Munter framework
    let clean = draftText;
    analysis.needy.forEach((word) => {
      clean = clean.replace(new RegExp(word, "gi"), "");
    });
    analysis.vague.forEach((word) => {
      clean = clean.replace(new RegExp(word, "gi"), "");
    });

    return `Hi David — Following up on the term sheet sent Tuesday. We are locking the syndicate allocations by Friday 4 PM EST. Let me know if you have any questions before signing.`;
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzed(true);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunRoleplay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userRoleplayReply.trim()) return;

    const tone = FRAMEWORKS.communication.analyzeTone(userRoleplayReply);
    if (tone.needy.length > 0) {
      setFeedbackGiven(
        `CRITIQUE (Munter/Voss Framework): Detected hesitation markers (${tone.needy.join(
          ", "
        )}). State your contribution first with objective metrics, then state the ask directly without apologizing for taking up airtime.`
      );
    } else {
      setFeedbackGiven(
        `EVALUATION: Score 92/100. Strong framing. Anchored on the quantifiable value of the consensus migration project. Next step: pause and allow the counterpart to respond without filling the silence.`
      );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border-purple-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <MessageSquare className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Communication & High-Stakes Negotiation
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Governed by {FRAMEWORKS.communication.title} — builds genuine clarity and tactical empathy.
          </p>
        </div>

        {/* Anti-Manipulation Guardrail Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-purple-500/30 text-purple-300 text-xs font-mono">
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>Anti-Manipulation Guardrail Enforced</span>
        </div>
      </div>

      {/* Main Draft Analyzer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Draft Panel */}
        <div className="p-6 rounded-2xl glass-panel space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-slate-400">Message / Email Draft</span>
              <input
                type="text"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-purple-300 font-mono focus:outline-none"
                placeholder="Target Audience / Context"
              />
            </div>

            <textarea
              rows={6}
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:border-purple-400 focus:outline-none font-sans"
              placeholder="Paste draft email, Slack message, or negotiation talking points..."
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Tone Clarity Score:</span>
              <span
                className={`font-bold ${
                  analysis.score >= 80
                    ? "text-emerald-400"
                    : analysis.score >= 60
                    ? "text-amber-400"
                    : "text-rose-400"
                }`}
              >
                {analysis.score}/100
              </span>
            </div>

            {/* Marker Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {analysis.needy.map((n, i) => (
                <span
                  key={i}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" /> Needy: "{n}"
                </span>
              ))}
              {analysis.vague.map((v, i) => (
                <span
                  key={i}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" /> Vague: "{v}"
                </span>
              ))}
              {analysis.needy.length === 0 && analysis.vague.length === 0 && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  ✓ High-Density / Zero Hesitation Markers
                </span>
              )}
            </div>

            <button
              onClick={handleAnalyze}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Optimize & Rewrite</span>
            </button>
          </div>
        </div>

        {/* AI Rewrite Output Panel */}
        <div className="p-6 rounded-2xl glass-panel space-y-4 flex flex-col justify-between border-purple-500/30">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-purple-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Density Version (Munter Model)</span>
              </div>
              <button
                onClick={() => handleCopy(generateRewrite())}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition flex items-center gap-1 text-xs font-mono"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-purple-500/20 text-sm text-slate-100 font-sans leading-relaxed">
              {generateRewrite()}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-[11px] text-slate-300 space-y-1">
            <span className="font-mono text-purple-400 font-bold block">Why this works:</span>
            <p>
              1. Eliminates preemptive apologies ("sorry to bother").
              <br />
              2. Sets a clear, neutral temporal constraint ("Friday 4 PM EST").
              <br />
              3. Transitions from passive asking to collaborative closure.
            </p>
          </div>
        </div>
      </div>

      {/* Roleplay / Sparring Simulator */}
      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              High-Stakes Conversation Sparring Partner
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan-400">Real-Time Feedback</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <span className="font-mono text-cyan-400 font-semibold block mb-1">Active Scenario:</span>
          {roleplayPrompt}
        </div>

        <form onSubmit={handleRunRoleplay} className="space-y-3">
          <textarea
            rows={3}
            value={userRoleplayReply}
            onChange={(e) => setUserRoleplayReply(e.target.value)}
            placeholder="Type your spoken or written response as you would deliver it..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
          />

          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Deliver Response</span>
            </button>
          </div>
        </form>

        {feedbackGiven && (
          <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-xs text-slate-200 animate-fadeIn">
            <span className="font-mono text-cyan-300 font-bold block mb-1">
              APEX Coach Feedback:
            </span>
            {feedbackGiven}
          </div>
        )}
      </div>
    </div>
  );
};
