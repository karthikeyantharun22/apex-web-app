"use client";

import React, { useState } from "react";
import { ApexStore } from "@/lib/storage";
import { WardrobeItem, OutfitSuggestion } from "@/lib/types";
import {
  Shirt,
  Sparkles,
  Palette,
  Layers,
  Plus,
  Tag,
  CheckCircle2,
  Calendar,
  DollarSign,
} from "lucide-react";

interface StyleModuleProps {
  store: ApexStore;
  onUpdateStore: (updater: (prev: ApexStore) => ApexStore) => void;
}

export const StyleModule: React.FC<StyleModuleProps> = ({ store, onUpdateStore }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showAddModal, setShowAddModal] = useState(false);

  // New Item State
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState<WardrobeItem["category"]>("Tops");
  const [itemColor, setItemColor] = useState("Dark Charcoal");
  const [itemFormality, setItemFormality] = useState<WardrobeItem["formality"]>("Smart Casual");
  const [itemCost, setItemCost] = useState("120");

  const categories = ["All", "Tops", "Bottoms", "Outerwear", "Footwear", "Accessories"];

  const filteredWardrobe =
    selectedCategory === "All"
      ? store.wardrobe
      : store.wardrobe.filter((w) => w.category === selectedCategory);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: WardrobeItem = {
      id: `ward-${Date.now()}`,
      name: itemName,
      category: itemCategory,
      color: itemColor,
      formality: itemFormality,
      season: "All-season",
      costPerWear: parseFloat(itemCost) ? parseFloat(itemCost) / 30 : 4.0,
    };

    onUpdateStore((prev) => ({
      ...prev,
      wardrobe: [newItem, ...prev.wardrobe],
    }));

    setItemName("");
    setShowAddModal(false);
    alert("Item added to Capsule Wardrobe.");
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border-amber-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Shirt className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Style & Image Architecture
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Governed by Seasonal Color Harmony & High-Contrast Capsule Formulation. Zero decision fatigue.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Wardrobe Piece</span>
        </button>
      </div>

      {/* Color Profile & Matrix Callout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Color Season</span>
            <Palette className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-white">Deep Autumn / Cool Olive</div>
          <p className="text-xs text-slate-400">
            High-contrast value pairing. Optimal palette: Charcoal, Midnight Navy, Camel, Forest Green.
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Capsule Cohesion</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-cyan-300">94% Inter-compatibility</div>
          <p className="text-xs text-slate-400">
            Every top pairs with at least 3 bottoms and 2 outer layers seamlessly.
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Avg Cost per Wear</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-emerald-300">$4.12 / wear</div>
          <p className="text-xs text-slate-400">
            High durability fabrics (Merino, Raw Denim, Full-grain Italian leather).
          </p>
        </div>
      </div>

      {/* Generated Outfit Archetypes */}
      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-base font-bold text-white">
              Event-Based Capsule Configurations
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Algorithmic Assembly</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {store.outfitSuggestions.map((outfit) => (
            <div
              key={outfit.id}
              className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{outfit.title}</h4>
                  <div className="text-xs text-amber-400 font-mono mt-0.5">{outfit.event}</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Ready
                </span>
              </div>

              <div className="space-y-1.5 border-y border-slate-800 py-3">
                {outfit.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-slate-400 italic">
                {outfit.rationale}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wardrobe Inventory Table & Filter */}
      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white">Active Capsule Inventory</h3>
            <p className="text-xs text-slate-400">
              Curated items cataloged in your private local-first vault.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition ${
                  selectedCategory === cat
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {filteredWardrobe.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase mb-2">
                  <span>{item.category}</span>
                  <span>{item.season}</span>
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-2">{item.name}</h4>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  <span>{item.color}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>{item.formality}</span>
                <span className="text-emerald-400">${item.costPerWear}/wear</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-2xl glass-panel border border-amber-500/30 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Add Capsule Item</h3>
            <form onSubmit={handleAddItem} className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  Item Description
                </label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g. Navy Italian Merino Knit"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                    Category
                  </label>
                  <select
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Tops">Tops</option>
                    <option value="Bottoms">Bottoms</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                    Formality
                  </label>
                  <select
                    value={itemFormality}
                    onChange={(e) => setItemFormality(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Casual">Casual</option>
                    <option value="Smart Casual">Smart Casual</option>
                    <option value="Business Formal">Business Formal</option>
                    <option value="Athletic">Athletic</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                    Color
                  </label>
                  <input
                    type="text"
                    value={itemColor}
                    onChange={(e) => setItemColor(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                    Cost ($)
                  </label>
                  <input
                    type="number"
                    value={itemCost}
                    onChange={(e) => setItemCost(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
