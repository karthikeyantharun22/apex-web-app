export type LifeDomain =
  | "body"
  | "style"
  | "communication"
  | "finance"
  | "knowledge"
  | "habits";

export interface DomainScore {
  domain: LifeDomain;
  name: string;
  score: number; // 0-100
  trend: number; // e.g. +3.5%
  framework: string;
  keyMetric: string;
}

export interface TelemetryLog {
  date: string;
  sleepHours: number;
  sleepScore: number;
  workoutsDone: number;
  screenTimeHours: number;
  productiveMinutes: number;
  savingsRate: number; // e.g. 38%
  activeRecallReps: number;
  moodScore: number; // 1-10
  journalNote: string;
}

export interface WorkoutLog {
  id: string;
  date: string;
  exercise: string;
  sets: number;
  reps: number;
  weightKg: number;
  rpe: number; // Rate of Perceived Exertion (1-10)
  framework: string;
  notes?: string;
}

export interface BodyMetrics {
  currentWeightKg: number;
  targetWeightKg: number;
  dailyCalories: number;
  calorieTarget: number;
  deficitOrSurplus: number;
  proteinGrams: number;
  pushbackWarning?: string;
  recoveryReadiness: number; // 0-100
}

export interface WardrobeItem {
  id: string;
  name: string;
  category: "Tops" | "Bottoms" | "Outerwear" | "Footwear" | "Accessories";
  color: string;
  formality: "Casual" | "Smart Casual" | "Business Formal" | "Athletic";
  season: "All-season" | "Spring/Summer" | "Fall/Winter";
  costPerWear?: number;
}

export interface OutfitSuggestion {
  id: string;
  title: string;
  event: string;
  items: string[];
  rationale: string;
  contrastRule: string;
}

export interface CommunicationDraft {
  id: string;
  timestamp: string;
  recipientContext: string;
  rawDraft: string;
  clarityScore: number; // 0-100
  critique: {
    needyMarkers: string[];
    defensiveMarkers: string[];
    vaguePhrases: string[];
  };
  revisedDraft: string;
  appliedFramework: string;
}

export interface FinancialAccount {
  id: string;
  name: string;
  type: "Tax-Advantaged (401k/IRA)" | "HSA" | "Taxable Brokerage" | "High-Yield Cash" | "Debt";
  balance: number;
  targetPercent: number;
  currentPercent: number;
}

export interface Flashcard {
  id: string;
  deck: string;
  prompt: string;
  answer: string;
  intervalDays: number;
  easeFactor: number;
  reps: number;
  dueDate: string; // YYYY-MM-DD
  state: "new" | "learning" | "review" | "mastered";
}

export interface SkillNode {
  id: string;
  title: string;
  description: string;
  hoursNeeded: number;
  hoursCompleted: number;
  status: "locked" | "in-progress" | "mastered";
  prerequisites: string[];
}

export interface SkillTree {
  id: string;
  skillName: string;
  category: string;
  totalHours: number;
  completedHours: number;
  nodes: SkillNode[];
}

export interface SubAgent {
  id: string;
  name: string;
  role: string;
  icon: string;
  status: "active" | "standby";
  systemPrompt: string;
  tools: string[];
  guardrailsInherited: boolean;
  queriesHandled: number;
  lastProposal?: string;
}

export interface RetroProposal {
  id: string;
  date: string;
  title: string;
  domain: LifeDomain | "system";
  observation: string;
  proposedChange: string;
  impactHypothesis: string;
  status: "pending" | "approved" | "rejected";
}

export interface ConnectorStatus {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  lastSynced: string;
  scope: string;
  permissionGranted: boolean;
}
