# PRD — "APEX" Personal Advancement Agent (Mac-native, Antigravity build)

## 1. Vision
A local-first, Mac-native agentic system whose sole objective is to compress the time it takes one specific individual to reach the top tier of the life domains that matter to them — appearance, physical capability, communication, finances, and knowledge — by replacing guesswork with data, feedback loops, and expert-grade frameworks. It is not a chatbot with a nice UI; it is an operating layer over the user's actual life.

## 2. Non-negotiable design principles
- **Local-first**: all personal data lives on-device (SQLite/DuckDB + local vector store) unless the user explicitly opts a category into cloud sync.
- **Consent-based access, not silent surveillance**: every data source (calendar, screen time, media apps, health app, bank/broker read-only feeds) is connected via an explicit, revocable permission grant, visible in a "Data Sources" settings pane. Nothing runs invisibly in the background without that.
- **Judgment, not compliance**: the agent is built to disagree with the user when the data says a plan is unsafe, unsustainable, or financially reckless. This is a feature, not friction — a coach who never pushes back is worthless as a coach.
- **Continuous-improvement loop, not self-modifying weights**: the system logs outcomes, runs scheduled retros, and proposes concrete upgrades (new modules, better prompts, new integrations) that the user approves before they ship. This is what "gets smarter over time" means in a system that's actually real.

## 3. Primary user
One individual, using this on their own Mac, wanting compressed, structured progress across body, style, communication, money, and knowledge — with a single coherent dashboard instead of six different apps.

## 4. Flagship modules

### 4.1 Body & Physique Coach
- Ingests: bodyweight, sleep (via Health app export/HealthKit bridge), workout logs, progress photos (local, on-device analysis only), lift numbers.
- Uses published, cited strength & hypertrophy science (progressive overload, volume landmarks, recovery modeling à la research from NSCA/ACSM-aligned literature) — not made-up numbers. Agent cites its source framework per plan, and flags when a request (e.g., extreme calorie deficits, unsafe loading jumps) crosses into needing a doctor/PT, and says so instead of complying anyway.
- Calisthenics + weights progression trees, deload logic, plateau detection from logged data trends.

### 4.2 Style & Image
- Wardrobe capture (photograph what you own), body-type and color-analysis based on well-established styling frameworks, event-based outfit generation, shopping list generation with budget constraints tied into the Finance module.

### 4.3 Communication & Social Skills
- Analyzes (opt-in, user-pasted or connected) chat/email drafts for tone, clarity, confidence markers; roleplay/practice mode for difficult conversations; public-speaking and small-talk drilling with spaced repetition.
- Explicitly avoids manufacturing deceptive "pickup"-style manipulation scripts — builds genuine social competence (listening, storytelling, boundaries) instead, because manipulative scripts break down under real relationships and the agent won't help you get good at something that backfires on you.

### 4.4 Finance & Investing
- Net-worth and cash-flow dashboard from read-only bank/broker connections (Plaid-style) or manual entry.
- Automated savings-rate and asset-allocation frameworks (e.g., age-based glide paths, expense-ratio comparisons), tax-advantaged account prioritization logic (401k/IRA-equivalent in user's country).
- **Explicit disclosure**: it gives frameworks, math, and comparisons — not licensed financial advice — and says so in-app, because that's the accurate description of what any AI system can responsibly give you.

### 4.5 Learning Engine ("Learn Anything")
- Spaced-repetition + active-recall core (like Anki, but agent-generated cards from whatever the user is studying).
- Skill-decomposition planner: takes any target skill, breaks it into a dependency tree, sequences the fastest legitimate path (still real practice hours — no framework skips the requirement of doing the reps), tracks mastery per node.

### 4.6 Life Telemetry & Dashboard
- Unified daily/weekly/monthly dashboard: sleep, workouts, screen time, money, learning streaks, mood/journal sentiment trends.
- Every data source is an explicit opt-in connector (Screen Time API, Apple Health, calendar, manually-logged journal) — never a blanket "read everything on the Mac."

### 4.7 Agent Factory
- A meta-module: user describes a new specialized need ("I want an agent just for meal-prep planning"), and APEX scaffolds a new sub-agent (prompt, tool access, UI panel) from a template library, then lets the user review/approve before it goes live.

## 5. UI/UX requirements
- Native macOS app (SwiftUI shell) with an embedded high-end web layer (WebGL/Three.js or Metal-backed) for 3D data visualizations — e.g., a rotating "life sphere" showing domain scores, animated progress trends, not flat dashboards.
- Command-palette style quick-entry (⌘K) for fast logging.
- Dark, cinematic default theme; motion design on state transitions; no generic Bootstrap-style defaults.

## 6. Explicit out-of-scope / guardrails
- No covert or blanket device surveillance.
- No medical diagnosis, prescription, or treatment claims — refers out to licensed professionals when a request needs one.
- No manipulative/deceptive social scripts.
- No autonomous self-modification of the model itself; self-improvement = logged feedback → proposed upgrade → user approval → shipped update.

## 7. Success metrics
- Weekly active logging rate, goal-completion rate per domain, user-reported time-to-milestone vs. baseline estimate, retention of the improvement-proposal loop (are proposed upgrades actually getting approved and used).
