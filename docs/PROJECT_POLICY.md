# Project rules in force

Policy status: **AWAITING APPLY VIA START**

This document is filled during `APPLY`. It also holds the single status glossary: every other Starter Kit file refers to it instead of defining its own terms.

## Glossary

### Data source

Every significant value in the context, questionnaire and policy gets exactly one label:

| Label | Meaning |
|---|---|
| `CONFIRMED` | The user explicitly chose or wrote this value |
| `INFERRED` | The agent derived it from project files; a path or short reason is given next to it |
| `DEFAULT` | A safe recommended Starter Kit value was applied |
| `DEFERRED` | The value is unknown; the event to revisit it and the blocked action are recorded |

### Rule status

| Status | Meaning |
|---|---|
| `ACCEPTED` | The rule applies as recommended |
| `CHANGED` | The rule applies in a form changed by the user; the reason is recorded below |
| `NOT APPLICABLE` | The project does not need the rule; the reason is recorded below |
| `BLOCKED` | The related action is forbidden until the user answers explicitly |
| `NEEDS DECISION` | State before `APPLY` |

### Setup state

`NOT STARTED` → `IN PROGRESS` → `AWAITING APPLY` → `COMPLETE`. Stored in `docs/PROJECT_QUESTIONNAIRE.md`.

### Readiness level

Exactly one level is used. Stored in `docs/STATUS.md`.

| Level | When |
|---|---|
| `NOT READY` | `APPLY` has not been run, or a contradiction prevents safe work |
| `READY FOR INTERNAL WORK` | Setup is applied and protection is active, but the goal or current task still needs clarification |
| `WORKING WITH DEFERRED DECISIONS` | Current work is clear; future or risky actions have explicit checkpoints |
| `FULLY CONFIGURED` | No critical deferred decisions |

The level does not cancel checkpoints: unknown permission for a risky action means "no".

## Rule register

| ID | Rule | Recommended value | Status | Source / checkpoint |
|---|---|---|---|---|
| CORE-01 | Project files are long-term memory, chat is temporary context | On | Needs decision | Set during `START` |
| CORE-02 | `docs/STATUS.md` is the single current snapshot of state | On | Needs decision | Set during `START` |
| AI-01 | The agent reads rules and status before working | On | Needs decision | Set during `START` |
| AI-02 | Risky and external actions require explicit permission | On, cannot be disabled | Needs decision | Unknown means "no" |
| AI-03 | Installing software and dependencies | Only with permission | Needs decision | Set during `START` |
| LANG-01 | Main language and localization rules | User's language; no language suffix in the name | Needs decision | Safe default allowed |
| DOC-01 | Session log when a substantive session is closed | Standard | Needs decision | Safe default allowed |
| DOC-02 | Changelog — only changes visible to users | On | Needs decision | Safe default allowed |
| GIT-01 | One repository per project | On | Needs decision | Confirm before creating a repository |
| GIT-02 | Repository visibility | Private; public only by explicit choice | Needs decision | Confirm before creating or first push |
| GIT-03 | All meaningful project data is kept | Secrets excluded; caches and builds per policy | Needs decision | Check before commit |
| GIT-04 | Force push and history rewriting | Forbidden without permission | Needs decision | Unknown means "no" |
| SEC-01 | Secrets are excluded by path and checked by content | `.gitignore` + `.starter-kit/preflight.sh` | Needs decision | Check before commit |
| SIZE-01 | A large file requires the user's decision | From 50 MiB | Needs decision | Check before commit |
| TEST-01 | What to do if checks fail | Personal project: save and flag the failure; team/production: do not commit | Needs decision | Set during `START` |
| SESSION-01 | `CLOSE SESSION` permits commit and a regular push | Only to the agreed `origin` | Needs decision | Confirm before the first push |
| RECOVERY-01 | A new agent rebuilds context first | On | Needs decision | Safe default allowed |
| EXT-01 | Extensions are documented and reproducible | Register without secrets | Needs decision | Discover or defer |
| REPORT-01 | A task ends with a verifiable report | Standard | Needs decision | Safe default allowed |

## Changes, exceptions and deferred decisions

Filled during `START`. For a changed rule, give the reason and consequences. For a deferred one — what is unknown, which work is allowed, which action is blocked, and on what event to revisit the question.
