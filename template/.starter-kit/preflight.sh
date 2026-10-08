#!/usr/bin/env bash
# Starter Kit preflight: проверки перед commit и push.
# Значения секретов никогда не выводятся — только путь и номера строк.
#
# Использование:
#   bash .starter-kit/preflight.sh            изменённые и новые файлы (до git add)
#   bash .starter-kit/preflight.sh --staged   только подготовленные файлы (hook pre-commit)
#   bash .starter-kit/preflight.sh --push     дополнительно ветка, origin и видимость
#
# Коды выхода: 0 — можно продолжать; 1 — STOP, нужно решение человека; 2 — ошибка запуска.
# Совместим с bash 3.2 (macOS), Linux и Git Bash (Windows).

scope=all
check_push=0
for arg in "$@"; do
  case "$arg" in
    --staged) scope=staged ;;
    --push) check_push=1 ;;
    -h|--help) sed -n '2,11p' "$0"; exit 0 ;;
    *) echo "Неизвестный параметр: $arg (см. --help)" >&2; exit 2 ;;
  esac
done

root=$(git rev-parse --show-toplevel 2>/dev/null) || { echo "Git-репозиторий не найден. Сначала настройте Git: prompts/03-setup-git-github.md" >&2; exit 2; }
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

# --- Список проверяемых файлов -------------------------------------------------
files=()
if [ "$scope" = staged ]; then
  while IFS= read -r -d '' f; do files+=("$f"); done < <(git diff --cached --name-only --diff-filter=ACMR -z)
else
  while IFS= read -r -d '' f; do files+=("$f"); done < <({ git diff --cached --name-only --diff-filter=ACMR -z; git ls-files -m -o --exclude-standard -z; } | sort -zu)
fi
echo "Starter Kit preflight: проверяется файлов — ${#files[@]}"

# --- README мастер-шаблона -----------------------------------------------------
if [ ! -f .starter-kit-source ] && [ -f README.md ] && head -n 1 README.md | grep -q '^# AI Project Starter Kit'; then
  stop "README.md всё ещё описывает Starter Kit. Завершите настройку командой ПРИМЕНИТЬ."
fi

# --- Опасные имена файлов ------------------------------------------------------
name_hits=0
for f in "${files[@]}"; do
  base=${f##*/}
  case "$base" in
    .env.example|*.env.example|*.pub) continue ;;
    .env|.env.*|*.env|*.pem|*.key|*.p12|*.pfx|*.jks|*.keystore|id_rsa*|id_dsa*|id_ecdsa*|id_ed25519*|credentials.json|service-account*.json|*.tfstate|*.tfstate.*)
      stop "файл с секретами по имени: $f"; name_hits=$((name_hits + 1)) ;;
    .npmrc|.pypirc|.netrc|.git-credentials)
      warn "файл может содержать токен: $f — проверьте вручную"; name_hits=$((name_hits + 1)) ;;
  esac
done
[ "$name_hits" -eq 0 ] && ok "опасных имён файлов нет"

# --- Секреты по содержимому ----------------------------------------------------
# Высокоточные шаблоны известных форматов ключей: совпадение = STOP.
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
# Общие присваивания вида password = "...": возможны ложные срабатывания, поэтому WARN.
loose="(password|passwd|secret|token|api[_-]?key|access[_-]?key)[\"']?[[:space:]]*[:=][[:space:]]*[\"'][^\"'[:space:]]{8,}[\"']"

secret_hits=0
for f in "${files[@]}"; do
  [ -f "$f" ] || continue
  [ "$f" = "$self" ] && continue
  lines=$(grep -nEI -e "$strict" -- "$f" 2>/dev/null | cut -d: -f1 | head -n 20 | tr '\n' ',' | sed 's/,$//')
  if [ -n "$lines" ]; then
    stop "возможный секрет: $f (строки: $lines)"; secret_hits=$((secret_hits + 1))
    continue
  fi
  lines=$(grep -niEI -e "$loose" -- "$f" 2>/dev/null | cut -d: -f1 | head -n 20 | tr '\n' ',' | sed 's/,$//')
  if [ -n "$lines" ]; then
    warn "похоже на пароль или токен: $f (строки: $lines) — проверьте, что это не реальное значение"; secret_hits=$((secret_hits + 1))
  fi
done
[ "$secret_hits" -eq 0 ] && ok "секретов по содержимому не найдено"

if command -v gitleaks >/dev/null 2>&1 && [ "$scope" = staged ]; then
  if gitleaks help git >/dev/null 2>&1; then
    gitleaks git --pre-commit --staged --redact --no-banner >/dev/null 2>&1
  else
    gitleaks protect --staged --redact --no-banner >/dev/null 2>&1
  fi
  if [ $? -eq 0 ]; then ok "gitleaks: утечек нет"; else stop "gitleaks нашёл возможную утечку — запустите gitleaks с --redact для деталей"; fi
fi

# --- Крупные файлы -------------------------------------------------------------
limit_mib=$(setting large_file_mib 50)
case "$limit_mib" in ''|*[!0-9]*) warn "large_file_mib в $config не число — используется 50"; limit_mib=50 ;; esac
limit=$((limit_mib * 1024 * 1024))
github_limit=$((100 * 1024 * 1024))
size_hits=0
for f in "${files[@]}"; do
  [ -f "$f" ] || continue
  size=$(wc -c < "$f" | tr -d '[:space:]')
  if [ "$size" -ge "$limit" ]; then
    mib=$((size / 1024 / 1024))
    if [ "$size" -ge "$github_limit" ]; then
      stop "крупный файл: $f — ${mib} MiB, GitHub отклонит файл больше 100 MiB"
    else
      stop "крупный файл: $f — ${mib} MiB (порог ${limit_mib} MiB)"
    fi
    size_hits=$((size_hits + 1))
  fi
done
[ "$size_hits" -eq 0 ] && ok "файлов от ${limit_mib} MiB нет"

# --- Ветка, origin и видимость -------------------------------------------------
if [ "$check_push" -eq 1 ]; then
  expected_branch=$(setting branch main)
  branch=$(git symbolic-ref --quiet --short HEAD 2>/dev/null)
  if [ -z "$branch" ]; then
    stop "HEAD не указывает на ветку (detached HEAD)"
  elif [ "$branch" != "$expected_branch" ]; then
    stop "текущая ветка «$branch», согласована «$expected_branch»"
  else
    ok "ветка $branch"
  fi

  expected_remote=$(setting remote "")
  remote=$(git remote get-url origin 2>/dev/null)
  if [ -z "$remote" ]; then
    stop "origin не настроен"
  elif [ -z "$expected_remote" ]; then
    stop "origin не согласован: заполните remote в $config"
  elif [ "${remote%.git}" != "${expected_remote%.git}" ]; then
    stop "origin изменился: сейчас $remote, согласован $expected_remote"
  else
    ok "origin совпадает с согласованным"
  fi

  expected_visibility=$(setting visibility "" | tr '[:upper:]' '[:lower:]')
  if [ -z "$expected_visibility" ]; then
    stop "видимость репозитория не согласована: заполните visibility в $config"
  elif [ -n "$remote" ]; then
    case "$remote" in
      *github.com[:/]*)
        slug=${remote#*github.com}
        slug=${slug#[:/]}
        slug=${slug%.git}
        if ! command -v gh >/dev/null 2>&1; then
          warn "GitHub CLI не установлен — видимость $slug не проверена"
        else
          actual=$(gh repo view "$slug" --json visibility -q .visibility 2>/dev/null | tr '[:upper:]' '[:lower:]')
          if [ -z "$actual" ]; then
            stop "не удалось проверить видимость $slug (нет авторизации или доступа: gh auth status)"
          elif [ "$actual" != "$expected_visibility" ]; then
            stop "видимость репозитория «$actual», согласована «$expected_visibility»"
          else
            ok "видимость: $actual"
          fi
        fi
        ;;
      *) warn "origin не на GitHub — проверьте видимость вручную (согласовано: $expected_visibility)" ;;
    esac
  fi
fi

# --- Итог ----------------------------------------------------------------------
echo
if [ "$stops" -gt 0 ]; then
  echo "Итог: STOP ($stops), WARN ($warns). Commit и push остановлены до решения пользователя."
  exit 1
fi
echo "Итог: можно продолжать. Предупреждений: $warns."
exit 0
