# Project audit

A read-only check. Do not fix what you find without permission — except for an audit inside an already confirmed `APPLY` command.

## Structure

- Starter Kit files sit directly in the root; there is no accidental nested copy of the project.
- Required files exist: `AGENTS.md`, `README.md`, `.gitignore`, `.starter-kit/VERSION`, `.starter-kit/config`, `.starter-kit/preflight.sh`, the documents in `docs/`, the flows in `prompts/`.
- Internal links and paths are consistent.
- No system junk; caches and dependencies follow the policy.

## Setup

- The START mode is recorded, the summary applied, all 13 blocks covered.
- Significant data has a source; agent inferences are not marked as confirmed.
- The working language is defined.
- Every deferred question lists the allowed work, the blocked action and the event to revisit it.
- Unknown permission for a dangerous action is treated as "no".
- `README.md` describes the project and does not contradict `docs/PROJECT_CONTEXT.md` and `docs/STATUS.md`.
- The `PROJECT-RULES` section in `AGENTS.md` is filled; the safety sections are unchanged.
- Context, policy, status and `.starter-kit/config` do not contradict each other.
- Extensions are listed in `docs/INTEGRATIONS.md` or explicitly deferred.

## Git and security

- `.gitignore` excludes the agreed secret paths; `.env.example` is not excluded.
- `.starter-kit/preflight.sh` runs without `STOP` (if Git is initialized).
- Visibility, `origin` and branch are agreed, or Git actions are explicitly blocked.
- Large files are listed before a commit.

## Handoff score (0–10)

Clarity of the goal; clarity of the boundaries; freshness of the state; visibility of decisions; clarity of the next step; safety; Git readiness; reproducibility of extensions; readiness for a new agent.

## Report

Scores; readiness level (glossary in `docs/PROJECT_POLICY.md`); gaps with severity; allowed work; blocked actions; concrete fixes.
