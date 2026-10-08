# Git and GitHub policy

Status: **AWAITING SETUP** — the parameters below are filled during `APPLY` and Git setup.

## Project parameters

A machine-readable copy of these values lives in `.starter-kit/config` and is used by `.starter-kit/preflight.sh`. The values must match.

| Parameter | Value | Source |
|---|---|---|
| Visibility | not agreed | — |
| `origin` | not agreed | — |
| Main branch | `main` (recommended) | `DEFAULT` |
| Large file threshold | 50 MiB | `DEFAULT` |
| `pre-commit` hook | not enabled | — |
| Caches, builds, dependencies | not decided | — |
| Commit when checks fail | not decided | — |

## Purpose

Git keeps the project's history, and the remote repository keeps a durable copy of all meaningful data. It is a backup and a shared source of truth, not temporary storage.

## Core rules

- One independent project — one repository.
- The user chooses visibility. A private repository is recommended. Public — only by explicit choice and after checking the whole history for secrets and personal data.
- Sources, documents, data, results and non-reproducible materials are kept.
- Secrets are always excluded: by path via `.gitignore` and by content via `.starter-kit/preflight.sh`.
- System metadata (`.DS_Store`, `Thumbs.db`) is not project data.
- Caches, builds and reproducible dependencies are excluded only by confirmed decision. `.gitignore` is not used to silently hide meaningful materials.
- Force push, history rewriting, deleting branches and tags, changing `origin` or visibility are never done without explicit permission.

## Initial setup

The order is in `prompts/03-setup-git-github.md`. The first commit is forbidden while `README.md` describes Starter Kit rather than the project. No-brief mode and `APPLY` do not confirm the owner, name, visibility, remote or first push: those need separate explicit consent.

GitHub uses browser authentication via `gh auth login`. Tokens and passwords are never requested in chat.

## Preparing a commit

1. `git status` — review new, modified and deleted files.
2. `.starter-kit/preflight.sh` — secrets, dangerous file names, large files. `STOP` = stop and show the user the path and options; never print the values.
3. Add all meaningful changes per the agreed policy.
4. `git diff --cached --stat` and `git diff --cached --check` — check the contents and whitespace errors.
5. Write a meaningful commit message. Empty commits are never created.

## Large files

`preflight.sh` stops the commit for a file at or above the threshold (50 MiB by default). GitHub rejects files larger than 100 MiB. The agent shows the path, size, type and options: regular Git, Git LFS, compression, splitting, external storage, exclusion. No option is applied automatically.

## Push

Before a push: `.starter-kit/preflight.sh --push` — checks branch, `origin` and visibility against `.starter-kit/config`. Regular push only.

Automation stops on: a suspected secret; an unresolved large file; a mismatch of branch, `origin` or visibility; a conflict or diverged history; a need to force push; lost authentication; a push rejected by the server.

## If a secret got into history

1. Revoke or rotate the credential with its provider immediately — that matters more than cleaning history.
2. Tell the user the path and commit, without the value.
3. Clean history (`git filter-repo` and force push) only by a separate explicit decision of the user.

## Verifying the result

After a push, confirm the branch, commit, remote, successful upload and a clean working tree. Ignored secrets stay local; their values are never shown.
