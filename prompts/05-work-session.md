# Work session

Do the user's task following `AGENTS.md` and `docs/PROJECT_POLICY.md`.

## While working

- Do not change unrelated files and do not create a nested project folder.
- Run the relevant checks from `docs/PROJECT_CONTEXT.md`.
- Record significant choices in `docs/decisions/`.
- When adding, removing or updating an extension, update `docs/INTEGRATIONS.md` (without credentials).
- Do not stop safe work for a deferred question that doesn't affect it.
- Before an action blocked by a checkpoint, ask a short question card with the option to keep the block in place.

## How to extend memory

- A new durable fact, decision, constraint or path — straight into the matching document, with its source.
- An explicit decision of the user — `CONFIRMED`; information from files or the task wording — `INFERRED`, until the user makes it a standing rule.
- Do not turn a hypothesis, an example or a one-off request into accepted architecture.
- Close a deferred question only with sufficient grounds.
- Do not show the whole list of open questions after every task — only those relevant to the current action or safety.

## At the end of the task

Report per section 9 of `AGENTS.md`. Commit and push only on `CLOSE SESSION` or another explicit permission.
