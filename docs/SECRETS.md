# Secrets and access

This file is only a map: **where** a secret is stored and **how** to restore it. Values of tokens, passwords, keys, seed phrases and recovery codes are never written here.

## Principles

- Secret values live outside Git: in a password manager, a team vault or CI environment variables.
- `.env.example` contains only variable names and safe examples.
- Protection is twofold: `.gitignore` excludes secret **paths**, `.starter-kit/preflight.sh` checks file **content** before a commit. A token can end up in an ordinary Markdown, JSON or source file.
- A found secret is never printed to the chat, a report or a log — only the path and line number.
- OAuth tokens, MCP server keys, connector and plugin credentials are secrets too.
- If a secret got into history: first revoke or rotate it with the provider, then separately decide whether to clean history (`docs/GIT_POLICY.md`).

## Recovery map

| Purpose | Variable or file | Where the value is stored | Owner | Verified |
|---|---|---|---|---|
| — | — | Filled during `START` | — | — |

## Additional secret paths

Filled during `START`; each path is also added to `.gitignore`.

## Recovery codes and 2FA

The user chooses where to store them. Codes are never copied into the project or given to AI.
