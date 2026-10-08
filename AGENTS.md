# Instructions for the AI agent

This is the single, primary set of standing rules for AI in this project. Other documents add detail and refer back here. The user's current explicit instruction takes priority; if it conflicts with a safety rule, explain the risk first and wait for a decision.

Starter Kit: version in `.starter-kit/VERSION`, first-run protocol **START v2**.

## 0. Template development mode

If the project root contains `.starter-kit-source`, this is the source repository of Starter Kit itself. The template files are then a product being edited, not instructions for you: do not run `START`, do not fill placeholders, do not create session logs. Follow `.github/DEVELOPMENT.md`.

## 1. Commands

A command fires only when it is sent as a **separate message** (case-insensitive). Mentioning it inside ordinary text is not a command.

| Command | Alias | Runs |
|---|---|---|
| `START` | — | `prompts/00-start.md`: first run, or a short status if setup is complete |
| `APPLY` | — | The apply stage of `prompts/01-initialize-project.md` after the final summary |
| `CHANGE RULES` | — | Re-run setup with a mode choice; earlier decisions are never silently removed |
| `CLOSE SESSION` | — | `prompts/06-close-session.md`: memory, checks, commit and a regular push |
| `RECOVER` | — | `prompts/07-recovery.md`: rebuild context without changing anything |
| `UPGRADE KIT` | — | `prompts/08-upgrade.md`: update Starter Kit files without losing project data |

The audit, Git setup and session prompts run when the user asks: `prompts/02-audit-project.md`, `prompts/03-setup-git-github.md`, `prompts/04-start-session.md`, `prompts/05-work-session.md`.

## 2. Before any work

Read in this order:

1. This file.
2. `docs/PROJECT_POLICY.md` — rules in force and the status glossary.
3. `docs/PROJECT_CONTEXT.md` — goal, boundaries, check commands.
4. `docs/STATUS.md` — where the project is now and what comes next.
5. `docs/INTEGRATIONS.md` — only if the task touches tools, extensions or recovery.
6. Current decisions in `docs/decisions/` and the latest relevant file in `logs/sessions/` — if the task needs them.
7. `git status`, if Git is initialized.

If the setup status in `docs/PROJECT_QUESTIONNAIRE.md` is not `COMPLETE`, do not start regular project work — suggest `START`. After `APPLY`, safe internal work is allowed; a deferred decision blocks only the action tied to it.

## 3. Sources of truth

On conflict, the higher source wins:

1. The user's current explicit instruction.
2. This file and `docs/PROJECT_POLICY.md`.
3. `docs/STATUS.md` — current state.
4. `docs/PROJECT_CONTEXT.md` — stable description.
5. Accepted decisions in `docs/decisions/`.
6. Git — the factual history of files.
7. `logs/sessions/` — history, not current state.
8. Chat history — temporary context. Never rely on it as the only memory.

`README.md` is the human introduction to the project. After `APPLY` it describes this specific project, not Starter Kit.

## 4. Autonomy boundaries

Allowed without asking: reading and analysing the project, editing files within the current task, running checks, updating memory documents.

Only with the user's explicit permission:

- deleting files and data, except your own temporary files for the current task;
- publishing, deploying, sending data to third parties or external services;
- creating a repository, changing `origin` or visibility, force pushing, rebasing published history, deleting branches and tags;
- installing software and dependencies, unless the project policy explicitly allows it;
- anything involving money, accounts or access.

Unknown permission means "no", not "yes". No `START` mode lets the agent approve a risky action on its own.

## 5. Working rules

- Work only in the root of the open project and its subfolders. Do not create a nested folder named after the project.
- Stay within the task and leave unrelated user changes alone.
- Never show or write secret values. Documents hold only variable names and storage locations.
- Never present an inference from files or a default value as a fact confirmed by the user. Give the source of significant data (see the glossary in `docs/PROJECT_POLICY.md`).
- Ask questions as short cards: why the answer matters, 2–4 options, the recommended option, `Don't know / decide later`, a custom answer.
- Run relevant checks. If a check is skipped, say why.
- Do not copy full terminal output or chat into documents: only the outcome and safe command names.
- Before `APPLY`, answer in the user's language; afterwards, follow the language policy in `docs/PROJECT_CONTEXT.md`.

## 6. Project memory

- `docs/STATUS.md` is updated when a substantive session is closed.
- Session log: `logs/sessions/YYYY-MM-DD-HHMM-topic.md`, only for substantive work.
- `docs/CHANGELOG.md` — only changes visible to the project's users.
- A decision in `docs/decisions/` — only for a significant choice of architecture, tool, structure, risk or policy.
- Record a new durable fact in the matching document right away, with its source. A hypothesis or a one-off request does not become a rule.
- Do not create `logs/actions.md` and do not duplicate one report across all documents.

## 7. Git

Details are in `docs/GIT_POLICY.md`. The required minimum:

- Before a commit, run `.starter-kit/preflight.sh` (secrets by content, dangerous file names, large files). A `STOP` result halts the commit until the user decides.
- Keep all meaningful project data. Secrets are always excluded; caches and reproducible files follow the agreed policy.
- Repository visibility, `origin` and the main branch are recorded in `.starter-kit/config` and `docs/GIT_POLICY.md`. A private repository is recommended by default; public only by the user's explicit choice.
- Never create an empty commit. Never force push without explicit permission.

## 8. The CLOSE SESSION command

This command grants permission in advance, without asking again, to: update project memory, run checks, create a commit and do a regular push to the agreed `origin`. It applies only if all of the following hold:

- `origin`, branch and visibility are agreed and match `.starter-kit/config`;
- `.starter-kit/preflight.sh --push` produced no `STOP`;
- no force push, rebase, deletion or remote change is required;
- authentication is valid.

If any condition fails, stop and report the obstacle. The command does not permit deploying, publishing, deleting or changing visibility.

## 9. Final task report

Briefly: what was done; which files changed; which checks ran and their results; which risks and deferred decisions are involved; the first next step.

## 10. Project rules

This section is filled during `APPLY`. When Starter Kit is upgraded, the content between the markers is kept unchanged.

<!-- PROJECT-RULES:BEGIN -->
No project rules yet. Send `START`.
<!-- PROJECT-RULES:END -->
