import {
  UserProfile,
  DomainScore,
  TelemetryLog,
  CalisthenicsWorkoutLog,
  StyleCapsuleProfile,
  AgentChatMessage,
  CommunicationDraft,
  Flashcard,
  SkillNode,
  SubAgentDefinition,
} from "./types";
import { generateFoundationalWardrobe } from "./styleEngine";

export interface ApexStore {
  user: UserProfile;
  domainScores: DomainScore[];
  telemetryLogs: TelemetryLog[];
  calisthenicsLogs: CalisthenicsWorkoutLog[];
  currentPushStep: number; // 1-6
  currentPullStep: number; // 1-6
  currentLegStep: number; // 1-5
  currentCoreStep: number; // 1-5
  styleProfile: StyleCapsuleProfile;
  chatMessages: AgentChatMessage[];
  drafts: CommunicationDraft[];
  flashcards: Flashcard[];
  subAgents: SubAgentDefinition[];
}

export const DEFAULT_UNINITIALIZED_USER: UserProfile = {
  name: "",
  isInitialized: false,
  age: 26,
  gender: "Male",
  heightCm: 178,
  weightKg: 75,
  skinTone: "Warm Olive",
  bodyType: "Athletic",
  primaryGoal: "Master calisthenics (Pistol Squat & Muscle-Up), build foundational wardrobe from zero, compress career progress.",
  homeEquipment: ["Floor", "Pull-up bar", "Resistance bands"],
  monthlyIncome: 8000,
  monthlyExpenses: 3200,
  careerFocus: "Software Engineering & Tech Strategy",
  llmProvider: "built-in",
};

export const INITIAL_SUBAGENTS: SubAgentDefinition[] = [
  {
    id: "agent-calisthenics",
    name: "APEX Calisthenics Master",
    role: "Bodyweight Biomechanics & Progression Coach",
    icon: "Dumbbell",
    domain: "body",
    status: "active",
    systemPrompt:
      "You are the APEX Calisthenics Master. You strictly prescribe bodyweight progressions (Push, Pull, Legs, Core, Planche, Pistol squats, Muscle-ups). You forbid dangerous deficits (>28%) and insist on clean form and progressive volume landmarks.",
  },
  {
    id: "agent-style",
    name: "APEX Wardrobe Architect",
    role: "Visual Presence, Color Theory & Capsule Stylist",
    icon: "Shirt",
    domain: "style",
    status: "active",
    systemPrompt:
      "You are the APEX Style Architect. The user may not have an existing wardrobe; you construct their foundational wardrobe from zero based on their skin undertone, contrast, and height/build measurements.",
  },
  {
    id: "agent-communication",
    name: "APEX Executive Sparring Partner",
    role: "High-Stakes Negotiation & Clarity Coach",
    icon: "MessageSquare",
    domain: "communication",
    status: "active",
    systemPrompt:
      "You are the APEX Communication Coach. You ruthlessly identify needy, defensive, or vague phrases in drafts, and rewrite them with Voss tactical empathy and executive density. Never allow manipulative scripts.",
  },
  {
    id: "agent-wealth",
    name: "APEX Wealth Sentinel",
    role: "Boglehead Allocation & Runway Strategist",
    icon: "TrendingUp",
    domain: "finance",
    status: "active",
    systemPrompt:
      "You are the APEX Wealth Strategist. You calculate runway months, maintain savings rates >40%, and map out 110-age glide path indexing. You always clarify your non-licensed informational scope.",
  },
  {
    id: "agent-learning",
    name: "APEX Mastery Tutor",
    role: "Spaced Repetition & Skill Decomposition Specialist",
    icon: "GraduationCap",
    domain: "knowledge",
    status: "active",
    systemPrompt:
      "You are the APEX Learning Engine. You break down complex domains into dependency trees and convert notes/queries into active recall flashcards.",
  },
];

export function getInitialCleanStore(userProfile?: UserProfile): ApexStore {
  const profile = userProfile || DEFAULT_UNINITIALIZED_USER;
  const styleProfile = generateFoundationalWardrobe(profile);

  return {
    user: profile,
    domainScores: [
      {
        domain: "body",
        name: "Home Calisthenics",
        score: profile.isInitialized ? 78 : 60,
        trend: 0,
        framework: "Gymnastic Bodyweight Progression Tree",
        keyMetric: "Progression Step: Push (Step 3/6) · Pull (Step 2/6)",
      },
      {
        domain: "style",
        name: "Foundational Presence",
        score: profile.isInitialized ? 82 : 55,
        trend: 0,
        framework: "Color Contrast & Body Silhouette Matrix",
        keyMetric: `${styleProfile.seasonPalette} · 0/8 Capsule Acquired`,
      },
      {
        domain: "communication",
        name: "Executive Clarity",
        score: 85,
        trend: 0,
        framework: "Voss Tactical Empathy / Munter Model",
        keyMetric: "0 Needy Markers Detected",
      },
      {
        domain: "finance",
        name: "Runway & Allocation",
        score: 80,
        trend: 0,
        framework: "Bogleheads 3-Fund & 110-Age Glide Path",
        keyMetric: "Runway & Savings Rate Modeled",
      },
      {
        domain: "knowledge",
        name: "Spaced Repetition",
        score: 75,
        trend: 0,
        framework: "SuperMemo SM-2 Active Recall",
        keyMetric: "Daily Reps Queued",
      },
      {
        domain: "habits",
        name: "Recovery Architecture",
        score: 80,
        trend: 0,
        framework: "Walker Circadian Sleep Optimization",
        keyMetric: "Telemetry Tracking Active",
      },
    ],
    telemetryLogs: [],
    calisthenicsLogs: [],
    currentPushStep: 3, // Standard Floor Push-ups
    currentPullStep: 2, // Inverted Rows
    currentLegStep: 2,  // ATG Deep Squats
    currentCoreStep: 2, // Hollow Body Holds
    styleProfile,
    chatMessages: [
      {
        id: "msg-welcome",
        role: "assistant",
        agentName: "APEX Orchestrator",
        content: profile.isInitialized
          ? `Welcome back, ${profile.name}. APEX is synchronized to your real parameters (${profile.heightCm}cm, ${profile.weightKg}kg, ${profile.skinTone} undertone, Home setup: ${profile.homeEquipment.join(", ")}). Which domain are we advancing right now?`
          : "Welcome to APEX — your personal advancement operating system. Please initialize your real physical measurements and setup to unlock your tailored calisthenics tree and custom-built capsule wardrobe.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ],
    drafts: [],
    flashcards: [
      {
        id: "fc-1",
        deck: "Calisthenics Biomechanics",
        question: "Why is scapular protraction and depression critical at the top of a push-up?",
        answer: "It engages the Serratus Anterior, stabilizes the glenohumeral joint, and prepares the shoulder girdle for advanced straight-arm strength (e.g. Planche, L-sit).",
        intervalDays: 1,
        easeFactor: 2.5,
        reps: 0,
        dueDate: new Date().toISOString().split("T")[0],
        state: "new",
      },
    ],
    subAgents: INITIAL_SUBAGENTS,
  };
}

const STORAGE_KEY = "apex_os_real_v2";

export function loadApexStore(): ApexStore {
  if (typeof window === "undefined") return getInitialCleanStore();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const init = getInitialCleanStore();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(init));
      return init;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error loading APEX local storage:", e);
    return getInitialCleanStore();
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
  const fresh = getInitialCleanStore();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
}

export function exportApexBackup(): string {
  const store = loadApexStore();
  return JSON.stringify(store, null, 2);
}
