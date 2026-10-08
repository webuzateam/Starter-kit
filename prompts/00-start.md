# The START command

Runs only when `START` is sent as a separate message. Protocol **START v2**: exactly three modes — **guided**, **quick**, **no brief**. Do not offer other modes.

## 1. Determine the state (change nothing)

Read `AGENTS.md`, `docs/PROJECT_QUESTIONNAIRE.md`, `docs/STATUS.md`, `.starter-kit/VERSION`. Check the actual root, that there is no extra nested folder, and whether a Git repository exists.

- `COMPLETE` — do not repeat setup. Briefly show the goal, readiness level, checkpoints relevant to the next step, and offer to start work. To revisit rules — `CHANGE RULES`.
- `IN PROGRESS` — continue the chosen mode from the saved block.
- `AWAITING APPLY` — do not repeat the questions: show the summary and remind about `APPLY`.
- `NOT STARTED` — go to step 2.

If the folder already contains project materials (code, documents), mention that they will stay untouched and will be taken into account during setup.

## 2. A short introduction

Explain in simple words, without copying `docs/HOW_IT_WORKS.md`:

- project memory lives in files, so any agent can continue the work;
- the path: `START → mode → summary → APPLY → work → CLOSE SESSION`;
- until `APPLY` the agent changes nothing in the project except recording answers in the questionnaire;
- risky actions (publishing, deleting, changing the remote, force pushing) always require your permission;
- a detailed explanation for beginners — `docs/HOW_IT_WORKS.md`.

## 3. Offer the mode and wait for a choice

1. **Guided — recommended.** Step by step, with explanations and answer options. About 10–15 minutes.
2. **Quick.** 7 key questions, the rest are safe values. About 3–5 minutes.
3. **No brief.** The agent studies the files and defers the unknown. Suits an existing project.

No mode allows the agent to approve risky actions on its own.

## 4. Run the setup

Follow `prompts/01-initialize-project.md`. Question format — section 5 of `AGENTS.md`. For open facts (name, goal), first suggest 1–2 wordings based on context. Do not ask for secret values, do not invent facts, give the source of every significant answer.
