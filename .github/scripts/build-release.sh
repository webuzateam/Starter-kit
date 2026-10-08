#!/usr/bin/env bash
# Собирает архив Starter Kit через git archive: в него попадает ровно то же,
# что получает `npx degit` (служебные файлы исключены в .gitattributes).
# Запуск: bash .github/scripts/build-release.sh [ref], по умолчанию HEAD.
# Имя архива: starter-kit-vX.Y.Z-<язык>.zip. Печатает путь к архиву.
set -euo pipefail

root=$(git -C "$(dirname "$0")" rev-parse --show-toplevel)
ref=${1:-HEAD}
version=$(git -C "$root" show "$ref:.starter-kit/VERSION" | tr -d '[:space:]')
language=$(git -C "$root" show "$ref:.starter-kit/LANGUAGE" | tr -d '[:space:]')
out_dir=${RUNNER_TEMP:-${TMPDIR:-/tmp}}
archive="$out_dir/starter-kit-v$version-$language.zip"

rm -f "$archive"
git -C "$root" archive --format=zip -o "$archive" "$ref"
echo "$archive"
