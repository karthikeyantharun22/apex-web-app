export type LifeDomain =
  | "body"
  | "style"
  | "communication"
  | "finance"
  | "knowledge"
  | "habits";

export interface UserProfile {
  name: string;
  isInitialized: boolean;
  age: number;
  gender: string;
  heightCm: number;
  weightKg: number;
  skinTone: string; // e.g. Warm Olive, Fair Cool, Deep Warm, Medium Neutral
  bodyType: "Lean" | "Athletic" | "Muscular" | "Stocky" | "Slim";
  primaryGoal: string;
  homeEquipment: string[]; // e.g. "Pull-up bar", "Dip bars", "Resistance bands", "Floor only"
  monthlyIncome: number;
  monthlyExpenses: number;
  careerFocus: string;
  apiKey?: string; // Optional custom LLM key (e.g. Gemini, OpenAI, Groq, OpenRouter)
  llmProvider?: "built-in" | "gemini" | "groq" | "openai" | "openrouter";
}

export interface DomainScore {
  domain: LifeDomain;
  name: string;
  score: number; // 0-100
  trend: number;
  framework: string;
  keyMetric: string;
}

export interface TelemetryLog {
  id: string;
  date: string;
  sleepHours: number;
  sleepScore: number;
  workoutsDone: number;
  screenTimeHours: number;
  productiveMinutes: number;
  savingsRate: number;
  activeRecallReps: number;
  moodScore: number;
  journalNote: string;
}

// Calisthenics Only
export interface CalisthenicsExercise {
  id: string;
  name: string;
  category: "Push" | "Pull" | "Legs" | "Core" | "Skill";
  level: "Beginner" | "Intermediate" | "Advanced" | "Elite";
  progressionStep: number;
  maxStep: number;
  description: string;
  prerequisites?: string;
  equipmentNeeded: string;
}

export interface CalisthenicsWorkoutLog {
  id: string;
  date: string;
  exerciseName: string;
  category: "Push" | "Pull" | "Legs" | "Core" | "Skill";
  sets: number;
  reps: number;
  holdSeconds?: number;
  difficultyRating: number; // 1-10 RPE
  notes?: string;
}

export interface WardrobePiece {
  id: string;
  name: string;
  category: "Tops" | "Bottoms" | "Outerwear" | "Footwear" | "Accessories";
  recommendedColor: string;
  priority: "Essential" | "Recommended" | "Upgrade";
  purpose: string;
  budgetEst: string;
  matchingPalette: string[];
  acquired: boolean;
}

export interface StyleCapsuleProfile {
  seasonPalette: string;
  contrastProfile: string;
  silhouetteAdvice: string;
  bestColors: string[];
  avoidColors: string[];
  generatedCapsule: WardrobePiece[];
}

export interface AgentChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  agentName?: string;
  content: string;
  timestamp: string;
  actionsTaken?: string[];
  suggestedAction?: {
    type: "log_workout" | "add_wardrobe" | "create_flashcard" | "set_budget";
    data: any;
  };
}

export interface CommunicationDraft {
  id: string;
  timestamp: string;
  recipientContext: string;
  rawDraft: string;
  clarityScore: number;
  needyPhrasesFound: string[];
  defensivePhrasesFound: string[];
  revisedDraft: string;
  frameworkNotes: string;
}

export interface FinancialProfile {
  liquidRunwayMonths: number;
  savingsRatePercent: number;
  monthlyFixed: number;
  monthlySavings: number;
  recommendedEquityPercent: number;
  prioritizedActions: string[];
}

export interface Flashcard {
  id: string;
  deck: string;
  question: string;
  answer: string;
  intervalDays: number;
  easeFactor: number;
  reps: number;
  dueDate: string;
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

export interface SubAgentDefinition {
  id: string;
  name: string;
  role: string;
  icon: string;
  systemPrompt: string;
  domain: LifeDomain;
  status: "active" | "standby";
}
