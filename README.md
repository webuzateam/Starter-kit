# AI Project Starter Kit

**Your project remembers, even when the chat doesn't.** A free memory system for projects built with AI assistants: goals, rules, decisions and current status live in project files, not in chat history. Any agent — Claude Code, Codex, Cursor, Copilot, Gemini CLI — opens the folder and continues exactly where you left off.

[Website](https://webuza-ai-starter-kit.pages.dev/en/) · [Full guide](https://webuza-ai-starter-kit.pages.dev/en/guide/) · [Filled example project](https://webuza-ai-starter-kit.pages.dev/en/example/) · [How it works — for beginners](docs/HOW_IT_WORKS.md) · [Русская версия](https://github.com/webuzateam/Starter-kit)

## Install

**New project** (requires Node.js):

```bash
npx degit webuzateam/Starter-kit#en my-project
```

**Existing project** — inside its folder:

```bash
npx degit webuzateam/Starter-kit#en . --force
```

`--force` allows writing into a non-empty folder: files with the same names, such as `README.md`, will be replaced, so save them first.

**No terminal** — download `starter-kit-vX.Y.Z-en.zip` from [Releases](https://github.com/webuzateam/Starter-kit/releases/latest) and unzip its contents straight into the project root.

Install this way rather than with `git clone`: the archive contains only Starter Kit, without this repository's service files.

## Quick start

1. Open the project folder in your AI assistant.
2. Send `START` as a separate message and pick a mode: **guided**, **quick** or **no brief**.
3. Review the final summary and send `APPLY`. This README will be replaced with a description of your project.
4. Work as usual. At the end, send `CLOSE SESSION` as a separate message.
5. New chat or another agent? Send `RECOVER`.

## Commands

| Command | What it does |
|---|---|
| `START` | First run or a short status |
| `APPLY` | Write the setup summary into the files |
| `CLOSE SESSION` | Update memory, run checks, commit and push |
| `RECOVER` | Rebuild context in a new chat or with a new agent |
| `CHANGE RULES` | Revisit the settings |
| `UPGRADE KIT` | Update Starter Kit without losing project data |

A command fires only as a separate message. In Claude Code the same flows are available as `/kit-start`, `/kit-apply`, `/kit-close`, `/kit-recover`, `/kit-audit`, `/kit-upgrade`.

## File map

| Path | Purpose |
|---|---|
| `AGENTS.md` | One set of rules for AI: commands, reading order, autonomy boundaries |
| `CLAUDE.md` | Connects `AGENTS.md` for Claude Code |
| `.gitignore`, `.env.example` | Keeps secrets out of Git; variable names without values |
| `.starter-kit/` | Version, language, settings and the `preflight.sh` check before commit and push |
| `.claude/commands/` | `/kit-*` commands for Claude Code |
| `docs/HOW_IT_WORKS.md` | Explanation for beginners |
| `docs/PROJECT_QUESTIONNAIRE.md` | First-run questionnaire and its answers |
| `docs/PROJECT_CONTEXT.md` | Project passport: goal, audience, boundaries, commands |
| `docs/PROJECT_POLICY.md` | Rules in force and the status glossary |
| `docs/STATUS.md` | Where the project is now and what comes next |
| `docs/GIT_POLICY.md` | Git and GitHub rules |
| `docs/SECRETS.md` | Secrets map — without values |
| `docs/RECOVERY.md` | What Git keeps and how to resume work |
| `docs/INTEGRATIONS.md` | Skills, plugins and MCP: sources and recovery |
| `docs/INITIALIZATION_REPORT.md` | First-run report |
| `docs/CHANGELOG.md` | Project changes visible to users |
| `docs/decisions/` | Important decisions and their reasons |
| `logs/sessions/` | A short diary of work sessions |
| `prompts/` | Flows: start, apply, audit, Git, work, close, recover, upgrade |
| `src/`, `outputs/` | Working materials and finished results |

## Safe by default

- Deleting, publishing, deploying, changing the remote or visibility, force pushing — only with your explicit permission.
- Secrets stay out of Git: `.gitignore` protects by path, `.starter-kit/preflight.sh` by content.
- The project repository is private by default; public only if you choose so.
- The AI does not pass guesses off as facts: every significant value has a source.

## Contributing and license

Suggestions and fixes are welcome — see [CONTRIBUTING](https://github.com/webuzateam/Starter-kit/blob/main/.github/CONTRIBUTING.md). Report vulnerabilities privately as described in [SECURITY](https://github.com/webuzateam/Starter-kit/blob/main/.github/SECURITY.md).

[MIT](https://github.com/webuzateam/Starter-kit/blob/main/LICENSE) license (copy in `.starter-kit/LICENSE`): free to use, including commercial projects. Version — `.starter-kit/VERSION`.
