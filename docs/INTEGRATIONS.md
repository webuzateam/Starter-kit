# Skills, plugins and MCP

Document status: **AWAITING START**

The project's extension register and recovery guide. It holds names, sources, versions and checks — never tokens, passwords or OAuth sessions.

## Core principle

Starter Kit requires no extensions. Folders and configurations are created only when the user chooses a specific extension or the project already contains its safe configuration. Discovering an extension does not mean permission to install, update or authenticate it.

## What goes where

Paths depend on the AI client. Check the client's current documentation before adding anything.

| Type | Stored in the project (Git) | Restored separately |
|---|---|---|
| Project Skill | Codex: `.agents/skills/<name>/`; Claude Code: `.claude/skills/<name>/` | System dependencies and access |
| Project MCP | Codex: `.codex/config.toml`; Claude Code: `.mcp.json`; Cursor: `.cursor/mcp.json` — safe configuration only | Project trust, dependencies, sign-in, secret variables |
| Project plugin | Plugin sources, if the plugin belongs to the project | Installation, cache, OAuth |
| User Skill, global MCP | Only an entry in this register: source, version, instructions | Installation on a specific computer or account |
| Starter Kit commands for Claude Code | `.claude/commands/kit-*.md` | Nothing — they work right after copying |

A successful clone does not mean every extension is installed and authenticated.

## Register

There are no mandatory extensions by default. During `START`, add one row per chosen or discovered extension.

| Name | Type | Mandatory | Source and version | Config in project | How to restore and verify | Status |
|---|---|---|---|---|---|---|
| None | — | — | — | — | — | Not selected |

Statuses: `NOT SELECTED`, `DISCOVERED`, `CONFIGURED`, `DEFERRED`, `NEEDS INSTALL`, `NEEDS AUTH`, `NOT APPLICABLE`.

## Rules for adding

1. Exact name, official source, version or commit.
2. Scope: project or user/global.
3. Only project-owned sources and safe configuration go into Git.
4. Secrets only via environment variables or secure storage; Git holds only variable names.
5. A short command or observable health check.
6. Do not create empty extension folders in advance.

## Check after a clone or agent change

1. Read the register before installing anything.
2. Check that project-local files came from Git.
3. Install user extensions and dependencies from the recorded sources — with the user's permission.
4. Trust a project MCP configuration only after reviewing its contents.
5. Restore secret variables without printing the values.
6. Run the check from each row and update its status.

If an extension is unavailable, the agent reports which function is lost and whether there is a safe alternative. The source and version are never silently changed.
