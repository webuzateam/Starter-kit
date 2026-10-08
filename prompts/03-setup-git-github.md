# Git and GitHub setup

Runs only after `APPLY`. Rules — `docs/GIT_POLICY.md`.

## 1. Checks before changing anything

1. The actual root; no extra nested folder; no repository higher up the tree.
2. Existing remotes and branches.
3. Whether Git and GitHub CLI are installed and authenticated (`gh auth status`).
4. Author name and email; for a new project — local repository settings.
5. `README.md` already describes the project, not Starter Kit. Otherwise — stop: setup is not finished.
6. `.gitignore`, secret paths, the policy for caches and dependencies.

If the repository, remote, structure or permission is ambiguous — stop and show options with a recommendation. If Git or `gh` is missing — explain how to install and ask for permission. Authentication only via the browser (`gh auth login`); tokens and passwords are never requested in chat.

## 2. Agree on the parameters

Show a summary and get explicit confirmation:

- owner and repository name (suggest one based on the project name);
- visibility: private (recommended) or public;
- main branch (`main` by default);
- whether to enable the `pre-commit` hook (recommended).

For a public repository, also warn that all content and the whole history become visible to everyone. Before the first push, check all files — not only changed ones — for secrets and personal data.

Write the agreed values into `.starter-kit/config` and `docs/GIT_POLICY.md`.

## 3. Local repository

1. `git init -b <branch>` directly in the root.
2. If the hook was agreed: `chmod +x .starter-kit/preflight.sh .starter-kit/hooks/pre-commit` and `git config core.hooksPath .starter-kit/hooks`.
3. `.starter-kit/preflight.sh` — on `STOP`, stop and show the paths (without values).
4. Add all meaningful files per the policy, show the staged set, create the first commit.

## 4. GitHub

After confirmation:

1. Create a separate repository with the agreed visibility (`gh repo create <owner>/<name> --private|--public --source . --remote origin`).
2. Write the `origin` URL into `.starter-kit/config`.
3. `.starter-kit/preflight.sh --push`.
4. A regular push of the main branch.
5. Check visibility, branch, remote, commit and a clean tree.

Never force push and never overwrite an existing remote.

## 5. Report

Root; owner, name and visibility of the repository; branch; remote; commit; push result; preflight result; hook; what stayed outside Git.
