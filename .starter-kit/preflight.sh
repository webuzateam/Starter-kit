#!/usr/bin/env bash
# Starter Kit preflight: checks before commit and push.
# Secret values are never printed — only the path and line numbers.
#
# Usage:
#   bash .starter-kit/preflight.sh            changed and new files (before git add)
#   bash .starter-kit/preflight.sh --staged   staged files only (pre-commit hook)
#   bash .starter-kit/preflight.sh --push     also branch, origin and visibility
#
# Exit codes: 0 — OK to continue; 1 — STOP, a human decision is needed; 2 — usage error.
# Works with bash 3.2 (macOS), Linux and Git Bash (Windows).

scope=all
check_push=0
for arg in "$@"; do
  case "$arg" in
    --staged) scope=staged ;;
    --push) check_push=1 ;;
    -h|--help) sed -n '2,11p' "$0"; exit 0 ;;
    *) echo "Unknown option: $arg (see --help)" >&2; exit 2 ;;
  esac
done

root=$(git rev-parse --show-toplevel 2>/dev/null) || { echo "No Git repository found. Set up Git first: prompts/03-setup-git-github.md" >&2; exit 2; }
cd "$root" || exit 2

config=.starter-kit/config
self=.starter-kit/preflight.sh

setting() {
  value=""
  if [ -f "$config" ]; then
    value=$(grep -E "^$1=" "$config" | tail -n 1 | cut -d= -f2- | tr -d '[:space:]')
  fi
  if [ -n "$value" ]; then printf '%s' "$value"; else printf '%s' "$2"; fi
}

stops=0
warns=0
stop() { echo "STOP  $*"; stops=$((stops + 1)); }
warn() { echo "WARN  $*"; warns=$((warns + 1)); }
ok()   { echo "OK    $*"; }

# --- Files to check -------------------------------------------------
files=()
if [ "$scope" = staged ]; then
  while IFS= read -r -d '' f; do files+=("$f"); done < <(git diff --cached --name-only --diff-filter=ACMR -z)
else
  while IFS= read -r -d '' f; do files+=("$f"); done < <({ git diff --cached --name-only --diff-filter=ACMR -z; git ls-files -m -o --exclude-standard -z; } | sort -zu)
fi
echo "Starter Kit preflight: checking ${#files[@]} file(s)"

# --- Template README -----------------------------------------------------
if [ ! -f .starter-kit-source ] && [ -f README.md ] && head -n 1 README.md | grep -q '^# AI Project Starter Kit'; then
  stop "README.md still describes Starter Kit. Finish setup with the APPLY command."
fi

# --- Dangerous file names ------------------------------------------------------
name_hits=0
for f in "${files[@]}"; do
  base=${f##*/}
  case "$base" in
    .env.example|*.env.example|*.pub) continue ;;
    .env|.env.*|*.env|*.pem|*.key|*.p12|*.pfx|*.jks|*.keystore|id_rsa*|id_dsa*|id_ecdsa*|id_ed25519*|credentials.json|service-account*.json|*.tfstate|*.tfstate.*)
      stop "secret file by name: $f"; name_hits=$((name_hits + 1)) ;;
    .npmrc|.pypirc|.netrc|.git-credentials)
      warn "file may contain a token: $f — check it manually"; name_hits=$((name_hits + 1)) ;;
  esac
done
[ "$name_hits" -eq 0 ] && ok "no dangerous file names"

# --- Secrets by content ----------------------------------------------------
# High-precision patterns of known key formats: a match = STOP.
strict='-----BEGIN ([A-Z]+ )*PRIVATE KEY( BLOCK)?-----'
strict="$strict|(AKIA|ASIA)[0-9A-Z]{16}"
strict="$strict|gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{60,}"
strict="$strict|glpat-[A-Za-z0-9_-]{20,}"
strict="$strict|xox[abprs]-[A-Za-z0-9-]{10,}|hooks\\.slack\\.com/services/T[A-Za-z0-9/]+"
strict="$strict|sk-ant-[A-Za-z0-9_-]{20,}"
strict="$strict|(^|[^A-Za-z0-9_-])sk-(proj-|svcacct-)?[A-Za-z0-9_-]{32,}"
strict="$strict|(sk|rk)_live_[0-9A-Za-z]{20,}"
strict="$strict|AIza[0-9A-Za-z_-]{35}"
strict="$strict|[0-9]{8,10}:AA[0-9A-Za-z_-]{33}"
strict="$strict|npm_[A-Za-z0-9]{36}"
# Generic assignments like password = "...": false positives are possible, hence WARN.
loose="(password|passwd|secret|token|api[_-]?key|access[_-]?key)[\"']?[[:space:]]*[:=][[:space:]]*[\"'][^\"'[:space:]]{8,}[\"']"

secret_hits=0
for f in "${files[@]}"; do
  [ -f "$f" ] || continue
  [ "$f" = "$self" ] && continue
  lines=$(grep -nEI -e "$strict" -- "$f" 2>/dev/null | cut -d: -f1 | head -n 20 | tr '\n' ',' | sed 's/,$//')
  if [ -n "$lines" ]; then
    stop "possible secret: $f (lines: $lines)"; secret_hits=$((secret_hits + 1))
    continue
  fi
  lines=$(grep -niEI -e "$loose" -- "$f" 2>/dev/null | cut -d: -f1 | head -n 20 | tr '\n' ',' | sed 's/,$//')
  if [ -n "$lines" ]; then
    warn "looks like a password or token: $f (lines: $lines) — make sure it is not a real value"; secret_hits=$((secret_hits + 1))
  fi
done
[ "$secret_hits" -eq 0 ] && ok "no secrets found by content"

if command -v gitleaks >/dev/null 2>&1 && [ "$scope" = staged ]; then
  if gitleaks help git >/dev/null 2>&1; then
    gitleaks git --pre-commit --staged --redact --no-banner >/dev/null 2>&1
  else
    gitleaks protect --staged --redact --no-banner >/dev/null 2>&1
  fi
  if [ $? -eq 0 ]; then ok "gitleaks: no leaks"; else stop "gitleaks found a possible leak — run gitleaks with --redact for details"; fi
fi

# --- Large files -------------------------------------------------------------
limit_mib=$(setting large_file_mib 50)
case "$limit_mib" in ''|*[!0-9]*) warn "large_file_mib in $config is not a number — using 50"; limit_mib=50 ;; esac
limit=$((limit_mib * 1024 * 1024))
github_limit=$((100 * 1024 * 1024))
size_hits=0
for f in "${files[@]}"; do
  [ -f "$f" ] || continue
  size=$(wc -c < "$f" | tr -d '[:space:]')
  if [ "$size" -ge "$limit" ]; then
    mib=$((size / 1024 / 1024))
    if [ "$size" -ge "$github_limit" ]; then
      stop "large file: $f — ${mib} MiB, GitHub rejects files over 100 MiB"
    else
      stop "large file: $f — ${mib} MiB (threshold ${limit_mib} MiB)"
    fi
    size_hits=$((size_hits + 1))
  fi
done
[ "$size_hits" -eq 0 ] && ok "no files of ${limit_mib} MiB or more"

# --- Branch, origin and visibility -------------------------------------------------
if [ "$check_push" -eq 1 ]; then
  expected_branch=$(setting branch main)
  branch=$(git symbolic-ref --quiet --short HEAD 2>/dev/null)
  if [ -z "$branch" ]; then
    stop "HEAD is not on a branch (detached HEAD)"
  elif [ "$branch" != "$expected_branch" ]; then
    stop "current branch is '$branch', agreed '$expected_branch'"
  else
    ok "branch $branch"
  fi

  expected_remote=$(setting remote "")
  remote=$(git remote get-url origin 2>/dev/null)
  if [ -z "$remote" ]; then
    stop "origin is not set"
  elif [ -z "$expected_remote" ]; then
    stop "origin is not agreed: fill in remote in $config"
  elif [ "${remote%.git}" != "${expected_remote%.git}" ]; then
    stop "origin changed: now $remote, agreed $expected_remote"
  else
    ok "origin matches the agreed one"
  fi

  expected_visibility=$(setting visibility "" | tr '[:upper:]' '[:lower:]')
  if [ -z "$expected_visibility" ]; then
    stop "repository visibility is not agreed: fill in visibility in $config"
  elif [ -n "$remote" ]; then
    case "$remote" in
      *github.com[:/]*)
        slug=${remote#*github.com}
        slug=${slug#[:/]}
        slug=${slug%.git}
        if ! command -v gh >/dev/null 2>&1; then
          warn "GitHub CLI is not installed — visibility of $slug not checked"
        else
          actual=$(gh repo view "$slug" --json visibility -q .visibility 2>/dev/null | tr '[:upper:]' '[:lower:]')
          if [ -z "$actual" ]; then
            stop "could not check visibility of $slug (no auth or access: gh auth status)"
          elif [ "$actual" != "$expected_visibility" ]; then
            stop "repository visibility is '$actual', agreed '$expected_visibility'"
          else
            ok "visibility: $actual"
          fi
        fi
        ;;
      *) warn "origin is not on GitHub — check visibility manually (agreed: $expected_visibility)" ;;
    esac
  fi
fi

# --- Summary ----------------------------------------------------------------------
echo
if [ "$stops" -gt 0 ]; then
  echo "Result: STOP ($stops), WARN ($warns). Commit and push are stopped until the user decides."
  exit 1
fi
echo "Result: OK to continue. Warnings: $warns."
exit 0
