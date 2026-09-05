# Architecture — APEX (built via Antigravity)

## 1. High-level stack
- **Shell**: Native macOS app, SwiftUI, packaged via Xcode. Antigravity used as the agentic dev environment to scaffold/iterate the codebase itself (i.e., you use Antigravity's coding agent to *build* APEX — it isn't a runtime component of APEX).
- **Embedded visualization layer**: WKWebView hosting a Three.js/WebGL app for the 3D dashboard, communicating with the Swift shell over a JS bridge.
- **Agent runtime**: Local orchestrator process (Python or Node) implementing a tool-calling loop against Claude (Sonnet-class model for reasoning-heavy coaching, Haiku-class for fast/cheap logging classification).
- **Data layer**: SQLite for structured logs (workouts, finances, learning), local vector DB (e.g., Chroma/LanceDB) for journal/semantic memory, all encrypted at rest (macOS Keychain-backed encryption key).
- **Connectors** (each independently toggled in Settings → Data Sources):
  - Apple HealthKit (sleep, steps, workouts)
  - Screen Time API (categories only, not raw content, unless user explicitly widens scope)
  - Calendar (read-only)
  - Bank/broker via Plaid-equivalent read-only aggregator
  - Manual journal / photo capture (local folder, on-device only)

## 2. Core loop (per module)
```
Ingest (connector or manual log)
   → Normalize (module-specific schema)
   → Analyze (LLM + domain heuristics/frameworks)
   → Recommend (concrete next action, cited framework/source)
   → Log outcome (did the user do it? what happened?)
   → Weekly retro job compares recommended vs. actual outcome
   → Retro output feeds the "Improvement Proposals" queue
```

## 3. "Self-improvement" — the real version
A scheduled job (weekly) runs an internal review agent that:
1. Reads the past week's logs across all modules.
2. Diffs recommended actions vs. actual results.
3. Identifies systematic misses (e.g., "sleep predictions are consistently off," "finance advice ignored 3 weeks running").
4. Drafts a concrete proposal: new prompt version, new connector, new UI panel, adjusted algorithm parameters.
5. Surfaces the proposal in-app for one-click approve/reject. Approved proposals are applied as versioned config/prompt updates (git-committed locally), giving a real, auditable "the agent got better" history — without ever claiming the underlying model rewrote itself.

## 4. Agent Factory subsystem
- Template library of agent "shapes" (research agent, tracker agent, planner agent, coach agent) with pre-wired tool permissions.
- New-agent wizard: user states purpose → system proposes scope, data access needed, and a draft system prompt → user reviews/edits → agent is instantiated as a new module with its own settings panel and log store.
- Hard rule baked into every generated sub-agent's system prompt: same non-negotiables as the parent (no covert data access, no medical/financial advice beyond frameworks, retains ability to push back).

## 5. Security & privacy
- All financial/health data encrypted at rest; no data leaves device except: (a) LLM API calls (text/image sent per-request, not stored by the app after response), (b) explicit user-approved cloud sync/backup.
- Full data export/delete tool in Settings (own-your-data principle).

## 6. Build sequencing (recommended, not everything-at-once)
1. Core shell + local data layer + manual logging for one module (recommend: Learning Engine or Body Coach — fastest to a usable daily loop).
2. Dashboard visualization layer.
3. Second and third modules.
4. Connectors (Health, Calendar, Screen Time).
5. Weekly retro + improvement-proposal loop.
6. Agent Factory (only once the base loop is proven useful daily — building a factory for agents before you have one working agent is a common way these projects stall).
