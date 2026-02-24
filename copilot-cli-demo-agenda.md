# Scott Hanselman — GitHub Copilot CLI Session Agenda & Demo Plan

**Source:** Microsoft MCAPS Tech Connect, February 10-12, 2026
**Goal:** Reproduce the same talking points and demos for a customer conversation.

---

## Agenda / Talk Flow

### 1. Opening — The Three Levels of AI (Conceptual Foundation)
**Key message:** Before showing tools, ground the customer in *how* this works.

- **Chatbots** → Chatbots that can **call tools** → Chatbots that **do stuff while you sleep** (agentic loops)
- Live demo: Simple chatbot on localhost:3001
  - "Complete this sentence: It's a beautiful day, let's go to the ___"
  - Show **log probs** (probabilities behind token selection) — it's a prediction engine, not a fact engine
  - Add personal context (name, location, family) → watch the prediction shift to near-100% certainty
- **Takeaway for customer:** Context is everything. Semantics of words carry weight. It's a "stochastic parrot" — amazing, but not magic. Understanding fundamentals prevents over-reliance.

### 2. Demo: GIF Compression — The Agentic Loop in Action
**Key message:** The distance between intent and execution is now nearly zero.

- Start GitHub Copilot CLI in a temp folder with an 11 MB GIF
- Natural language prompt: *"I've got an 11MB GIF, squish it to 2MB"*
- Show the tool-approval flow (permission prompts for each action)
- Watch it discover FFmpeg, try multiple strategies (scale, color reduction, FPS drop)
- Result: 11 MB → 1.8 MB automatically
- Mention **`/yolo`** mode (auto-approve all tool actions — fun but risky)
- **Takeaway:** Anyone *could* do this manually, but the CLI took ambiguous English prose and turned it into a multi-step engineering solution.

### 3. Demo: Script Generation & Skills
**Key message:** One-off solutions become reusable automation.

- Follow-up prompt: *"Write me a PowerShell script that always gets any GIF under 2MB"*
- Show the generated script includes documentation, error handling, progressive quality reduction, binary search for optimal quality
- Introduce **Skills** (`/skills`):
  - Show existing skills list
  - Convert the new compress-GIF script into a skill
  - Skill appears in `~/.copilot/skills/` and can be shared/uploaded
- **Takeaway:** Think → Do → Automate → Share. The CLI creates a flywheel from ad-hoc tasks to reusable organizational tools.

### 4. Demo: Resume Sessions & Cross-Domain Data Mashup (Blood Sugar + Meetings)
**Key message:** You can "just do stuff" — connect unrelated data sources effortlessly.

- `copilot --resume` to resume a prior session
- Blood sugar skill: REST API → MongoDB in Azure → real-time glucose data
- Prompt: *"What do my meetings look like today?"* — calls Microsoft Graph via MCP (Work IQ)
- Mashup: Align blood sugar data with meeting schedule → "Meeting Stress Table"
  - e.g., "Innovation Leader's Lunch: walked in at 105, came out at 183 — massive spike"
- Generate a full CGM report as a self-contained HTML file (JS + CSS inline)
- **Takeaway for customer:** MCP servers are "USB for AI" — just a bundle of tools with a standard interface. Combine any data sources. If you do it often, make it a skill, then schedule it.

### 5. Key Feature: Infinite Sessions & Context Management
**Key message:** GitHub Copilot CLI handles long-running work without "getting dumb."

- `/context` — check token usage
- ~200K token context window (1M Claude Opus coming)
- **Infinite sessions**: CLI auto-compresses, takes notes, preserves session state in markdown
- Sessions have run as long as 12 hours without degradation

### 6. Demo: Multi-Model Support & Task Swarming
**Key message:** One subscription, all models, parallel work.

- `/model` — switch between Claude (all variants), Gemini, Codex
- `/tasks` — run the same task across multiple models simultaneously ("swarm")
  - Example: Code review of a ring-light app — ask multiple models to find issues
  - "Pick only the things they agree on" — consensus-based review
- **Ring Light app story:** Simple concept (white square on screen) becomes complex engineering (multi-monitor, multi-DPI, HDR, resolution changes)
- **Takeaway:** You're not locked into one model. Swarming gives you multi-perspective analysis.

### 7. Demo: Delegate to Cloud & Fleet
**Key message:** Scale from local CLI to cloud-based agents.

- `/delegate` — push tasks to GitHub cloud (coding agent jobs)
  - File issues via GitHub CLI, assign to Copilot coding agent
- `/fleet` — swarm across multiple issues/PRs in parallel
  - Example: Baby Smash app — two Dependabot PRs handled in parallel, each on its own branch
  - Both builds verified before pushing
- **Agent HQ in VS Code** — see all sessions, choose where to run (local / background / cloud)
- **Takeaway:** Boring maintenance work gets automated. You still need to understand the fundamentals ("know how to drive manual shift"), but the toil is eliminated.

### 8. Operational Modes
**Key message:** Different modes for different workflows.

- **Plan mode** (Shift+Tab → blue) — "Don't touch anything, just plan." Conversation about approach before execution.
- **Autopilot mode** — "Ralph Wiggum loop" — give it a spec or tests, it keeps going until done
- **Shell mode** — direct terminal interaction

### 9. Demo: Vibe Coding & The "Mid" Problem
**Key message:** AI output is statistically average by design — expertise and steering still matter.

- Tiny Tool Town website — looks like "the statistical mean of every website you've ever seen"
- Podcast admin backend — 15 min/week of manual JSON editing → vibed a full admin UI
  - Dashboard, sponsor management, head-shot cropping with auto-crop
  - "It's mid, and I don't feel bad about it" — right tool for the job
- GeoCities-style site as fun demo (web rings, guest books, broken links)
- **Takeaway:** Without steering and expertise, you get "park" or "beach" — the obvious answer. Design, creativity, and domain knowledge are what elevate the output.

### 10. Demo: Connect/Status Report Generation
**Key message:** Practical personal productivity.

- Feed meetings + Connect goals → AI generates impact-aligned status report
- Identifies wasted time, off-track goals, and areas of focus
- "Meetings are not work. Meetings are toil. Shipping stuff and solving problems — that's interesting."

### 11. Closing — Responsible AI & Grounding
**Key message:** Always ground your AI solutions.

- Return to the chatbot: ask about Brad Pitt (grounded, correct) vs. Scott Hanselman (ungrounded, fabricated)
- Show log probs on wrong answers — the model is uncertain but still guesses
- **"If it doesn't know, it should say no"** — critical for business scenarios
- Every solution should have **responsible AI** at its heart

---

## Demos to Prepare

| # | Demo | What You Need |
|---|------|--------------|
| 1 | Chatbot with log probs | Simple LLM chatbot on localhost with log-prob visualization (colored tokens) |
| 2 | GIF compression | Large GIF file (11MB+), FFmpeg installed, GitHub Copilot CLI |
| 3 | Script generation → Skill | Continue from demo 2, show `/skills` |
| 4 | Blood sugar + meetings | REST API data source (or substitute), MCP server for Graph/calendar, `/resume` |
| 5 | Multi-model & swarming | A sample app with known issues, `/model`, `/tasks` |
| 6 | Delegate & Fleet | GitHub repo with open issues/PRs (e.g., Dependabot), `/delegate`, `/fleet` |
| 7 | Agent HQ in VS Code | VS Code with Copilot extension, show session management |
| 8 | Vibe-coded apps | Ring light app, Tiny Tool Town, podcast admin backend (or your own equivalents) |
| 9 | Grounding demo | Chatbot from demo 1 — ask about famous vs. obscure people |

## Key Copilot CLI Commands Referenced

- `/yolo` — auto-approve all tool/path/URL requests
- `/skills` — list and manage skills
- `/model` — switch AI models (Claude, Gemini, Codex)
- `/tasks` — run tasks across multiple models (swarming)
- `/delegate` — push work to cloud agents
- `/fleet` — parallel multi-issue/PR processing
- `/context` — check token usage
- `/sessions` — view session history and usage
- `--resume` — resume a previous session
- `--experimental` — enable unreleased features
- **Shift+Tab** — switch between Plan / Autopilot / Shell modes

## Key Talking Points for Customer Conversations

1. **"It's a parrot, and parrots are amazing"** — Set expectations. It predicts tokens, it doesn't think. But prediction at scale is transformative.
2. **Context is everything** — More context = better results. Feed it your codebase, your specs, your data.
3. **Think → Do → Automate → Share** — The workflow flywheel: solve it once interactively, script it, make it a skill, share it.
4. **One subscription, all models** — Claude, Gemini, Codex all included. No vendor lock-in on the model layer.
5. **"The distance between intent and execution is nearly zero"** — English is the new programming language for ambiguous tasks.
6. **Boring stuff gets automated, expertise still matters** — You still need to know how to drive stick. The AI handles toil, humans steer.
7. **Responsible AI is non-negotiable** — Ground your data, handle unknowns gracefully, don't ship hallucinations to customers.
8. **MCP = USB for AI** — Demystify the jargon. It's just a standard interface for tools.
