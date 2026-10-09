# Процесс релиза

1. Убедитесь, что `main` и `en` зелёные в CI и **нет открытых задач с меткой `sync-en`** — иначе `release.yml` остановится.
2. Определите версию по [SemVer](https://semver.org/lang/ru/):
   - MAJOR — несовместимые изменения команд, структуры или правил, требующие ручной миграции проектов;
   - MINOR — новые возможности, совместимые с существующими проектами;
   - PATCH — исправления текстов и ошибок.
3. Обновите `.starter-kit/VERSION` в обеих версиях: PR в `main` и PR в `en`, в любом порядке. В CI разница версий — только предупреждение; при релизе версии обязаны совпадать.
4. В `CHANGELOG.md` переименуйте `[Unreleased]` в `[X.Y.Z] - YYYY-MM-DD`, добавьте пустой `[Unreleased]` и ссылки сравнения внизу.
5. Если менялась таблица владения файлами — проверьте `prompts/08-upgrade.md`.
6. Запустите `node .github/scripts/check-consistency.mjs`, `node .github/scripts/check-parity.mjs` и `bash .github/scripts/test-preflight.sh`.
7. Слейте PR в `main`, затем поставьте тег на `main`:

   ```bash
   git tag -a vX.Y.Z -m "vX.Y.Z"
   git push origin vX.Y.Z
   ```

8. Workflow `release.yml` проверит, что `main` и `en` одной версии, поставит тег `vX.Y.Z-en` на `en`, соберёт `starter-kit-vX.Y.Z-ru.zip` и `starter-kit-vX.Y.Z-en.zip` через `git archive` (без служебных файлов) и создаст GitHub Release с текстом из `CHANGELOG.md`.
9. В течение суток репозиторий сайта `webuzateam/Starter-kit-site` сам откроет PR «Обновить KIT_VERSION» с результатом сверки текстов. Если сверка показала расхождения — допишите тексты в этот PR. Слейте его: сайт задеплоится автоматически. Запустить проверку сразу: вкладка Actions → `Kit version` → Run workflow.
