## Что изменено

<!-- Кратко: что и зачем -->

## Проверки

- [ ] `node .github/scripts/check-consistency.mjs`
- [ ] `node .github/scripts/check-parity.mjs`
- [ ] `bash .github/scripts/test-preflight.sh`

## Чек-лист

- [ ] Правило сформулировано в одном месте, без дублирования
- [ ] Изменение перенесено в другую языковую версию (`main` ↔ `en`) или для этого открыт PR
- [ ] Изменились пути или команды шаблона — обновлены `README.md`, `docs/HOW_IT_WORKS.md` и сайт
- [ ] Новые служебные файлы добавлены в `.gitattributes` с `export-ignore`
- [ ] Защитные правила не ослаблены (или есть решение в `.github/decisions/`)
- [ ] Запись в `CHANGELOG.md` → `[Unreleased]`, если изменение заметно пользователям
