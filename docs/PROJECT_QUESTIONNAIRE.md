# First-run questionnaire

Protocol: **START v2** — three modes: **guided**, **quick**, **no brief**.

Setup status: **NOT STARTED**

Selected mode: **NOT SELECTED**

This file is both the questionnaire and the record of first-run answers. The agent fills it after `START`, giving the source of every significant answer (glossary in `docs/PROJECT_POLICY.md`). Secret values are never written here.

## How setup works

- **Guided (recommended).** The agent goes through all 13 blocks. Questions without a safe default are asked as cards; blocks where the recommendations are enough are shown as one "accept / change" summary.
- **Quick.** The agent asks only the key questions marked ★ (there are 7), fills the rest with safe values and shows them in the final summary.
- **No brief.** The agent studies the files without changing them, records facts with their basis, applies safe values and defers the unknown. A question is asked only for a contradiction that prevents safe setup.

In every mode, covering a block does not mean the user must answer every question: `Don't know / decide later` is always available. Once all blocks are covered, the agent shows the final summary and waits for a separate `APPLY` command.

## Progress

| Block | Status | Without the user's answer |
|---|---|---|
| 1. Project passport | Not started | Working description from context, marked `INFERRED` |
| 2. Languages | Not started | Language of the current conversation |
| 3. Boundaries and structure | Not started | Derived from files |
| 4. Technologies and checks | Not started | Derived from files or deferred |
| 5. Sources of truth | Not started | Order from `AGENTS.md` |
| 6. AI behaviour | Not started | The strictest option |
| 7. Documentation | Not started | Standard level |
| 8. Git and GitHub | Not started | Git actions blocked until decided |
| 9. Secrets | Not started | Base `.gitignore` + content check |
| 10. Large files | Not started | 50 MiB threshold, the user decides |
| 11. Closing a session | Not started | Standard command boundaries |
| 12. Recovery | Not started | Standard order |
| 13. Report format | Not started | Standard report |

## Block 1. Project passport

Why: the name, goal and audience help the agent tell useful work from accidental scope creep. The agent first suggests wording based on context.

1. ★ What is the project called and what does it do (one paragraph)?
2. What problem does it solve and what end result is needed?
3. ★ Who is it for, and what stage is it at: idea, prototype, development, operation, archive?

### Recorded data

Filled during `START`.

## Block 2. Languages and localization

Why: choosing a scheme early prevents mixed languages and needless renaming.

1. ★ Main language of the interface and materials?
2. Are other languages needed now or later, and how should translations be stored?
3. Which language for code, comments and technical documentation?

Default: the language of the current conversation; product, repository and path names without language suffixes.

### Recorded data

Filled during `START`.

## Block 3. Boundaries and structure

Why: boundaries protect other people's files and show where the agent works autonomously.

1. What is in the project and what is explicitly out?
2. Are there important materials outside the open folder?
3. Where are sources, data and results?

Default: Starter Kit sits directly in the root; work goes in `src/`, results in `outputs/`; external materials are described but not copied without permission.

### Recorded data

Filled during `START`.

## Block 4. Technologies, extensions and checks

Why: defines the tools, how to run things and the observable criterion of "task done".

1. ★ Project type, technologies and run/check commands (tests, build, linter)?
2. Are Skills, plugins or MCP servers needed; which are mandatory after a clone?
3. What does "task complete" mean?

Default: no mandatory extensions; completion criteria from `docs/PROJECT_CONTEXT.md`.

### Recorded data

Filled during `START`.

## Block 5. Sources of truth

Why: a single order stops an outdated chat or log from overriding the current state of the project.

Confirm or change the order in section 3 of `AGENTS.md`.

### Recorded data

Filled during `START`.

## Block 6. AI behaviour

Why: sets autonomy boundaries. Without an answer the strictest option applies.

1. ★ Are there actions or areas of the project the agent must not touch, or only with confirmation?
2. May software and dependencies be installed without asking?

Default: reading, analysis, task edits and checks — allowed; everything in section 4 of `AGENTS.md` — only with permission; installing — only with permission.

### Recorded data

Filled during `START`.

## Block 7. Documentation

Why: keeps decisions and state without turning memory into a copy of the chat.

1. Session log level: brief, standard or detailed?
2. When to update the changelog and create decisions?

Default: standard log (request, result, files, checks, decisions, risks, next step); changelog — only user-visible changes; a decision — only for a significant choice.

### Recorded data

Filled during `START`.

## Block 8. Git and GitHub

Why: Git should keep the project without leaking secrets or pushing to the wrong place. Unknown parameters do not stop internal work but block Git actions.

1. ★ New or existing repository? Visibility: **private (recommended)** or public?
2. Owner and repository name, main branch?
3. What to do with caches, builds and dependencies (`node_modules`, `.venv`, `dist`, etc.)?
4. Team or personal project: block commits when checks fail?
5. Enable the `pre-commit` Git hook that runs `.starter-kit/preflight.sh` automatically?

Default: one private repository; branch `main`; system junk excluded; reproducible dependencies excluded only by confirmed decision; in a personal project state is saved even if a check fails, but the failure is recorded explicitly.

Public repository: before the first push the agent additionally checks the whole history and all files for secrets and personal data, and the user confirms publication separately.

### Recorded data

Filled during `START`.

## Block 9. Secrets

Why: secrets live not only in `.env`, so both a path map and a content check are needed. Secret values are never requested.

1. ★ Where are files with secrets (`.env`, keys, credentials, service accounts)?
2. Where do you keep the values themselves for recovery (password manager, team vault)?

Default: the base Starter Kit `.gitignore` and a content check before every commit.

### Recorded data

Filled during `START`.

## Block 10. Large files

Why: large binaries can break a push. GitHub rejects files larger than 100 MiB.

1. Are there databases, archives, videos, models, etc.? What warning threshold?
2. Are Git LFS or external storage acceptable?

Default: 50 MiB threshold; Git LFS is not enabled and files are not excluded automatically; the user decides.

### Recorded data

Filled during `START`.

## Block 11. Closing a session

Why: `CLOSE SESSION` must grant a precise, limited permission.

Confirm the boundaries in section 8 of `AGENTS.md`: memory, checks, commit and a regular push to the agreed `origin` — without asking again; deploying, publishing, deleting, force pushing, changing the remote or visibility — never.

### Recorded data

Filled during `START`.

## Block 12. Recovery

Why: a new agent or computer must be able to resume work without the old chat.

1. Which materials, besides Git, are critical for recovery?
2. Who confirms that work continues after reconstruction?

Default: the order in `docs/RECOVERY.md`; a recovery check after major structural changes.

### Recorded data

Filled during `START`.

## Block 13. Report format

Why: a uniform report makes results quick to verify.

1. Brief or detailed report? Show commit, branch and remote?

Default: the standard report from section 9 of `AGENTS.md`.

### Recorded data

Filled during `START`.

## Final summary

Formed once all blocks are covered: START mode, project passport with sources, accepted and changed rules, deferred decisions, blocked actions, preliminary readiness level, list of files to be filled.

## Deferred decisions and checkpoints

Filled during `START`. For each item: what is unknown; why it is deferred; which work is allowed; which action is blocked; on what event to revisit the question.
