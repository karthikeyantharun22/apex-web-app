import {
  DomainScore,
  TelemetryLog,
  WorkoutLog,
  BodyMetrics,
  WardrobeItem,
  OutfitSuggestion,
  CommunicationDraft,
  FinancialAccount,
  Flashcard,
  SkillTree,
  SubAgent,
  RetroProposal,
  ConnectorStatus,
} from "./types";

export interface ApexStore {
  user: {
    name: string;
    level: number;
    streakDays: number;
    currentFocus: string;
  };
  domainScores: DomainScore[];
  telemetryLogs: TelemetryLog[];
  workouts: WorkoutLog[];
  bodyMetrics: BodyMetrics;
  wardrobe: WardrobeItem[];
  outfitSuggestions: OutfitSuggestion[];
  drafts: CommunicationDraft[];
  accounts: FinancialAccount[];
  monthlyFinances: {
    monthlyIncome: number;
    monthlyExpenses: number;
    monthlyInvestments: number;
    userAge: number;
  };
  flashcards: Flashcard[];
  skillTrees: SkillTree[];
  subAgents: SubAgent[];
  retroProposals: RetroProposal[];
  connectors: ConnectorStatus[];
}

export const INITIAL_DATA: ApexStore = {
  user: {
    name: "Alex",
    level: 14,
    streakDays: 42,
    currentFocus: "Hypertrophy Mesocycle 2 & Series-A Pitch Polish",
  },
  domainScores: [
    {
      domain: "body",
      name: "Body & Physique",
      score: 88,
      trend: 4.2,
      framework: "ACSM Hypertrophy Volume Landmarks (MEV -> MRV)",
      keyMetric: "14.2 sets/wk avg across target muscle groups",
    },
    {
      domain: "style",
      name: "Style & Presence",
      score: 82,
      trend: 2.1,
      framework: "Deep Autumn High-Contrast Capsule Matrix",
      keyMetric: "36 curated items, 94% capsule cohesion",
    },
    {
      domain: "communication",
      name: "Communication & Negotiation",
      score: 91,
      trend: 6.5,
      framework: "Voss Tactical Empathy / Munter Executive Density",
      keyMetric: "94/100 draft clarity, 0 needy markers",
    },
    {
      domain: "finance",
      name: "Finance & Wealth",
      score: 85,
      trend: 3.8,
      framework: "Bogleheads 3-Fund Indexing & 110-Age Glide Path",
      keyMetric: "46.5% savings rate, 18.2 mo liquid runway",
    },
    {
      domain: "knowledge",
      name: "Knowledge & Skill Depth",
      score: 89,
      trend: 5.0,
      framework: "SuperMemo SM-2 Spaced Repetition + Active Recall",
      keyMetric: "240 cards active, 91% retention rate",
    },
    {
      domain: "habits",
      name: "Telemetry & Recovery",
      score: 86,
      trend: 1.8,
      framework: "Walker Sleep Architecture (90-min NREM/REM cycles)",
      keyMetric: "7h 48m avg sleep, 89 sleep efficiency",
    },
  ],
  telemetryLogs: [
    {
      date: "2026-09-01",
      sleepHours: 7.8,
      sleepScore: 89,
      workoutsDone: 1,
      screenTimeHours: 4.2,
      productiveMinutes: 320,
      savingsRate: 46,
      activeRecallReps: 24,
      moodScore: 8,
      journalNote: "High energy morning; hit PR on paused bench press; pitch deck reviewed.",
    },
    {
      date: "2026-09-02",
      sleepHours: 8.1,
      sleepScore: 92,
      workoutsDone: 1,
      screenTimeHours: 3.9,
      productiveMinutes: 340,
      savingsRate: 46,
      activeRecallReps: 30,
      moodScore: 9,
      journalNote: "Deep focus session in terminal. Refined negotiation script for board sync.",
    },
    {
      date: "2026-09-03",
      sleepHours: 7.2,
      sleepScore: 82,
      workoutsDone: 0,
      screenTimeHours: 5.1,
      productiveMinutes: 280,
      savingsRate: 46,
      activeRecallReps: 18,
      moodScore: 7,
      journalNote: "Active recovery walk; completed SM-2 flashcard queue.",
    },
    {
      date: "2026-09-04",
      sleepHours: 7.9,
      sleepScore: 90,
      workoutsDone: 1,
      screenTimeHours: 3.7,
      productiveMinutes: 360,
      savingsRate: 47,
      activeRecallReps: 32,
      moodScore: 9,
      journalNote: "Squats 140kg x 6 @ RPE 8. High clarity on system design trade-offs.",
    },
    {
      date: "2026-09-05",
      sleepHours: 8.0,
      sleepScore: 94,
      workoutsDone: 1,
      screenTimeHours: 3.5,
      productiveMinutes: 380,
      savingsRate: 47,
      activeRecallReps: 28,
      moodScore: 9,
      journalNote: "APEX operating system fully optimized and initialized on Mac.",
    },
  ],
  workouts: [
    {
      id: "w-1",
      date: "2026-09-05",
      exercise: "Barbell Back Squat",
      sets: 4,
      reps: 6,
      weightKg: 140,
      rpe: 8,
      framework: "Progressive Overload: +2.5kg vs last microcycle",
      notes: "Clean bar path, parallel depth solid.",
    },
    {
      id: "w-2",
      date: "2026-09-05",
      exercise: "Romanian Deadlift",
      sets: 3,
      reps: 8,
      weightKg: 120,
      rpe: 7.5,
      framework: "Hamstring Volume Landmark (MEV Tier)",
      notes: "Strict hip hinge, loaded stretch in bottom position.",
    },
    {
      id: "w-3",
      date: "2026-09-04",
      exercise: "Paused Incline Dumbbell Press",
      sets: 4,
      reps: 8,
      weightKg: 38,
      rpe: 8.5,
      framework: "Schoenfeld Hypertrophy: 2s stretch pause",
      notes: "Upper chest focus, zero shoulder impingement.",
    },
  ],
  bodyMetrics: {
    currentWeightKg: 78.4,
    targetWeightKg: 76.5,
    dailyCalories: 2350,
    calorieTarget: 2400,
    deficitOrSurplus: -350,
    proteinGrams: 175,
    recoveryReadiness: 94,
  },
  wardrobe: [
    {
      id: "ward-1",
      name: "Charcoal Merino Wool Tailored Overcoat",
      category: "Outerwear",
      color: "Deep Charcoal",
      formality: "Smart Casual",
      season: "Fall/Winter",
      costPerWear: 8.4,
    },
    {
      id: "ward-2",
      name: "Dark Navy Structured Oxford Shirt",
      category: "Tops",
      color: "Navy Blue",
      formality: "Smart Casual",
      season: "All-season",
      costPerWear: 3.2,
    },
    {
      id: "ward-3",
      name: "Tapered Raw Selvedge Denim (14oz)",
      category: "Bottoms",
      color: "Indigo",
      formality: "Casual",
      season: "All-season",
      costPerWear: 1.8,
    },
    {
      id: "ward-4",
      name: "Minimalist Italian White Leather Low-Tops",
      category: "Footwear",
      color: "Matte White",
      formality: "Smart Casual",
      season: "All-season",
      costPerWear: 4.1,
    },
  ],
  outfitSuggestions: [
    {
      id: "out-1",
      title: "Executive Minimalist / Pitch Meeting",
      event: "Investor Sync & High-Impact Presentations",
      items: [
        "Dark Navy Structured Oxford Shirt",
        "Charcoal Merino Wool Tailored Overcoat",
        "Tailored Graphite Wool Trousers",
        "Black Chelsea Leather Boots",
      ],
      rationale:
        "High-contrast color matrix projects quiet authority and precision. Avoids distracting graphics.",
      contrastRule: "High Value Contrast (Navy + Charcoal with Crisp Underlayer)",
    },
    {
      id: "out-2",
      title: "Elevated Architecture / Deep Work",
      event: "Daily Studio / Creative Engineering",
      items: [
        "Heavyweight Mockneck Charcoal Tee",
        "Tapered Raw Selvedge Denim (14oz)",
        "Minimalist Italian White Leather Low-Tops",
      ],
      rationale: "Comfortable range of motion with tailored silhouette. Zero decision fatigue.",
      contrastRule: "Medium Contrast Monochromatic Base with Bright Focal Footwear",
    },
  ],
  drafts: [
    {
      id: "d-1",
      timestamp: "2026-09-05 11:20",
      recipientContext: "Executive Board / Lead Investor",
      rawDraft:
        "Hi guys, just wondering if you might have had a chance to look over the term sheet? Sorry to bother you, I know you're busy! Does the valuation make sense?",
      clarityScore: 48,
      critique: {
        needyMarkers: ["just wondering", "sorry to bother you", "does the valuation make sense"],
        defensiveMarkers: [],
        vaguePhrases: ["look over"],
      },
      revisedDraft:
        "Hi David — Following up on the term sheet sent Tuesday. We are locking the syndicate allocations by Friday 4 PM EST. Let me know if you have any questions before signing.",
      appliedFramework: "Voss Tactical Empathy + Time-Bound Assertiveness (Munter Model)",
    },
  ],
  accounts: [
    {
      id: "acc-1",
      name: "Vanguard Total Stock Market (VTSAX)",
      type: "Tax-Advantaged (401k/IRA)",
      balance: 142000,
      targetPercent: 60,
      currentPercent: 58.5,
    },
    {
      id: "acc-2",
      name: "Vanguard Total Intl Stock (VTIAX)",
      type: "Tax-Advantaged (401k/IRA)",
      balance: 48500,
      targetPercent: 20,
      currentPercent: 20.0,
    },
    {
      id: "acc-3",
      name: "Vanguard Intermediate Bond (VBTLX)",
      type: "Tax-Advantaged (401k/IRA)",
      balance: 24000,
      targetPercent: 10,
      currentPercent: 9.9,
    },
    {
      id: "acc-4",
      name: "High-Yield Reserve (Marcus 5.1%)",
      type: "High-Yield Cash",
      balance: 28000,
      targetPercent: 10,
      currentPercent: 11.6,
    },
  ],
  monthlyFinances: {
    monthlyIncome: 12500,
    monthlyExpenses: 4800,
    monthlyInvestments: 5800,
    userAge: 29,
  },
  flashcards: [
    {
      id: "fc-1",
      deck: "Distributed Systems Architecture",
      prompt: "What is the primary difference between Paxos and Raft consensus algorithms?",
      answer:
        "Raft decomposes consensus into explicit leader election, log replication, and safety; Paxos is symmetric and separates proposer/acceptor roles without requiring a strong leader for progress.",
      intervalDays: 14,
      easeFactor: 2.5,
      reps: 4,
      dueDate: "2026-09-06",
      state: "review",
    },
    {
      id: "fc-2",
      deck: "Exercise Physiology & Biomechanics",
      prompt: "Define Minimum Effective Volume (MEV) vs Maximum Recoverable Volume (MRV).",
      answer:
        "MEV is the lowest volume of training that still stimulates measurable adaptation/growth. MRV is the highest volume from which an athlete can still recover and adapt without overreaching.",
      intervalDays: 21,
      easeFactor: 2.6,
      reps: 5,
      dueDate: "2026-09-08",
      state: "mastered",
    },
    {
      id: "fc-3",
      deck: "Executive Communication",
      prompt: "What is the 'Pyramid Principle' for executive briefings (Barbara Minto)?",
      answer:
        "State the conclusion or key takeaway first (Answer First), followed by grouped and hierarchically summarized supporting arguments, ordered logically (deductive or inductive).",
      intervalDays: 7,
      easeFactor: 2.4,
      reps: 3,
      dueDate: "2026-09-05",
      state: "learning",
    },
  ],
  skillTrees: [
    {
      id: "st-1",
      skillName: "Distributed Systems & Cloud Architecture",
      category: "Engineering",
      totalHours: 200,
      completedHours: 135,
      nodes: [
        {
          id: "n-1",
          title: "Consensus Protocols (Raft/Paxos)",
          description: "Leader election, state machines, quorum slices",
          hoursNeeded: 35,
          hoursCompleted: 35,
          status: "mastered",
          prerequisites: [],
        },
        {
          id: "n-2",
          title: "Distributed Storage & LSM Trees",
          description: "WAL, SSTables, Bloom filters, compaction strategies",
          hoursNeeded: 45,
          hoursCompleted: 45,
          status: "mastered",
          prerequisites: ["n-1"],
        },
        {
          id: "n-3",
          title: "Vector Clocks & CRDTs",
          description: "Conflict-free replicated data types, causal consistency",
          hoursNeeded: 40,
          hoursCompleted: 32,
          status: "in-progress",
          prerequisites: ["n-2"],
        },
        {
          id: "n-4",
          title: "Zero-Downtime Migration Architectures",
          description: "Dual-writing, shadow traffic, backfill verification",
          hoursNeeded: 40,
          hoursCompleted: 15,
          status: "in-progress",
          prerequisites: ["n-3"],
        },
        {
          id: "n-5",
          title: "Formal Verification (TLA+)",
          description: "Model checking distributed specifications",
          hoursNeeded: 40,
          hoursCompleted: 8,
          status: "locked",
          prerequisites: ["n-4"],
        },
      ],
    },
  ],
  subAgents: [
    {
      id: "sub-1",
      name: "APEX Body Coach",
      role: "Hypertrophy & Biomechanics Specialist",
      icon: "Activity",
      status: "active",
      systemPrompt:
        "Blunt, numbers-first, safety-aware coach enforcing NSCA volume landmarks and RPE progressive overload. Never allows caloric deficits >28% without escalation.",
      tools: ["HealthKit Sync", "1RM Calculator", "Volume Tracker", "Plateau Detector"],
      guardrailsInherited: true,
      queriesHandled: 142,
    },
    {
      id: "sub-2",
      name: "APEX Communication Sparring Partner",
      role: "High-Stakes Negotiation & Clarity Coach",
      icon: "MessageSquare",
      status: "active",
      systemPrompt:
        "Warm but relentlessly direct. Identifies needy or passive-aggressive language in drafts. Re-aligns toward assertive brevity. Forbids manipulative scripts.",
      tools: ["Tone Analyzer", "Roleplay Engine", "Brevity Optimizer"],
      guardrailsInherited: true,
      queriesHandled: 89,
    },
    {
      id: "sub-3",
      name: "APEX Wealth Sentinel",
      role: "Asset Allocation & Cash-Flow Auditor",
      icon: "TrendingUp",
      status: "active",
      systemPrompt:
        "Boglehead indexing specialist. Flags fee drag, calculates runway, ensures emergency reserves. Discloses non-licensed informational scope.",
      tools: ["Runway Calculator", "Asset Glide Path Modeler", "Tax Waterfall Engine"],
      guardrailsInherited: true,
      queriesHandled: 64,
    },
  ],
  retroProposals: [
    {
      id: "prop-1",
      date: "2026-09-04",
      title: "Adjust Deload Threshold from 5 to 4 Microcycles",
      domain: "body",
      observation:
        "Last 2 microcycles showed RPE creep on Squats (+1.5 RPE for same load) and reduced sleep recovery score.",
      proposedChange:
        "Inject automatic 1-week volume deload (50% volume, 70% intensity) every 4th microcycle instead of 5th.",
      impactHypothesis:
        "Prevents central nervous system fatigue accumulation and maintains velocity progression.",
      status: "approved",
    },
    {
      id: "prop-2",
      date: "2026-09-05",
      title: "Enforce 20-Min Wind-Down Screen Lockout",
      domain: "habits",
      observation:
        "Screen time logged after 23:00 correlated with a 14% drop in deep sleep telemetry.",
      proposedChange:
        "Trigger high-priority alert at 22:45 suggesting shift to analog reading / journaling.",
      impactHypothesis: "Increases slow-wave sleep duration by estimated 25-35 minutes.",
      status: "pending",
    },
  ],
  connectors: [
    {
      id: "conn-1",
      name: "Apple HealthKit (via Local Bridge)",
      icon: "Heart",
      connected: true,
      lastSynced: "Today, 08:30 AM",
      scope: "Sleep analysis, active energy burn, resting heart rate",
      permissionGranted: true,
    },
    {
      id: "conn-2",
      name: "Screen Time API (Local Category Feed)",
      icon: "Clock",
      connected: true,
      lastSynced: "Today, 14:15 PM",
      scope: "Productive vs non-productive category durations only",
      permissionGranted: true,
    },
    {
      id: "conn-3",
      name: "Calendar (macOS EventKit)",
      icon: "Calendar",
      connected: true,
      lastSynced: "Today, 12:00 PM",
      scope: "Meeting density, focus blocks, scheduled workouts",
      permissionGranted: true,
    },
    {
      id: "conn-4",
      name: "Financial Data Feed (Read-Only Aggregate)",
      icon: "CreditCard",
      connected: true,
      lastSynced: "Yesterday, 23:59 PM",
      scope: "Account balances, monthly cash flow summaries",
      permissionGranted: true,
    },
  ],
};

const STORAGE_KEY = "apex_operating_system_data_v1";

export function loadApexStore(): ApexStore {
  if (typeof window === "undefined") return INITIAL_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
      return INITIAL_DATA;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error loading APEX local storage:", e);
    return INITIAL_DATA;
  }
}

export function saveApexStore(store: ApexStore): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (e) {
    console.error("Error saving APEX local storage:", e);
  }
}

export function resetApexStore(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
}

export function exportApexBackup(): string {
  const store = loadApexStore();
  return JSON.stringify(store, null, 2);
}
