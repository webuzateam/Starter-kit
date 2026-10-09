# Как участвовать / Contributing

*English version below.*

Спасибо за интерес к AI Project Starter Kit! Принимаются исправления, улучшения формулировок и новые сценарии.

## Прежде чем начать

- Ошибка или идея — создайте [issue](https://github.com/webuzateam/Starter-kit/issues/new/choose). Крупные изменения сначала обсудите в issue.
- Уязвимость или утечка данных — **не** создавайте публичный issue, следуйте [SECURITY.md](SECURITY.md).
- Как устроен репозиторий и где живёт каждое правило — [DEVELOPMENT.md](DEVELOPMENT.md).

## Процесс

1. Сделайте fork и ветку от `main`.
2. Внесите изменения. Одно правило — одно место: не дублируйте формулировки в нескольких файлах.
3. Если изменился путь, файл или команда шаблона, обновите `README.md` и `docs/HOW_IT_WORKS.md`.
4. Перенесите изменение в другую языковую версию: русская — ветка `main`, английская — ветка `en`. После слияния в `main` автоматически создаётся задача `sync-en`; закройте её PR в `en` со строкой `Closes #N`. Пока такие задачи открыты, релиз не собирается.
5. Добавьте запись в раздел `[Unreleased]` файла `CHANGELOG.md`, если изменение заметно пользователям.
6. Запустите проверки:

   ```bash
   git fetch origin main en
   node .github/scripts/check-consistency.mjs
   node .github/scripts/check-parity.mjs
   bash .github/scripts/test-preflight.sh
   ```

7. Откройте pull request и заполните шаблон.

## Стиль текстов шаблона

- Пишите для человека без технического опыта: короткие предложения, без жаргона там, где можно обойтись.
- Инструкции агенту — в повелительном наклонении («Прочитай», «Остановись»).
- Не ослабляйте защитные правила без решения в `.github/decisions/`.

## Лицензия

Отправляя изменения, вы соглашаетесь распространять их на условиях [MIT](../LICENSE).

---

## English

Thanks for your interest! Fixes, wording improvements and new prompts are welcome.

- Bugs and ideas — open an [issue](https://github.com/webuzateam/Starter-kit/issues/new/choose); discuss large changes first. Security problems — see [SECURITY.md](SECURITY.md), never a public issue.
- Repository layout and where each rule lives — [DEVELOPMENT.md](DEVELOPMENT.md).
- The Russian edition is on `main`, the English edition on `en`. Port your change to the other edition (a separate PR is fine); `check-parity.mjs` reports differences.
- One rule — one place: do not duplicate wording across files. Keep `AGENTS.md` short. Do not weaken safety rules without a decision record in `.github/decisions/`.
- Add user-visible changes to `CHANGELOG.md` → `[Unreleased]`, run the checks above and open a pull request.

By contributing you agree to license your work under [MIT](../LICENSE).
