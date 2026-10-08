#!/usr/bin/env bash
# Собирает архив шаблона dist/starter-kit-vX.Y.Z.zip из template/.
# Запуск: bash scripts/build-release.sh
set -euo pipefail

root=$(cd "$(dirname "$0")/.." && pwd)
version=$(tr -d '[:space:]' < "$root/template/.starter-kit/VERSION")
archive="$root/dist/starter-kit-v$version.zip"

mkdir -p "$root/dist"
rm -f "$archive"
(cd "$root/template" && zip -qr -X "$archive" . -x '*.DS_Store')
echo "$archive"
