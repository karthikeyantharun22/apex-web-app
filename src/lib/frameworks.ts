// Scientific frameworks and algorithmic models powering APEX

export const FRAMEWORKS = {
  body: {
    title: "NSCA / ACSM Strength & Hypertrophy Guidelines",
    citation: "American College of Sports Medicine (2009); Schoenfeld et al. (2016)",
    calculate1RM: (weightKg: number, reps: number): number => {
      if (reps <= 1) return weightKg;
      // Brzycki formula: 1RM = Weight / (1.0278 - (0.0278 * Reps))
      return Math.round(weightKg / (1.0278 - 0.0278 * reps));
    },
    evaluateSafety: (deficitPercent: number, weightChangeKgPerWeek: number) => {
      if (deficitPercent > 28) {
        return {
          safe: false,
          pushback: "FLAG: Caloric deficit >28% violates lean-mass retention thresholds. Accelerates muscle catabolism and hormonal down-regulation (Helms et al., 2014). Recommended cap: 20-22%.",
          referralNeeded: false,
        };
      }
      if (weightChangeKgPerWeek > 1.2) {
        return {
          safe: false,
          pushback: "FLAG: Weight drop >1.2kg/week indicates acute dehydration or excessive caloric restriction. Cap rate of loss at 0.5-1.0% bodyweight/week.",
          referralNeeded: false,
        };
      }
      return { safe: true, pushback: null, referralNeeded: false };
    },
  },

  finance: {
    title: "Bogleheads 3-Fund Portfolio & Age-Based Glide Path",
    citation: "Bogle, John C. (2007); Malkiel, B. (A Random Walk Down Wall Street)",
    calculateOptimalEquity: (age: number): number => {
      // 110 - age rule for modern life expectancy
      return Math.max(40, Math.min(90, 110 - age));
    },
    calculateRunwayMonths: (liquidCash: number, monthlyExpenses: number): number => {
      if (monthlyExpenses <= 0) return 12;
      return Number((liquidCash / monthlyExpenses).toFixed(1));
    },
    taxWaterfall: [
      "1. 401(k) / Employer match up to 100% (Instant guaranteed 50-100% ROI)",
      "2. Max out HSA (Triple tax-advantaged healthcare asset)",
      "3. Max out Roth IRA / Backdoor Roth ($7,000 annual threshold)",
      "4. Max out remaining employer 401(k) limit ($23,000 threshold)",
      "5. Low-cost Broad Market Index Funds in Taxable Brokerage (VTI/VXUS)",
    ],
  },

  communication: {
    title: "Assertive Outcome-Oriented Protocol (Munter / Voss)",
    citation: "Munter, M. (Guide to Managerial Communication); Voss, C. (Never Split the Difference)",
    analyzeTone: (text: string) => {
      const lower = text.toLowerCase();
      const needy = [
        "just wondering",
        "sorry to bother",
        "does that make sense",
        "if it's not too much trouble",
        "no worries if not",
        "hope you don't mind",
      ].filter((p) => lower.includes(p));

      const defensive = [
        "obviously",
        "i already told you",
        "as per my previous",
        "with all due respect",
        "you didn't read",
      ].filter((p) => lower.includes(p));

      const vague = [
        "maybe we could",
        "at some point",
        "sometime next week",
        "let's touch base",
        "circle back",
      ].filter((p) => lower.includes(p));

      let score = 100 - needy.length * 15 - defensive.length * 20 - vague.length * 10;
      score = Math.max(20, Math.min(100, score));

      return {
        score,
        needy,
        defensive,
        vague,
      };
    },
  },

  learning: {
    title: "SuperMemo SM-2 & Active Recall Intervals",
    citation: "Wozniak, P. (1990); Roediger & Karpicke (2006, Psychological Science)",
    calculateNextInterval: (reps: number, qualityRating: number, prevInterval: number, easeFactor: number) => {
      // Quality: 1 (blackout) to 5 (perfect recall)
      let nextEase = easeFactor + (0.1 - (5 - qualityRating) * (0.08 + (5 - qualityRating) * 0.02));
      if (nextEase < 1.3) nextEase = 1.3;

      let nextInterval: number;
      if (qualityRating < 3) {
        nextInterval = 1;
        reps = 0;
      } else {
        if (reps === 0) nextInterval = 1;
        else if (reps === 1) nextInterval = 6;
        else nextInterval = Math.round(prevInterval * nextEase);
        reps += 1;
      }

      return {
        nextInterval,
        nextEase: Number(nextEase.toFixed(2)),
        reps,
      };
    },
  },
};
