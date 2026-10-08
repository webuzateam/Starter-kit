# Upgrading Starter Kit

Runs on the `UPGRADE KIT` command. The goal is to get the new version of rules and flows without losing a single piece of project data.

## 1. Preparation (change nothing)

1. The current version — `.starter-kit/VERSION`.
2. The working tree is clean. If not — suggest `CLOSE SESSION` first.
3. Ask the user for the source of the new version: a release archive from GitHub or `npx degit webuzateam/Starter-kit#en <temporary folder>` (downloading — with permission). The Russian edition is `npx degit webuzateam/Starter-kit`; the language of the current installation is recorded in `.starter-kit/LANGUAGE`. Unpack into a **temporary folder outside the project**.
4. Read the Starter Kit [CHANGELOG](https://github.com/webuzateam/Starter-kit/blob/main/CHANGELOG.md) or compare the files, and show the user what will change.

## 2. Who owns each file

| Files | Owner | What to do |
|---|---|---|
| `prompts/*`, `.starter-kit/VERSION`, `.starter-kit/LANGUAGE`, `.starter-kit/preflight.sh`, `.starter-kit/hooks/*`, `.claude/commands/kit-*.md`, `docs/HOW_IT_WORKS.md`, `docs/decisions/DECISION_TEMPLATE.md`, `logs/sessions/SESSION_TEMPLATE.md`, `CLAUDE.md` | Starter Kit | Replace with the new version after showing the differences |
| `AGENTS.md` | Mixed | Take the new version, carry over the content between the `PROJECT-RULES` markers unchanged |
| `.gitignore`, `.env.example` | Mixed | Add new Starter Kit lines, keep the project's lines |
| `docs/PROJECT_POLICY.md`, `docs/PROJECT_QUESTIONNAIRE.md` | Project | Do not overwrite. If the new version has new rules or questions — show them and offer to add |
| `README.md`, the other `docs/*`, `.starter-kit/config`, `logs/`, `src/`, `outputs/` and everything else | Project | Never overwrite |

## 3. Applying

Show the plan: which files are replaced, which are merged, which new rules are proposed. Apply only after explicit confirmation. Then:

1. Update `.starter-kit/VERSION`.
2. Run the audit `prompts/02-audit-project.md`.
3. Record the upgrade in `docs/STATUS.md`; for significant rule changes, create a decision in `docs/decisions/`.
4. Delete the temporary folder with the new version.

Commit — on `CLOSE SESSION`.
