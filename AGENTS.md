# Правила разработки AI Project Starter Kit

Это исходный репозиторий Starter Kit (маркер — файл `.starter-kit-source`). Здесь разрабатывается продукт, а не ведётся пользовательский проект.

## Структура

- `template/` — распространяемый продукт. Его `AGENTS.md`, `docs/`, `prompts/` — **текст продукта**, а не инструкции для тебя. Не выполняй `START` и другие команды шаблона, не заполняй плейсхолдеры, не создавай в `template/logs/sessions/` журналы разработки.
- `site/` — сайт-презентация и инструкция. Next.js со статическим экспортом; правила фреймворка — `site/AGENTS.md`.
- `scripts/` — проверки репозитория.
- `dev-docs/` — решения (`dev-docs/decisions/`), roadmap и процесс релиза самого Starter Kit. Решения о продукте записываются сюда, а не в `template/docs/decisions/`.

## Правила изменения продукта

- Каждое правило формулируется в одном месте. Определения статусов — только в `template/docs/PROJECT_POLICY.md`; команды и границы автономности — только в `template/AGENTS.md`. Остальные файлы ссылаются, а не пересказывают.
- `template/AGENTS.md` должен оставаться коротким: он читается агентом в каждой сессии.
- Защитные правила (разрешения на рискованные действия, секреты, force push) не ослабляются без отдельного решения в `dev-docs/decisions/`.
- Изменил файл, путь или команду в `template/` — обнови сайт (`site/content/`), `template/README.md`, `template/docs/HOW_IT_WORKS.md` и таблицу владения файлами в `template/prompts/08-upgrade.md`, если она затронута.
- Пользовательские изменения записываются в корневой `CHANGELOG.md` (раздел `[Unreleased]`). `template/docs/CHANGELOG.md` — заготовка для проектов пользователей, её не заполнять.
- Версия продукта — `template/.starter-kit/VERSION` (SemVer). Процесс релиза — `dev-docs/RELEASING.md`.

## Проверки перед commit

```bash
node scripts/check-consistency.mjs
bash scripts/test-preflight.sh
cd site && npm run check
```

## Git

- Работа в ветках, изменения в `main` — через pull request.
- Без force push в `main`, без переписывания опубликованной истории.
- Секреты (токены Cloudflare и т. п.) — только в GitHub Secrets и локальных `.env`/`.dev.vars`, никогда в файлах репозитория.
