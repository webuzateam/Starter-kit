#!/usr/bin/env bash
# Собирает архив Starter Kit через git archive: в него попадает ровно то же,
# что получает `npx degit` (служебные файлы исключены в .gitattributes).
# Запуск: bash .github/scripts/build-release.sh [ref], по умолчанию HEAD.
# Печатает путь к созданному архиву.
set -euo pipefail

root=$(git -C "$(dirname "$0")" rev-parse --show-toplevel)
ref=${1:-HEAD}
version=$(git -C "$root" show "$ref:.starter-kit/VERSION" | tr -d '[:space:]')
out_dir=${RUNNER_TEMP:-${TMPDIR:-/tmp}}
archive="$out_dir/starter-kit-v$version.zip"

rm -f "$archive"
git -C "$root" archive --format=zip -o "$archive" "$ref"
echo "$archive"
