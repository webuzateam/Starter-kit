# Backup and recovery

How the project is preserved and how to continue after losing the chat, switching agent or account, a new computer or a long break.

## What Git keeps

The remote repository keeps everything that was added, committed and pushed: per the project policy, that is all meaningful data except secrets and files you chose to store elsewhere. Git does not keep empty folders, so working folders contain explanatory `README.md` files.

## What Git does not keep

- Secrets from `.gitignore` — their values live in the user's secure storage; the map is in `docs/SECRETS.md`.
- Uncommitted changes and unpushed commits.
- Files the user decided to store separately, and materials outside the project root.
- Installed plugins, user and global Skills, global MCP settings, OAuth sessions and tokens — their recovery is described in `docs/INTEGRATIONS.md`.

A second independent copy (cloud, external drive) is connected only by the user's decision and is described here once set up.

## Recovery order

Run with the `RECOVER` command (`prompts/07-recovery.md`). The new agent:

1. Reads the files in the order of section 2 of `AGENTS.md`, including `docs/INTEGRATIONS.md`, `docs/GIT_POLICY.md` and this document.
2. Checks the project root, `git status`, branch, last commit and `origin`.
3. Checks that required files exist, without revealing secrets.
4. Determines which extensions need installation, trust or authentication.
5. Writes a report before making any changes.

Until the report is ready, editing files, installing dependencies, committing, pushing and external actions are forbidden.

## Reconstruction report

- what the project is, its goal and boundaries;
- current stage, last completed step and open tasks;
- important decisions, risks and blockers;
- readiness level and deferred decisions;
- Git state;
- state of mandatory extensions;
- the first safe next step.

A deferred question is not an error by itself: check that the related action is blocked and that the event to revisit it is recorded.

## Recovery drill

After first setup and major structural changes: clone the repository into a separate folder, restore secrets safely, run the checks from `docs/PROJECT_CONTEXT.md` and `docs/INTEGRATIONS.md`, and ask a new agent to run `RECOVER`.

The drill succeeds if the new agent, without the old chat, explains the project, names the important files and proposes a correct next step.

Last successful drill: not performed.
