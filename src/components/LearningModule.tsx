"use client";

import React, { useState } from "react";
import { ApexStore } from "@/lib/storage";
import { FRAMEWORKS } from "@/lib/frameworks";
import { Flashcard, SkillNode } from "@/lib/types";
import {
  GraduationCap,
  Brain,
  RotateCw,
  CheckCircle2,
  Lock,
  Plus,
  ArrowRight,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface LearningModuleProps {
  store: ApexStore;
  onUpdateStore: (updater: (prev: ApexStore) => ApexStore) => void;
}

export const LearningModule: React.FC<LearningModuleProps> = ({ store, onUpdateStore }) => {
  const [activeDeck, setActiveDeck] = useState<string>("All");
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"flashcards" | "skilltree">("flashcards");

  const cards =
    activeDeck === "All"
      ? store.flashcards
      : store.flashcards.filter((c) => c.deck === activeDeck);

  const currentCard = cards[cardIndex] || cards[0];

  const handleRateCard = (rating: number) => {
    if (!currentCard) return;

    const { nextInterval, nextEase, reps } = FRAMEWORKS.learning.calculateNextInterval(
      currentCard.reps,
      rating,
      currentCard.intervalDays,
      currentCard.easeFactor
    );

    const updatedCard: Flashcard = {
      ...currentCard,
      intervalDays: nextInterval,
      easeFactor: nextEase,
      reps,
      state: rating >= 4 ? "mastered" : rating >= 3 ? "review" : "learning",
    };

    onUpdateStore((prev) => ({
      ...prev,
      flashcards: prev.flashcards.map((c) => (c.id === updatedCard.id ? updatedCard : c)),
      telemetryLogs: prev.telemetryLogs.map((log, idx) =>
        idx === prev.telemetryLogs.length - 1
          ? { ...log, activeRecallReps: log.activeRecallReps + 1 }
          : log
      ),
    }));

    setIsFlipped(false);
    if (cardIndex < cards.length - 1) {
      setCardIndex(cardIndex + 1);
    } else {
      setCardIndex(0);
      alert("Spaced repetition queue complete for this session!");
    }
  };

  const currentSkillTree = store.skillTrees[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border-cyan-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <GraduationCap className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Learning Engine ("Learn Anything")
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Governed by {FRAMEWORKS.learning.title}. Spaced repetition + active recall dependency trees.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab("flashcards")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
              activeTab === "flashcards"
                ? "bg-cyan-500 text-slate-950 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Spaced Repetition
          </button>
          <button
            onClick={() => setActiveTab("skilltree")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
              activeTab === "skilltree"
                ? "bg-cyan-500 text-slate-950 font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Skill Dependency Tree
          </button>
        </div>
      </div>

      {activeTab === "flashcards" ? (
        /* Spaced Repetition Flashcard Interface */
        <div className="max-w-2xl mx-auto space-y-6">
          {currentCard ? (
            <div className="p-8 rounded-3xl glass-panel border border-cyan-500/30 shadow-2xl flex flex-col justify-between min-h-[360px] text-center">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-6">
                  <span className="px-2.5 py-1 rounded bg-slate-800 text-cyan-300">
                    Deck: {currentCard.deck}
                  </span>
                  <span>
                    Card {cardIndex + 1} of {cards.length}
                  </span>
                </div>

                <div className="text-lg md:text-xl font-semibold text-white tracking-tight leading-relaxed">
                  {currentCard.prompt}
                </div>
              </div>

              {isFlipped ? (
                <div className="my-6 p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-sm text-cyan-100 animate-fadeIn text-left font-sans leading-relaxed">
                  <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold mb-1">
                    Active Recall Answer:
                  </div>
                  {currentCard.answer}
                </div>
              ) : (
                <div className="my-8">
                  <button
                    onClick={() => setIsFlipped(true)}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono uppercase tracking-wider transition border border-slate-700 inline-flex items-center gap-2"
                  >
                    <RotateCw className="w-4 h-4" />
                    <span>Flip & Show Recall Answer</span>
                  </button>
                </div>
              )}

              {/* SM-2 Rating Bar */}
              {isFlipped && (
                <div className="space-y-2 pt-4 border-t border-slate-800 animate-fadeIn">
                  <div className="text-[11px] font-mono text-slate-400">
                    Grade Recall Accuracy (SM-2 Interval Calculation):
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <button
                      onClick={() => handleRateCard(1)}
                      className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-500/30 text-xs font-mono"
                    >
                      1 (Blackout)
                    </button>
                    <button
                      onClick={() => handleRateCard(2)}
                      className="p-2 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-500/30 text-xs font-mono"
                    >
                      2 (Hard)
                    </button>
                    <button
                      onClick={() => handleRateCard(3)}
                      className="p-2 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 text-blue-300 border border-blue-500/30 text-xs font-mono"
                    >
                      3 (Good)
                    </button>
                    <button
                      onClick={() => handleRateCard(4)}
                      className="p-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/30 text-xs font-mono"
                    >
                      4 (Easy)
                    </button>
                    <button
                      onClick={() => handleRateCard(5)}
                      className="p-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold"
                    >
                      5 (Perfect)
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center glass-panel rounded-2xl text-slate-400">
              No cards in active queue.
            </div>
          )}
        </div>
      ) : (
        /* Skill Decomposition Tree */
        <div className="p-6 rounded-2xl glass-panel space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">
                Skill Dependency Tree: {currentSkillTree.skillName}
              </h3>
              <p className="text-xs text-slate-400">
                {currentSkillTree.completedHours} of {currentSkillTree.totalHours} legitimate reps
                completed.
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
              {Math.round((currentSkillTree.completedHours / currentSkillTree.totalHours) * 100)}% Mastered
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {currentSkillTree.nodes.map((node, idx) => (
              <div
                key={node.id}
                className={`p-5 rounded-2xl border transition-all ${
                  node.status === "mastered"
                    ? "bg-emerald-950/20 border-emerald-500/40 text-white"
                    : node.status === "in-progress"
                    ? "bg-cyan-950/30 border-cyan-500/50 shadow-glow-cyan"
                    : "bg-slate-900/40 border-slate-800 opacity-60 text-slate-400"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase">Node 0{idx + 1}</span>
                  {node.status === "mastered" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : node.status === "in-progress" ? (
                    <Brain className="w-4 h-4 text-cyan-400 animate-pulse" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-500" />
                  )}
                </div>

                <h4 className="text-sm font-bold text-white mb-1">{node.title}</h4>
                <p className="text-xs text-slate-400 mb-4">{node.description}</p>

                <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px] font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Practice Reps</span>
                    <span className="text-white font-bold">
                      {node.hoursCompleted} / {node.hoursNeeded} hrs
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full"
                      style={{
                        width: `${Math.min(100, (node.hoursCompleted / node.hoursNeeded) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
