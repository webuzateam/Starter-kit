# Процесс релиза

1. Убедитесь, что `main` зелёный в CI.
2. Определите версию по [SemVer](https://semver.org/lang/ru/):
   - MAJOR — несовместимые изменения команд, структуры или правил, требующие ручной миграции проектов;
   - MINOR — новые возможности, совместимые с существующими проектами;
   - PATCH — исправления текстов и ошибок.
3. Обновите `template/.starter-kit/VERSION`.
4. В `CHANGELOG.md` переименуйте `[Unreleased]` в `[X.Y.Z] - YYYY-MM-DD`, добавьте пустой `[Unreleased]` и ссылки сравнения внизу.
5. Если менялась таблица владения файлами — проверьте `template/prompts/08-upgrade.md`.
6. `node scripts/check-consistency.mjs` — версия в `VERSION`, `CHANGELOG.md` и на сайте должна совпадать.
7. Слейте PR в `main`, затем создайте тег:

   ```bash
   git tag -a vX.Y.Z -m "vX.Y.Z"
   git push origin vX.Y.Z
   ```

8. Workflow `release.yml` соберёт `starter-kit-vX.Y.Z.zip` из `template/` и создаст GitHub Release с текстом из `CHANGELOG.md`.
9. Сайт деплоится автоматически при изменениях в `site/` на `main`.
