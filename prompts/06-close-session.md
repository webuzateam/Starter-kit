# Closing a session

Runs on the separate `CLOSE SESSION` command. The command grants advance permission to update memory, run checks, create a commit and do a regular push to the agreed `origin` — within the boundaries of section 8 of `AGENTS.md`.

## 1. Update memory

- `docs/STATUS.md`: date, result, readiness level, deferred decisions, blocked actions, next step.
- A session log from `logs/sessions/SESSION_TEMPLATE.md` — if the work was substantive.
- Changelog, decisions, `docs/RECOVERY.md`, `docs/INTEGRATIONS.md` — only if what they describe has changed.

## 2. Checks

- Run the agreed project checks and record the result.
- If checks fail — follow rule TEST-01 in `docs/PROJECT_POLICY.md`.

## 3. Preflight

If Git is not set up — finish with the report and suggest `prompts/03-setup-git-github.md`.

1. `.starter-kit/preflight.sh --push`.
2. `STOP` — stop. Show paths and reasons (without secret values) and the options.
3. `WARN` — assess and mention it in the report.
4. Separately check that no deferred decision blocks the commit or push. Never close a checkpoint by an agent's assumption.

## 4. Commit and push

1. Add all meaningful changes per the Git policy.
2. `git diff --cached --stat` and `git diff --cached --check`.
3. `.starter-kit/preflight.sh --staged` — a final check of the staged set.
4. No changes — do not create a commit.
5. A meaningful commit message.
6. A regular push. Rejected, conflict, diverged history, authentication needed — stop and report; never force push.
7. Check the commit, branch, remote and a clean working tree.

## 5. Report

1. What is complete.
2. Which memory documents were updated.
3. Which files were added, changed, deleted.
4. Checks: passed / failed.
5. Preflight result (secrets, large files, remote, visibility).
6. Branch, remote, commit, push.
7. Readiness level, deferred decisions, the first next step.
