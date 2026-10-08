# Setup and apply

## General rules

- Cover all 13 blocks of `docs/PROJECT_QUESTIONNAIRE.md` in the chosen way. After the first recorded block, set the status to `IN PROGRESS`.
- Every significant value gets a source, every rule a status (glossary in `docs/PROJECT_POLICY.md`). Never call an agent's inference confirmed.
- A contradiction that affects safety or the current result is resolved before applying. A low-risk unknown is deferred.
- Unknown permission for a risky action is always `BLOCKED`.

## Modes

**Guided.** Ask 3–5 questions at a time, as cards. Show blocks where recommendations suffice as one "accept / change" summary.

**Quick.** Ask only the ★ questions. Fill the rest with safe values and do not hide them in the summary.

**No brief.**

1. Read-only analysis of the structure, README, configurations, sources, documents and Git state.
2. Record only facts with an observable basis (`INFERRED` + path).
3. For reversible internal settings — safe values (`DEFAULT`).
4. Unknowns — `DEFERRED`; permissions for risky actions — `BLOCKED`.
5. Form a working name and description from context and mark them `INFERRED`.
6. Ask a question only for a contradiction that prevents safe setup.

## Final summary

When all blocks are covered:

1. Set the status to `AWAITING APPLY`.
2. Show: the mode; the project passport with sources; accepted and changed rules; deferred decisions and blocked actions; language and Git policy; secret paths; the large file threshold; check commands; the preliminary readiness level.
3. List the files that will be filled, including a full replacement of `README.md`.
4. Warn that creating a repository, publishing and deploying do not happen at this stage.
5. Ask for a separate `APPLY` command.

## After the APPLY command

The command allows writing the configuration into the project files. It does not allow creating a repository, publishing, deploying or other external actions.

1. `docs/PROJECT_CONTEXT.md` — no invented facts, with sources.
2. `README.md` — **replace it completely** with the project's README: name, what it is, for whom, current stage, structure, how to run and check (mark unknowns as such), links to `docs/PROJECT_CONTEXT.md`, `docs/STATUS.md` and `docs/HOW_IT_WORKS.md`. Do not keep the `AI Project Starter Kit` heading. You may add the line "This project is managed with AI Project Starter Kit".
3. `docs/PROJECT_POLICY.md` — status and source of every rule; for blocked ones — the specific action.
4. `AGENTS.md` — fill only the section between the `PROJECT-RULES` markers; do not remove safety rules.
5. `.gitignore` — add confirmed or discovered secret paths and the decisions on caches and dependencies. Do not add a guessed path without a basis.
6. `.env.example` — variable names only. `docs/SECRETS.md` — a map without values.
7. `.starter-kit/config` and the table in `docs/GIT_POLICY.md` — known values; leave unknown ones empty (the script will then block pushes).
8. `docs/INTEGRATIONS.md` — discovered or chosen extensions, or an explicit "none found".
9. `docs/RECOVERY.md` — additional recovery materials, if any.
10. `docs/decisions/0001-project-rules-and-structure.md` from `DECISION_TEMPLATE.md`, and a line in the `docs/decisions/README.md` index.
11. `docs/STATUS.md` — date, mode, readiness level, current work, deferred decisions, blocked actions, next step.
12. Questionnaire status `COMPLETE` (means "summary applied", not "everything is known").
13. Audit with `prompts/02-audit-project.md`; fix gaps found within the applied summary.
14. `docs/INITIALIZATION_REPORT.md`.

## Final report

Project and root; mode; amount of data per source; accepted and changed rules; deferred decisions; blocked actions; audit result; readiness level; what's next — usually a work task or Git setup via `prompts/03-setup-git-github.md`.
