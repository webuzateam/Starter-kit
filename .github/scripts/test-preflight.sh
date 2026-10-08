#!/usr/bin/env bash
# Проверяет .starter-kit/preflight.sh на временных Git-репозиториях.
# Запуск: bash .github/scripts/test-preflight.sh
set -e

repo_root=$(cd "$(dirname "$0")/../.." && pwd)
preflight="$repo_root/.starter-kit/preflight.sh"
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

passed=0
failed=0

new_repo() {
  dir="$work/$1"
  mkdir -p "$dir/.starter-kit"
  cp "$preflight" "$dir/.starter-kit/preflight.sh"
  cp "$repo_root/.starter-kit/config" "$dir/.starter-kit/config"
  cp "$repo_root/.gitignore" "$dir/.gitignore"
  printf '# Test project\n' > "$dir/README.md"
  git -C "$dir" init -q -b main
  git -C "$dir" config user.email test@example.invalid
  git -C "$dir" config user.name test
  echo "$dir"
}

# expect <имя> <ожидаемый код> <каталог> [аргументы preflight]
expect() {
  name=$1; want=$2; dir=$3; shift 3
  set +e
  output=$(cd "$dir" && bash .starter-kit/preflight.sh "$@" 2>&1)
  got=$?
  set -e
  if [ "$got" -eq "$want" ]; then
    passed=$((passed + 1)); echo "ok   $name"
  else
    failed=$((failed + 1)); echo "FAIL $name: ожидался код $want, получен $got"; echo "$output" | sed 's/^/     /'
  fi
  last_output=$output
}

# 1. Чистый проект проходит.
d=$(new_repo clean)
printf 'hello\n' > "$d/notes.md"
expect "чистый проект" 0 "$d"

# 2. Ключ AWS в обычном файле останавливает commit, значение не выводится.
d=$(new_repo aws)
fake_key="AKIA""ABCDEFGHIJKLMNOP"
printf 'config:\n  key: %s\n' "$fake_key" > "$d/settings.yml"
expect "ключ AWS по содержимому" 1 "$d"
if printf '%s' "$last_output" | grep -q "$fake_key"; then
  failed=$((failed + 1)); echo "FAIL значение секрета попало в вывод"
else
  passed=$((passed + 1)); echo "ok   значение секрета не выводится"
fi

# 3. Закрытый ключ в staged-режиме.
d=$(new_repo pk)
printf -- '-----BEGIN OPENSSH ''PRIVATE KEY-----\nabc\n' > "$d/deploy.txt"
git -C "$d" add deploy.txt
expect "закрытый ключ, --staged" 1 "$d" --staged

# 4. Принудительно добавленный .env.
d=$(new_repo env)
printf 'APP_ENV=dev\n' > "$d/.env"
git -C "$d" add -f .env
expect ".env по имени" 1 "$d" --staged

# 5. .env.example допустим.
d=$(new_repo example)
printf 'API_KEY=\n' > "$d/.env.example"
git -C "$d" add .env.example
expect ".env.example разрешён" 0 "$d" --staged

# 6. Похожее на пароль присваивание — только предупреждение.
d=$(new_repo loose)
printf 'password = "aaaaaaaaaa"\n' > "$d/app.py"
expect "пароль-присваивание = WARN" 0 "$d"

# 7. Крупный файл от порога.
d=$(new_repo large)
sed -i.bak 's/^large_file_mib=.*/large_file_mib=1/' "$d/.starter-kit/config" && rm "$d/.starter-kit/config.bak"
dd if=/dev/zero of="$d/big.bin" bs=1048576 count=2 2>/dev/null
expect "крупный файл" 1 "$d"

# 8. README мастер-шаблона блокирует commit.
d=$(new_repo readme)
printf '# AI Project Starter Kit\n' > "$d/README.md"
expect "README шаблона" 1 "$d"

# 9. --push без согласованного origin и видимости.
d=$(new_repo push)
expect "--push без настроек" 1 "$d" --push

# 10. --push с несовпадающим origin.
d=$(new_repo remote)
git -C "$d" remote add origin https://example.invalid/other/repo.git
sed -i.bak -e 's|^remote=.*|remote=https://example.invalid/me/repo.git|' -e 's/^visibility=.*/visibility=private/' "$d/.starter-kit/config" && rm "$d/.starter-kit/config.bak"
expect "--push чужой origin" 1 "$d" --push

# 11. --push: всё согласовано, remote не GitHub — только предупреждение.
d=$(new_repo pushok)
git -C "$d" remote add origin https://example.invalid/me/repo.git
sed -i.bak -e 's|^remote=.*|remote=https://example.invalid/me/repo.git|' -e 's/^visibility=.*/visibility=private/' "$d/.starter-kit/config" && rm "$d/.starter-kit/config.bak"
expect "--push согласовано" 0 "$d" --push

# 12. Неизвестный параметр.
expect "неизвестный параметр" 2 "$d" --unknown

echo
echo "Пройдено: $passed, ошибок: $failed"
[ "$failed" -eq 0 ]
