"use client";

import React, { useState } from "react";
import { ApexStore } from "@/lib/storage";
import { generateFoundationalWardrobe } from "@/lib/styleEngine";
import { WardrobePiece } from "@/lib/types";
import {
  Shirt,
  Sparkles,
  Palette,
  Layers,
  CheckCircle2,
  DollarSign,
  ShoppingBag,
  RotateCcw,
  Check,
} from "lucide-react";

interface StyleModuleProps {
  store: ApexStore;
  onUpdateStore: (updater: (prev: ApexStore) => ApexStore) => void;
  onSelectAgent: (agentId: string) => void;
}

export const StyleModule: React.FC<StyleModuleProps> = ({ store, onUpdateStore, onSelectAgent }) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("All");

  const { styleProfile, user } = store;

  const handleToggleAcquired = (id: string) => {
    onUpdateStore((prev) => {
      const updatedCapsule = prev.styleProfile.generatedCapsule.map((item) =>
        item.id === id ? { ...item, acquired: !item.acquired } : item
      );
      const acquiredCount = updatedCapsule.filter((x) => x.acquired).length;
      return {
        ...prev,
        styleProfile: {
          ...prev.styleProfile,
          generatedCapsule: updatedCapsule,
        },
        domainScores: prev.domainScores.map((d) =>
          d.domain === "style"
            ? {
                ...d,
                score: Math.min(100, 55 + Math.round((acquiredCount / updatedCapsule.length) * 45)),
                keyMetric: `${prev.styleProfile.seasonPalette} · ${acquiredCount}/${updatedCapsule.length} Acquired`,
              }
            : d
        ),
      };
    });
  };

  const handleRegenerateFromProfile = () => {
    const newStyle = generateFoundationalWardrobe(user);
    onUpdateStore((prev) => ({
      ...prev,
      styleProfile: newStyle,
    }));
    alert("Capsule Wardrobe re-synthesized based on updated physical measurements and skin undertone!");
  };

  const filteredPieces =
    activeCategoryFilter === "All"
      ? styleProfile.generatedCapsule
      : styleProfile.generatedCapsule.filter((p) => p.category === activeCategoryFilter);

  const acquiredTotal = styleProfile.generatedCapsule.filter((p) => p.acquired).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border-amber-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Shirt className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              AI Wardrobe & Style Architect (Zero-Wardrobe Builder)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Built from scratch for your real physical metrics ({user.heightCm}cm, {user.bodyType} build, {user.skinTone} undertone).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRegenerateFromProfile}
            className="px-3.5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono transition flex items-center gap-1.5 shrink-0"
            title="Re-run style algorithm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-compute Palette</span>
          </button>
          <button
            onClick={() => onSelectAgent("agent-style")}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg flex items-center gap-1.5 shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Consult Style AI</span>
          </button>
        </div>
      </div>

      {/* Color Season & Silhouette Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl glass-panel space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Color Season & Palette</span>
            <Palette className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-lg font-bold text-white">{styleProfile.seasonPalette}</div>
          <div className="space-y-1 text-xs">
            <div className="text-slate-400">Optimal Tones:</div>
            <div className="flex flex-wrap gap-1 pt-1">
              {styleProfile.bestColors.map((col, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[11px] font-mono"
                >
                  {col}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Body Silhouette Advice</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-sm font-semibold text-cyan-300">{user.bodyType} Proportions</div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {styleProfile.silhouetteAdvice}
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Capsule Completion</span>
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {acquiredTotal} / {styleProfile.generatedCapsule.length} Pieces
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-400 rounded-full transition-all duration-500"
              style={{
                width: `${Math.round(
                  (acquiredTotal / styleProfile.generatedCapsule.length) * 100
                )}%`,
              }}
            />
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            Check off items as you acquire them to build your foundation.
          </div>
        </div>
      </div>

      {/* Generated Capsule Wardrobe Pieces */}
      <div className="p-6 rounded-3xl glass-panel space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">
              AI-Generated Foundational Capsule (Zero-Wardrobe Blueprint)
            </h3>
            <p className="text-xs text-slate-400">
              High-durability, interchangeable essentials designed specifically for your physical profile.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {["All", "Tops", "Bottoms", "Outerwear", "Footwear"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-mono transition ${
                  activeCategoryFilter === cat
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredPieces.map((piece) => (
            <div
              key={piece.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                piece.acquired
                  ? "bg-emerald-950/20 border-emerald-500/40 text-slate-200"
                  : "bg-slate-900/80 border-slate-800 hover:border-amber-500/40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase mb-2">
                  <span>{piece.category}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300">
                    {piece.priority}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1">{piece.name}</h4>
                <p className="text-xs text-slate-400 mb-3 leading-relaxed">{piece.purpose}</p>

                <div className="space-y-1 text-[11px] font-mono border-t border-slate-800/80 pt-2 mb-3">
                  <div className="flex justify-between text-slate-400">
                    <span>Target Color:</span>
                    <span className="text-amber-300 font-bold">{piece.recommendedColor}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Est. Budget:</span>
                    <span className="text-emerald-400">{piece.budgetEst}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleToggleAcquired(piece.id)}
                className={`w-full py-2 rounded-xl text-xs font-mono transition flex items-center justify-center gap-1.5 border ${
                  piece.acquired
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                }`}
              >
                {piece.acquired ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>In My Wardrobe</span>
                  </>
                ) : (
                  <span>Mark as Acquired</span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
