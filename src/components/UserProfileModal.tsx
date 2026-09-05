"use client";

import React, { useState } from "react";
import { UserProfile } from "@/lib/types";
import { generateFoundationalWardrobe } from "@/lib/styleEngine";
import { ApexStore } from "@/lib/storage";
import {
  User,
  Activity,
  Shirt,
  DollarSign,
  Sparkles,
  CheckCircle2,
  Shield,
  Key,
} from "lucide-react";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
}) => {
  const [name, setName] = useState(currentProfile.name || "Alex");
  const [age, setAge] = useState(currentProfile.age?.toString() || "26");
  const [heightCm, setHeightCm] = useState(currentProfile.heightCm?.toString() || "178");
  const [weightKg, setWeightKg] = useState(currentProfile.weightKg?.toString() || "75");
  const [skinTone, setSkinTone] = useState(currentProfile.skinTone || "Warm Olive");
  const [bodyType, setBodyType] = useState<UserProfile["bodyType"]>(currentProfile.bodyType || "Athletic");
  const [primaryGoal, setPrimaryGoal] = useState(
    currentProfile.primaryGoal || "Master Calisthenics progressions and build a high-impact wardrobe from zero."
  );
  const [homeEquipment, setHomeEquipment] = useState<string[]>(
    currentProfile.homeEquipment || ["Floor", "Pull-up bar", "Resistance bands"]
  );
  const [monthlyIncome, setMonthlyIncome] = useState(
    currentProfile.monthlyIncome?.toString() || "8000"
  );
  const [monthlyExpenses, setMonthlyExpenses] = useState(
    currentProfile.monthlyExpenses?.toString() || "3200"
  );

  if (!isOpen) return null;

  const equipmentOptions = [
    "Floor",
    "Pull-up bar",
    "Dip bars / Parallel bars",
    "Gymnastic rings",
    "Resistance bands",
    "Sturdy chairs / Table",
  ];

  const handleToggleEquipment = (eq: string) => {
    if (homeEquipment.includes(eq)) {
      setHomeEquipment(homeEquipment.filter((x) => x !== eq));
    } else {
      setHomeEquipment([...homeEquipment, eq]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProfile: UserProfile = {
      name: name || "User",
      isInitialized: true,
      age: parseInt(age) || 26,
      gender: "Male",
      heightCm: parseFloat(heightCm) || 178,
      weightKg: parseFloat(weightKg) || 75,
      skinTone,
      bodyType,
      primaryGoal,
      homeEquipment: homeEquipment.length > 0 ? homeEquipment : ["Floor"],
      monthlyIncome: parseFloat(monthlyIncome) || 8000,
      monthlyExpenses: parseFloat(monthlyExpenses) || 3200,
      careerFocus: "Engineering & High-Impact Strategy",
    };

    onSaveProfile(updatedProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/30 shadow-2xl space-y-6 my-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                APEX Real Physical & Telemetry Profile
              </h3>
              <p className="text-xs text-slate-400">
                All AI agents dynamically calibrate their calisthenics routines and wardrobe blueprints to these real values.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Identity & Build */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                Your Name / Alias
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 text-xs text-white font-mono focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 text-xs text-white font-mono focus:border-cyan-400 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Skin Undertone & Body Build */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                Skin Undertone (For AI Color Analysis)
              </label>
              <select
                value={skinTone}
                onChange={(e) => setSkinTone(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 text-xs text-white focus:outline-none"
              >
                <option value="Warm Olive">Warm Olive / Golden Tan</option>
                <option value="Cool Fair">Cool Fair / Rosy</option>
                <option value="Medium Neutral">Medium Neutral / Beige</option>
                <option value="Deep Warm">Deep Warm / Bronze</option>
                <option value="Deep Cool">Deep Cool / Espresso</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                Body Frame Silhouette
              </label>
              <select
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 text-xs text-white focus:outline-none"
              >
                <option value="Athletic">Athletic / V-Taper</option>
                <option value="Lean">Lean / Ectomorph</option>
                <option value="Muscular">Muscular / Dense</option>
                <option value="Stocky">Stocky / Endomorph</option>
                <option value="Slim">Slim / Linear</option>
              </select>
            </div>
          </div>

          {/* Available Home Calisthenics Equipment */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
              Available Home Equipment (Calisthenics Engine adapts to this)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {equipmentOptions.map((eq) => (
                <button
                  type="button"
                  key={eq}
                  onClick={() => handleToggleEquipment(eq)}
                  className={`p-2 rounded-xl text-left text-xs font-mono transition flex items-center justify-between border ${
                    homeEquipment.includes(eq)
                      ? "bg-cyan-950/70 border-cyan-400 text-cyan-300 shadow-glow-cyan"
                      : "bg-slate-900 border-slate-800 text-slate-400"
                  }`}
                >
                  <span className="truncate">{eq}</span>
                  {homeEquipment.includes(eq) && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Monthly Financial Cashflow */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                Monthly Income ($)
              </label>
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                Monthly Fixed Expenses ($)
              </label>
              <input
                type="number"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none"
              />
            </div>
          </div>

          {/* Primary Directive */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
              Your Primary Focus & Goal
            </label>
            <textarea
              rows={2}
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            {currentProfile.isInitialized && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-glow-cyan flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Calibrate APEX to My Real Data</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
