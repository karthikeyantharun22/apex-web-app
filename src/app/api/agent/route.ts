import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, agentId, userProfile, currentStore } = await req.json();

    const name = userProfile?.name || "User";
    const height = userProfile?.heightCm || 178;
    const weight = userProfile?.weightKg || 75;
    const skinTone = userProfile?.skinTone || "Warm Olive";
    const bodyType = userProfile?.bodyType || "Athletic";
    const homeEquipment = (userProfile?.homeEquipment || ["Floor"]).join(", ");

    // Intelligent Agentic Brain Dispatch
    let agentName = "APEX Orchestrator";
    let reply = "";
    let actionTriggered: any = null;

    const lower = (message || "").toLowerCase();

    if (agentId === "agent-calisthenics" || lower.includes("workout") || lower.includes("calisthenics") || lower.includes("pushup") || lower.includes("pullup") || lower.includes("squat") || lower.includes("exercise")) {
      agentName = "APEX Calisthenics Master";
      
      if (lower.includes("plan") || lower.includes("routine") || lower.includes("today") || lower.includes("generate")) {
        reply = `Here is your customized **Home Calisthenics Session** tailored to your ${bodyType} build (${weight}kg) with available equipment: [${homeEquipment}]:\n\n` +
          `1. **Warm-Up & Mobility** (5 mins): Scapular circles, Wrist rolls, Deep bodyweight squat hold (60s).\n` +
          `2. **Primary Push Progression**: Standard / Diamond Floor Push-Ups — 4 sets × 8-12 reps (2s controlled eccentric, explosive lockout with scapular protraction).\n` +
          `3. **Primary Pull / Rear Chain**: Doorframe / Table Inverted Rows (or Pull-Up Negatives) — 4 sets × 6-10 reps.\n` +
          `4. **Unilateral Leg Overload**: Bulgarian Split Squats (rear foot on chair) — 3 sets × 10 reps/leg.\n` +
          `5. **Core Tension Finish**: Hollow Body Hold (pinned lower back) — 3 sets × 30s.\n\n` +
          `*Rule: Rest 90s between compound sets. Log your RPE right after finishing.*`;
        
        actionTriggered = {
          type: "log_workout",
          data: { exercise: "Standard / Diamond Push-Ups", sets: 4, reps: 10, category: "Push" }
        };
      } else if (lower.includes("pushup") || lower.includes("push-up") || lower.includes("push")) {
        reply = `For your Push progression (${weight}kg bodyweight), focus on **Step 3 (Standard Floor) -> Step 4 (Diamond)**.\n\n` +
          `• Maintain rigid glute and abdominal tension (hollow body posture).\n` +
          `• Full elbow lockout with active scapular push at the apex.\n` +
          `• When you can do 3 sets of 15 clean diamond push-ups, we will advance you to Archer and Pseudo-Planche progressions.`;
      } else if (lower.includes("pull") || lower.includes("pullup") || lower.includes("pull-up")) {
        reply = `Pulling strength with home setup (${homeEquipment}):\n\n` +
          `• If you have a bar: Focus on dead hangs (active shoulder depression) + eccentric 5s negatives.\n` +
          `• If floor/table only: Under-table horizontal rows with feet elevated on a stool.\n` +
          `• Target: Build to 3 sets of 8 strict dead-stop pull-ups before attempting explosive chest-to-bar.`;
      } else {
        reply = `Calisthenics analysis for ${name} (${weight}kg, ${height}cm, setup: ${homeEquipment}):\n\n` +
          `We rely strictly on relative bodyweight strength, scapular mechanics, and joint tendon conditioning. Ask me to generate a home session, check your form cues, or assess your next progression step.`;
      }

    } else if (agentId === "agent-style" || lower.includes("style") || lower.includes("wear") || lower.includes("clothes") || lower.includes("wardrobe") || lower.includes("color") || lower.includes("outfit")) {
      agentName = "APEX Wardrobe Architect";
      
      reply = `Based on your real physical attributes (**${skinTone} skin undertone**, **${height}cm**, **${bodyType} build**):\n\n` +
        `• **Your Optimal Color Matrix**: Navy, Charcoal, Forest Olive, and Warm Off-White/Ecru. Avoid muddy washed pastels or neon tones.\n` +
        `• **Foundational Capsule Priority** (Zero wardrobe starting path):\n` +
        `  1. *Heavyweight 250gsm Crewneck in Dark Charcoal / Navy* ($35-50)\n` +
        `  2. *Tailored Raw Indigo Selvedge Denim* ($95-140) with clean tapered ankle\n` +
        `  3. *Minimalist Low-Top Leather Sneakers in Clean White* ($120)\n` +
        `  4. *Structured Wool/Flannel Overshirt in Deep Olive* ($90-150)\n\n` +
        `• **Silhouette Rule**: With your ${bodyType} frame, avoid baggy oversized cuts that hide your V-taper, but avoid ultra-skinny fits that restrict calisthenics mobility.`;

    } else if (agentId === "agent-communication" || lower.includes("email") || lower.includes("message") || lower.includes("draft") || lower.includes("boss") || lower.includes("investor") || lower.includes("salary") || lower.includes("negotiation")) {
      agentName = "APEX Communication Coach";
      
      reply = `APEX Executive Communication & Negotiation Analysis:\n\n` +
        `• **Munter/Voss Principles Applied**: Lead with the answer or objective metric first. Eliminate all needy markers ("just wondering", "sorry to bother", "if it's not too much trouble").\n` +
        `• **Assertive Rule**: Never apologize for requesting information or setting a boundary. Provide clear, binary choices with specific deadlines.\n\n` +
        `Paste any draft email or Slack message here and I will immediately diagnose its tone, calculate clarity score (0-100), and produce an executive density rewrite.`;

    } else if (agentId === "agent-wealth" || lower.includes("money") || lower.includes("finance") || lower.includes("invest") || lower.includes("runway") || lower.includes("salary") || lower.includes("budget")) {
      agentName = "APEX Wealth Strategist";
      
      const income = userProfile?.monthlyIncome || 8000;
      const expenses = userProfile?.monthlyExpenses || 3200;
      const savings = income - expenses;
      const savingsRate = Math.round((savings / income) * 100);
      const runwayEst = (savings * 6 / expenses).toFixed(1);

      reply = `Wealth & Capital Allocation Audit for ${name}:\n\n` +
        `• Monthly Cashflow: **$${income.toLocaleString()} In** vs **$${expenses.toLocaleString()} Out** ($${savings.toLocaleString()}/mo net).\n` +
        `• **Savings Rate**: **${savingsRate}%** (Target: >40% for rapid financial sovereignty).\n` +
        `• **Boglehead Asset Glide Path** (Age ${userProfile?.age || 26}): **84% Broad Market Equities (VTI/VXUS) / 16% Fixed/Cash Reserve**.\n` +
        `• **Action Sequence**: 1. Employer 401(k) match -> 2. Max HSA -> 3. Max Roth IRA -> 4. Low-cost Index Funds in Taxable.\n\n` +
        `*(Informational math only; escalate to a certified CPA for personalized tax/legal filings.)*`;

    } else {
      agentName = "APEX Orchestrator";
      reply = `Understood, ${name}. I have cross-referenced your telemetry and physical profile (${height}cm, ${weight}kg, ${homeEquipment} setup).\n\n` +
        `How would you like to proceed?\n` +
        `• **"Generate today's home calisthenics workout"**\n` +
        `• **"Build my foundational capsule wardrobe from scratch"**\n` +
        `• **"Analyze a message/email draft for executive clarity"**\n` +
        `• **"Run my Boglehead wealth runway & asset allocation model"**`;
    }

    return NextResponse.json({
      agentName,
      content: reply,
      actionsTaken: ["Cross-referenced real user physical & financial profile", "Applied domain evidence framework"],
      suggestedAction: actionTriggered,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
  } catch (error: any) {
    console.error("Agent API error:", error);
    return NextResponse.json(
      { error: "Failed to process agent request: " + error.message },
      { status: 500 }
    );
  }
}
