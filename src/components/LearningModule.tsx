"use client";

import React, { useState } from "react";
import { ApexStore } from "@/lib/storage";
import { FRAMEWORKS } from "@/lib/frameworks";
import { Flashcard } from "@/lib/types";
import {
  GraduationCap,
  Brain,
  RotateCw,
  Plus,
  Sparkles,
} from "lucide-react";

interface LearningModuleProps {
  store: ApexStore;
  onUpdateStore: (updater: (prev: ApexStore) => ApexStore) => void;
}

export const LearningModule: React.FC<LearningModuleProps> = ({ store, onUpdateStore }) => {
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [newDeck, setNewDeck] = useState("System Design");
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const cards = store.flashcards;
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
    }));

    setIsFlipped(false);
    if (cardIndex < cards.length - 1) {
      setCardIndex(cardIndex + 1);
    } else {
      setCardIndex(0);
      alert("Spaced repetition queue complete for this session!");
    }
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    const newCard: Flashcard = {
      id: `fc-${Date.now()}`,
      deck: newDeck,
      question: newQuestion,
      answer: newAnswer,
      intervalDays: 1,
      easeFactor: 2.5,
      reps: 0,
      dueDate: new Date().toISOString().split("T")[0],
      state: "new",
    };

    onUpdateStore((prev) => ({
      ...prev,
      flashcards: [...prev.flashcards, newCard],
    }));

    setNewQuestion("");
    setNewAnswer("");
    setShowAddModal(false);
    alert("New active recall flashcard created!");
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border-cyan-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <GraduationCap className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Learning Engine ("Learn Anything")
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            SuperMemo SM-2 Spaced Repetition + Active Recall algorithms.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-glow-cyan flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Recall Card</span>
        </button>
      </div>

      {/* Spaced Repetition Card */}
      <div className="max-w-2xl mx-auto space-y-6">
        {currentCard ? (
          <div className="p-8 rounded-3xl glass-panel border border-cyan-500/30 shadow-2xl flex flex-col justify-between min-h-[380px] text-center">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-6">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                  Deck: {currentCard.deck}
                </span>
                <span>
                  Card {cardIndex + 1} of {cards.length}
                </span>
              </div>

              <div className="text-lg md:text-xl font-semibold text-white tracking-tight leading-relaxed">
                {currentCard.question}
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
                  className="px-6 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono uppercase tracking-wider transition border border-slate-700 inline-flex items-center gap-2"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Flip &amp; Reveal Answer</span>
                </button>
              </div>
            )}

            {/* SM-2 Rating */}
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
          <div className="p-8 text-center glass-panel rounded-3xl text-slate-400">
            No active cards. Create your first flashcard above!
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg p-6 rounded-3xl glass-panel border border-cyan-500/30 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Create Active Recall Flashcard</h3>
            <form onSubmit={handleAddCard} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Deck Topic
                </label>
                <input
                  type="text"
                  value={newDeck}
                  onChange={(e) => setNewDeck(e.target.value)}
                  placeholder="e.g. Calisthenics Biomechanics, Distributed Systems"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Question / Prompt
                </label>
                <textarea
                  rows={2}
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="e.g. What is the difference between isometric and isotonic muscle contraction?"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Active Recall Answer
                </label>
                <textarea
                  rows={3}
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Concise answer to verify during active recall..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase"
                >
                  Save to SM-2 Deck
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
