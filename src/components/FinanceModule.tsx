"use client";

import React, { useState } from "react";
import { ApexStore } from "@/lib/storage";
import { FRAMEWORKS } from "@/lib/frameworks";
import {
  TrendingUp,
  PiggyBank,
  PieChart,
  DollarSign,
  Info,
  Layers,
  Sparkles,
} from "lucide-react";

interface FinanceModuleProps {
  store: ApexStore;
  onUpdateStore: (updater: (prev: ApexStore) => ApexStore) => void;
}

export const FinanceModule: React.FC<FinanceModuleProps> = ({ store, onUpdateStore }) => {
  const { user } = store;
  const [income, setIncome] = useState(user.monthlyIncome.toString());
  const [expenses, setExpenses] = useState(user.monthlyExpenses.toString());

  const incomeNum = parseFloat(income) || 8000;
  const expensesNum = parseFloat(expenses) || 3200;
  const savings = incomeNum - expensesNum;
  const savingsRate = Math.round((savings / incomeNum) * 100);
  const liquidRunway = Number(((savings * 6) / (expensesNum || 1)).toFixed(1));
  const optimalEquity = FRAMEWORKS.finance.calculateOptimalEquity(user.age || 26);

  const handleSaveFinances = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStore((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        monthlyIncome: incomeNum,
        monthlyExpenses: expensesNum,
      },
      domainScores: prev.domainScores.map((d) =>
        d.domain === "finance"
          ? {
              ...d,
              score: Math.min(100, Math.max(40, savingsRate * 2)),
              keyMetric: `${savingsRate}% Savings Rate · ${liquidRunway} mo runway`,
            }
          : d
      ),
    }));
    alert("Monthly cashflow & runway re-calculated and saved!");
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border-emerald-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Wealth & Capital Allocation Engine
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Governed by Boglehead 3-Fund Indexing & 110-Age Glide Path models.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-right">
            <div className="text-[10px] font-mono uppercase text-slate-400">Net Free Cashflow</div>
            <div className="text-base font-mono font-bold text-emerald-400">
              ${savings.toLocaleString()}/month
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Scope Disclosure */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
        <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-200 block mb-0.5">
            Informational Scope Disclosure
          </span>
          <p>
            APEX computes mathematical asset allocations and savings glide paths. It does not provide
            licensed legal, tax, or investment advice. Escalate to a certified CPA for filing-specific questions.
          </p>
        </div>
      </div>

      {/* Real Cashflow Modeler Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Savings Rate</span>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-300">{savingsRate}%</div>
          <p className="text-xs text-slate-400">
            {savingsRate >= 40
              ? "✓ Exceeds 40% benchmark for rapid financial independence."
              : "Increase savings rate toward 40% to accelerate sovereignty."}
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Estimated Runway</span>
            <PiggyBank className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-300">{liquidRunway} Months</div>
          <p className="text-xs text-slate-400">
            Based on current ${expensesNum.toLocaleString()}/mo fixed burn rate.
          </p>
        </div>

        <div className="p-6 rounded-3xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Glide Path Allocation</span>
            <PieChart className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300">
            {optimalEquity}% Equities / {100 - optimalEquity}% Fixed
          </div>
          <p className="text-xs text-slate-400">
            Calculated for Age {user.age || 26} (110 - age indexing rule).
          </p>
        </div>
      </div>

      {/* Form to update cashflow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl glass-panel space-y-4">
          <h3 className="text-base font-bold text-white">Update Real Monthly Cashflow</h3>
          <form onSubmit={handleSaveFinances} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                Monthly Inflow ($)
              </label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                Monthly Fixed Expenses ($)
              </label>
              <input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-mono focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition"
            >
              Re-calculate Allocation &amp; Save
            </button>
          </form>
        </div>

        {/* Tax Efficiency Hierarchy */}
        <div className="p-6 rounded-3xl glass-panel space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Tax-Advantaged Waterfall</h3>
          </div>
          <div className="space-y-2">
            {FRAMEWORKS.finance.taxWaterfall.map((step, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-sans"
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
