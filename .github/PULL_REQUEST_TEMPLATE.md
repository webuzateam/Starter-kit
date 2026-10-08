## Что изменено

<!-- Кратко: что и зачем -->

## Проверки

- [ ] `node .github/scripts/check-consistency.mjs`
- [ ] `bash .github/scripts/test-preflight.sh`

## Чек-лист

- [ ] Правило сформулировано в одном месте, без дублирования
- [ ] Изменились пути или команды шаблона — обновлены `README.md`, `docs/HOW_IT_WORKS.md` и сайт
- [ ] Новые служебные файлы добавлены в `.gitattributes` с `export-ignore`
- [ ] Защитные правила не ослаблены (или есть решение в `.github/decisions/`)
- [ ] Запись в `CHANGELOG.md` → `[Unreleased]`, если изменение заметно пользователям
