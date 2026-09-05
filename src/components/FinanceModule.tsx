"use client";

import React, { useState } from "react";
import { ApexStore } from "@/lib/storage";
import { FRAMEWORKS } from "@/lib/frameworks";
import {
  TrendingUp,
  ShieldAlert,
  PiggyBank,
  PieChart,
  DollarSign,
  Plus,
  ArrowUpRight,
  Info,
  Layers,
  AlertTriangle,
} from "lucide-react";

interface FinanceModuleProps {
  store: ApexStore;
  onUpdateStore: (updater: (prev: ApexStore) => ApexStore) => void;
}

export const FinanceModule: React.FC<FinanceModuleProps> = ({ store, onUpdateStore }) => {
  const [income, setIncome] = useState(store.monthlyFinances.monthlyIncome.toString());
  const [expenses, setExpenses] = useState(store.monthlyFinances.monthlyExpenses.toString());
  const [investments, setInvestments] = useState(
    store.monthlyFinances.monthlyInvestments.toString()
  );
  const [age, setAge] = useState(store.monthlyFinances.userAge.toString());

  const incomeNum = parseFloat(income) || 12500;
  const expensesNum = parseFloat(expenses) || 4800;
  const investmentsNum = parseFloat(investments) || 5800;
  const ageNum = parseInt(age) || 29;

  const totalNetWorth = store.accounts.reduce((acc, a) => acc + a.balance, 0);
  const liquidCash =
    store.accounts
      .filter((a) => a.type === "High-Yield Cash")
      .reduce((acc, a) => acc + a.balance, 0) || 28000;

  const runwayMonths = FRAMEWORKS.finance.calculateRunwayMonths(liquidCash, expensesNum);
  const optimalEquity = FRAMEWORKS.finance.calculateOptimalEquity(ageNum);
  const savingsRate = Math.round(((incomeNum - expensesNum) / incomeNum) * 100);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border-emerald-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Wealth & Capital Allocation Engine
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Governed by {FRAMEWORKS.finance.title}. Mathematical modeling & asset allocation only.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-right">
            <div className="text-[10px] font-mono uppercase text-slate-400">Total Net Worth</div>
            <div className="text-base font-mono font-bold text-emerald-400">
              ${totalNetWorth.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Non-Licensed Disclosure Alert */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
        <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-200 block mb-0.5">
            Informational Scope Disclosure
          </span>
          <p>
            APEX computes mathematical asset allocations and savings glide paths. It does not provide
            licensed legal, tax, or investment advice. For complex estate planning or jurisdiction-specific
            tax filings, escalate to a certified CPA.
          </p>
        </div>
      </div>

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Liquid Runway</span>
            <PiggyBank className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-300">{runwayMonths} Months</div>
          <p className="text-xs text-slate-400">
            ${liquidCash.toLocaleString()} cash reserve at ${expensesNum.toLocaleString()}/mo burn.
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Calculated Savings Rate</span>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-300">{savingsRate}%</div>
          <p className="text-xs text-slate-400">
            Target benchmark: &gt;40% for rapid financial independence.
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Glide Path Target</span>
            <PieChart className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300">
            {optimalEquity}% Equities / {100 - optimalEquity}% Fixed
          </div>
          <p className="text-xs text-slate-400">
            Age {ageNum} glide path (110 - age formula).
          </p>
        </div>
      </div>

      {/* Asset Allocation & Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Balances Table */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Asset Allocation Portfolio</h3>
            <span className="text-xs font-mono text-slate-400">Local-First Vault</span>
          </div>

          <div className="space-y-3">
            {store.accounts.map((acc) => (
              <div
                key={acc.id}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="text-sm font-semibold text-white">{acc.name}</div>
                  <div className="text-[11px] font-mono text-slate-400">{acc.type}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-bold text-emerald-300">
                    ${acc.balance.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    {acc.currentPercent}% (Target: {acc.targetPercent}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tax-Advantaged Waterfall Hierarchy */}
        <div className="p-6 rounded-2xl glass-panel space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Tax-Efficiency Waterfall</h3>
            </div>
            <span className="text-xs font-mono text-emerald-400">Sequential Rule</span>
          </div>

          <p className="text-xs text-slate-400">
            Mathematical sequence for deploying capital to minimize drag:
          </p>

          <div className="space-y-2.5">
            {FRAMEWORKS.finance.taxWaterfall.map((step, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs text-slate-300 font-sans"
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
