## Что изменено

<!-- Кратко: что и зачем -->

## Проверки

- [ ] `node scripts/check-consistency.mjs`
- [ ] `bash scripts/test-preflight.sh`
- [ ] `cd site && npm run check` (если менялся сайт)

## Чек-лист

- [ ] Правило сформулировано в одном месте, без дублирования
- [ ] Изменились пути или команды шаблона — обновлены `site/content/`, `template/README.md`, `template/docs/HOW_IT_WORKS.md`
- [ ] Защитные правила не ослаблены (или есть решение в `dev-docs/decisions/`)
- [ ] Запись в `CHANGELOG.md` → `[Unreleased]`, если изменение заметно пользователям
